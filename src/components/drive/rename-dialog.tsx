import { Dialog } from "primereact/dialog";
import { useRecoilState } from "recoil";
import { dialogState } from "~/lib/states";
import { Button } from "../ui/button";
import { renameItem } from "~/server/actions";

export default function RenameDialog() {
  const [dialog, setDialog] = useRecoilState(dialogState);
  return (
    <Dialog
      visible={dialog.open}
      modal
      onHide={() => {
        setDialog((prev) => ({ ...prev, open: false }));
      }}
      content={({ hide }) => (
        <div
          className="flex flex-col gap-4 px-8 py-5"
          style={{
            borderRadius: "6px",
            backgroundImage:
              "radial-gradient(circle at left top, var(--gray-700), var(--gray-800))",
          }}
        >
          <div className="inline-flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-100">
              Rename
            </label>
            <input
              id="username"
              className="bg-white-alpha-20 text-primary-50 border-none p-3"
              style={{
                borderRadius: "6px",
              }}
              onChange={(e) =>
                setDialog((prev) => ({ ...prev, text: e.target.value }))
              }
              value={dialog.text}
            ></input>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={async (e) => {
                await renameItem(dialog.item, dialog.text);
                hide(e);
              }}
              variant="secondary"
              className=""
            >
              Save
            </Button>
            <Button onClick={(e) => hide(e)} variant="destructive" className="">
              Cancel
            </Button>
          </div>
        </div>
      )}
    ></Dialog>
  );
}
