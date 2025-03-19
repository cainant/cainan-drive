import { FileIcon, Folder as FolderIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { bytesToSize } from "~/lib/utils";
import { Button } from "../ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { dialogState, selectedItemsState } from "~/lib/states";
import { Item } from "~/server/db/schema";

type RowProps = {
  item: Item;
  onCheckBoxChange: (item: Item, isChecked: boolean) => void;
};

export function FileRow(props: RowProps) {
  const { item, onCheckBoxChange } = props;
  const [_, setDialog] = useRecoilState(dialogState);
  const selectedItems = useRecoilValue(selectedItemsState);
  return (
    <li
      key={item.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-1">
          <input
            onChange={(e) => onCheckBoxChange(item, e.target.checked)}
            id="default-checkbox"
            checked={selectedItems.includes(item)}
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </div>
        <div className="col-span-5 flex items-center">
          <a
            href={item.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {item.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">
          {item.name.split(".")[1]}
        </div>
        <div className="col-span-3 text-gray-400">
          {bytesToSize(item.size!)}
        </div>
        <div className="col-span-1 flex justify-end text-gray-400">
          <Button
            size={"sm"}
            variant="ghost"
            className="h-5 w-5"
            onClick={() => {
              setDialog({
                open: true,
                text: item.name,
                item: item,
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

export function FolderRow(props: RowProps) {
  const { item, onCheckBoxChange } = props;
  const [_, setDialog] = useRecoilState(dialogState);
  const selectedItems = useRecoilValue(selectedItemsState);
  return (
    <li
      key={item.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-1">
          <input
            onChange={(e) => onCheckBoxChange(item, e.target.checked)}
            id="default-checkbox"
            checked={selectedItems.includes(item)}
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </div>
        <div className="col-span-5 flex items-center">
          <Link
            href={`/f/${item.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {item.name}
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
                text: item.name,
                item: item,
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
