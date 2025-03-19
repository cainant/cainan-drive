import { atom } from "recoil";
import { Item } from "~/server/db/schema";

export const dialogState = atom<{ open: boolean; text: string; item: Item }>({
  key: "dialog",
  default: {
    open: false,
    text: "",
    item: {} as Item,
  },
});

export const selectedItemsState = atom<Item[]>({
  key: "selectedItems",
  default: [],
});
