import { atom } from "jotai";

export const RepairForm법인Atom = atom<string>("");
export const RepairForm부서Atom = atom<string>("");
export const RepairForm문의자Atom = atom<string>("");
export const RepairForm실제근무위치Atom = atom<string>("");
export const RepairForm자산번호Atom = atom<string>("");
export const RepairForm고장내역Atom = atom<string>("");
export const RepairForm고장증상Atom = atom<string>("");
export const RepairForm긴급도Atom = atom<string>("");
export const RepairForm수리진행동의서Atom = atom<boolean>(false);
