import { FileIcon, Folder as FolderIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { deleteFile } from "~/server/actions"
import type { DB_FileType, files_table, folders_table } from "~/server/db/schema"

export function FileRow(props: { file: DB_FileType }) {
    const { file } = props
    return (
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center">
                    <a href={file.url} className="flex items-center text-gray-100 hover:text-blue-400" target="_blank">
                        <FileIcon className="mr-3" size={20} />
                        {file.name}
                    </a>
                </div>
                {/* TODO */}
                <div className="col-span-2 text-gray-400">{"File"}</div>
                <div className="col-span-3 text-gray-400">{file.size}</div>
                <div className="col-span-1 text-gray-400">
                    <Button variant="ghost" onClick={() => deleteFile(file.id)}>
                        <Trash2Icon size={20} />
                    </Button>
                </div>
            </div>
        </li>
    )
}

export function FolderRow(props: { folder: typeof folders_table.$inferSelect }) {
    const { folder } = props
    return (
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center">
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
                <div className="col-span-1 text-gray-400">
                    <Button variant="ghost" onClick={() => { }}>
                        <Trash2Icon size={20} />
                    </Button></div>
            </div>
        </li>
    )
}