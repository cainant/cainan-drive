import "server-only";

import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentFolderId: number | null = folderId;
    while (currentFolderId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentFolderId));

      if (!folder[0]) {
        throw new Error("Folder not found");
      }
      parents.unshift(folder[0]);
      currentFolderId = folder[0]?.parent;
    }

    return parents;
  },

  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(filesSchema.parent, folderId));
  },

  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(foldersSchema.parent, folderId));
  },
};
