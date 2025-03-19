"use client";

import { ChevronRight, FolderPlusIcon, Trash2Icon } from "lucide-react";
import { FileRow, FolderRow } from "./items-row";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createFolder, deleteItems } from "~/server/actions";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import RenameDialog from "./rename-dialog";
import { Item } from "~/server/db/schema";
import { useRecoilState } from "recoil";
import { selectedItemsState } from "~/lib/states";

export default function DriveContents(props: {
  files: Required<Item>[];
  folders: Item[];
  parents: Item[];
  currentFolderId: number;
}) {
  const navigate = useRouter();
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);

  const handleCheckboxChange = (item: Item, isChecked: boolean) => {
    setSelectedItems((prev) => {
      if (isChecked) {
        return [...prev, item];
      } else {
        return prev.filter((i) => i.id !== item.id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/f/1"} className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <UploadButton
                endpoint="defaultUploader"
                input={{ folderId: props.currentFolderId }}
                onClientUploadComplete={() => {
                  navigate.refresh();
                }}
                appearance={{
                  allowedContent: "hidden",
                }}
              />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-1"></div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1 text-gray-400">
                <div className="flex justify-end gap-2">
                  <Button
                    size={"sm"}
                    variant="ghost"
                    className="h-5 w-5"
                    onClick={() => {
                      createFolder(props.parents.at(-1)!.id);
                    }}
                  >
                    <FolderPlusIcon />
                  </Button>
                  <Button
                    size={"sm"}
                    variant="ghost"
                    className="h-5 w-5"
                    onClick={() => {
                      toast.promise(deleteItems(selectedItems), {
                        pending: "Deleting...",
                        success: "Deleted!",
                        error: "No items selected!",
                      });
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ul>
            {props.folders.length === 0 && props.files.length === 0 ? (
              <div className="col-span-12 flex min-h-[45px] items-center justify-center text-gray-500">
                Your drive is empty
              </div>
            ) : (
              <>
                {props.folders.map((folder) => (
                  <FolderRow
                    key={folder.id}
                    item={folder}
                    onCheckBoxChange={handleCheckboxChange}
                  />
                ))}
                {props.files.map((file) => (
                  <FileRow
                    key={file.id}
                    item={file}
                    onCheckBoxChange={handleCheckboxChange}
                  />
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        newestOnTop={false}
        theme="dark"
        transition={Bounce}
        pauseOnHover={false}
        hideProgressBar={true}
      />
      <RenameDialog />
    </div>
  );
}
