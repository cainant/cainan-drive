import { FileIcon, Folder as FolderIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { bytesToSize } from "~/lib/utils";
import type { DB_FileType, DB_FolderType } from "~/server/db/schema";
import { Button } from "../ui/button";
import { useRecoilState } from "recoil";
import { dialogState } from "~/lib/states";

export function FileRow(props: {
  file: DB_FileType;
  isChecked: boolean;
  onCheckBoxChange: (id: number, isChecked: boolean, isFile: boolean) => void;
}) {
  const { file, isChecked, onCheckBoxChange } = props;
  const [_, setDialog] = useRecoilState(dialogState);
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-1">
          <input
            onChange={(e) => onCheckBoxChange(file.id, e.target.checked, true)}
            id="default-checkbox"
            checked={isChecked}
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </div>
        <div className="col-span-5 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">
          {file.name.split(".")[1]}
        </div>
        <div className="col-span-3 text-gray-400">{bytesToSize(file.size)}</div>
        <div className="col-span-1 flex justify-end text-gray-400">
          <Button
            size={"sm"}
            variant="ghost"
            className="h-5 w-5"
            onClick={() => {
              setDialog({
                open: true,
                text: file.name,
                itemId: file.id,
                isFile: true,
              });
            }}
          >
            <PencilIcon />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: DB_FolderType;
  isChecked: boolean;
  onCheckBoxChange: (id: number, isChecked: boolean, isFile: boolean) => void;
}) {
  const { folder, isChecked, onCheckBoxChange } = props;
  const [_, setDialog] = useRecoilState(dialogState);
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-1">
          <input
            onChange={(e) =>
              onCheckBoxChange(folder.id, e.target.checked, false)
            }
            id="default-checkbox"
            checked={isChecked}
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </div>
        <div className="col-span-5 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-2 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400">--</div>
        <div className="col-span-1 flex justify-end text-gray-400">
          <Button
            size={"sm"}
            variant="ghost"
            className="h-5 w-5"
            onClick={() => {
              setDialog({
                open: true,
                text: folder.name,
                itemId: folder.id,
                isFile: false,
              });
            }}
          >
            <PencilIcon />
          </Button>
        </div>
      </div>
    </li>
  );
}
