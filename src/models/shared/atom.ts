import { atom } from "jotai";
import { SharedState } from "./schema";

export const sharedAtom = atom<SharedState>({
  isOnline: true,
  isMaintenance: false,
});
