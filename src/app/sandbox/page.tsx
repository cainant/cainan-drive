import { auth } from '@clerk/nextjs/server';
import { mockFolders } from './mock-data';
import { db } from '~/server/db';
import { folders_table } from '~/server/db/schema';
import { eq } from 'drizzle-orm';


export default async function SandboxPage() {
    const user = await auth();
    if (!user.userId) {
        throw new Error("Unauthorized");
    }
    const folders = await db.select().from(folders_table).where(eq(folders_table.ownerId, user.userId));
    console.log(folders);

    return (
        <div className="flex flex-col gap-4">
            Seed Function
            <form
                action={async () => {
                    "use server";

                    const user = await auth();
                    if (!user.userId) {
                        throw new Error("Unauthorized");
                    }

                    const rootFolder = await db.insert(folders_table).values({
                        name: "root",
                        parent: null,
                        ownerId: user.userId,
                    }).$returningId();

                    const insertableFolders = mockFolders.map((folder) => ({
                        name: folder.name,
                        parent: rootFolder[0]!.id,
                        ownerId: user.userId,
                    }));
                    await db.insert(folders_table).values(insertableFolders);

                }}
            >
                <button className="btn" type="submit">Seed</button>
            </form>
        </div>
    )
}