import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          "use server";
          const session = await auth();

          if (!session.userId) {
            return redirect("/sign-in");
          }

          const rootFolderId = await MUTATIONS.onboardUser(session.userId);

          return redirect(`/f/${rootFolderId}`);
        }}
      >
        <Button className="bg-gray-500 text-white hover:bg-gray-700">
          Create new Drive
        </Button>
      </form>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
