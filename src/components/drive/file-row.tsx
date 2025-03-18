import { FileIcon, Folder as FolderIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { bytesToSize } from "~/lib/utils"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"

export function FileRow(props: {
    file: DB_FileType, isChecked: boolean,
    onCheckBoxChange: (id: number, isChecked: boolean, isFile: boolean) => void
}) {
    const { file, isChecked, onCheckBoxChange } = props
    return (
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                    <input onChange={(e) => onCheckBoxChange(file.id, e.target.checked, true)} id="default-checkbox" checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="col-span-5 flex items-center">
                    <a href={file.url} className="flex items-center text-gray-100 hover:text-blue-400" target="_blank">
                        <FileIcon className="mr-3" size={20} />
                        {file.name}
                    </a>
                </div>
                <div className="col-span-2 text-gray-400">{file.name.split('.')[1]}</div>
                <div className="col-span-3 text-gray-400">{bytesToSize(file.size)}</div>
            </div>
        </li>
    )
}

export function FolderRow(props: {
    folder: DB_FolderType, isChecked: boolean,
    onCheckBoxChange: (id: number, isChecked: boolean, isFile: boolean) => void
}) {
    const { folder, isChecked, onCheckBoxChange } = props
    return (
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                    <input onChange={(e) => onCheckBoxChange(folder.id, e.target.checked, false)} id="default-checkbox" checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
            </div>
        </li>
    )
}