"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { files_table } from "./db/schema";
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

  // TODO
  // await utapi.deleteFiles([file.fileKey]);
  await utapi.deleteFiles([
    file.url.replace("https://4zl3df78hw.ufs.sh/f/", ""),
  ]);

  await db.delete(files_table).where(eq(files_table.id, fileId));

  const c = await cookies();
  c.set("force-refresh", "true");
  
  return { success: true };
}
