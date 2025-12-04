import { atom } from "jotai";

export const RepairTicket법인Atom = atom<string>("");
export const RepairTicket부서Atom = atom<string>("");
export const RepairTicket문의자Atom = atom<string>("");
export const RepairTicket실제근무위치Atom = atom<string>("");
export const RepairTicket자산번호Atom = atom<string>("");
export const RepairTicket고장내역Atom = atom<string>("");
export const RepairTicket고장증상Atom = atom<string>("");
export const RepairTicket긴급도Atom = atom<string>("");
export const RepairTicket수리진행동의서Atom = atom<boolean>(false);

export const RepairTicket상태Atom = atom<string>("");
export const RepairTicket조치내용Atom = atom<string>("");
export const RepairTicket담당자Atom = atom<string>("");
export const RepairTicket과실여부Atom = atom<string>("");
export const RepairTicket수리일정Atom = atom<string>("");
export const RepairTicket단가Atom = atom<number>(0);
export const RepairTicket수리진행상황Atom = atom<string>("");

export const RepairTicketCreatedTimeAtom = atom<string>("");
