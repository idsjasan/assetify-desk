import { atom } from "jotai";

export const copyStatusAtom = atom<"idle" | "copied">("idle");
