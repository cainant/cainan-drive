"use client"

import { ChevronRight } from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import type { files_table, folders_table } from "~/server/db/schema"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { UploadButton } from "~/components/uploadthing"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[],
  folders: (typeof folders_table.$inferSelect)[],
  parents: (typeof folders_table.$inferSelect)[],

  currentFolderId: number
}) {
  const navigate = useRouter();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href={'/f/1'}
              className="text-gray-300 hover:text-white mr-2"
            >
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
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
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
              <UploadButton
                endpoint="defaultUploader"
                input={{ folderId: props.currentFolderId }}
                onClientUploadComplete={
                  () => {
                    navigate.refresh();
                  }
                }
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
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-1"></div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.length === 0 && props.files.length === 0 ? (
              <div className="flex justify-center items-center col-span-12 text-gray-500 min-h-[45px]">
                Your drive is empty
              </div>
            ) : (
              <>
                {props.folders.map((folder) => (
                  <FolderRow key={folder.id} folder={folder} isChecked={!!selectedItems[folder.id]} onCheckBoxChange={handleCheckboxChange} />
                ))}
                {props.files.map((file) => (
                  <FileRow key={file.id} file={file} isChecked={!!selectedItems[file.id]} onCheckBoxChange={handleCheckboxChange} />
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}