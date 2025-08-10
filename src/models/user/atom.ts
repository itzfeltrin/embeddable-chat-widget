import { atomWithStorage } from "jotai/utils";
import { User } from "./schema";
import { atom } from "jotai";

export const authAtom = atomWithStorage<User | null>("auth", null);

export const isAuthenticatedAtom = atom((get) => get(authAtom) !== null);

export const logInAtom = atom(authAtom, (_, set, value: User) =>
  set(authAtom, value)
);

export const logOutAtom = atom(authAtom, (_, set) => set(authAtom, null));
