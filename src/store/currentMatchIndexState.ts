import { atom } from "recoil";

export const currentMatchIndexState = atom<number>({
  key: "currentMatchIndexState",
  default: 0,
});
