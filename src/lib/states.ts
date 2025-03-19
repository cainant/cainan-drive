import { atom } from "recoil";

export const dialogState = atom({
  key: "dialogState",
  default: {
    open: false,
    text: "",
    itemId: 0,
    isFile: false,
  },
});
