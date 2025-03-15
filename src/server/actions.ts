"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { files_table, folders_table } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utapi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) return { error: "Unauthorized" };

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }

  await utapi.deleteFiles([file.key]);

  await db.delete(files_table).where(eq(files_table.id, fileId));

  const c = await cookies();
  c.set("force-refresh", "true");

  return { success: true };
}

export async function deleteFolder(folderId: number) {
  const session = await auth();
  if (!session.userId) return { error: "Unauthorized" };

  async function deleteFolderRecursively(folderId: number) {
    const folder = await db
      .select()
      .from(folders_table)
      .where(
        and(
          eq(folders_table.id, folderId),
          eq(folders_table.ownerId, session.userId!),
        ),
      );

    if (!folder[0]) {
      return { error: "Folder not found" };
    }

    const subfolders = await db
      .select()
      .from(folders_table)
      .where(eq(folders_table.parent, folderId));

    for (const subfolder of subfolders) {
      await deleteFolderRecursively(subfolder.id!);
    }

    const files = await db
      .select()
      .from(files_table)
      .where(eq(files_table.parent, folderId));

    await utapi.deleteFiles(files.map((file) => file.key));

    await db.delete(folders_table).where(eq(folders_table.id, folderId));
  }

  await deleteFolderRecursively(folderId);

  const c = await cookies();
  c.set("force-refresh", "true");

  return { success: true };
}
