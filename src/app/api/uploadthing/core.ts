import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

const f = createUploadthing();

export const ourFileRouter = {
  defaultUploader: f({
    blob: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        folderId: z.number(),
      }),
    )
    .middleware(async ({ input }) => {
      const user = await auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const folder = await QUERIES.getFolderById(input.folderId);

      if (!folder) throw new UploadThingError("Folder not found");
      if (folder.ownerId !== user.userId)
        throw new UploadThingError("Unauthorized");

      return { userId: user.userId, parentId: input.folderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      await MUTATIONS.createFile({
        file: {
          name: file.name,
          size: file.size,
          url: file.ufsUrl,
          parent: metadata.parentId,
          key: file.key,
        },
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
