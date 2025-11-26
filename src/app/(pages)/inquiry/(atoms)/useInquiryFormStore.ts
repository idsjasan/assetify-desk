import { atom } from "jotai";

export interface FileWithId extends File {
  id: string;
}

export const 법인Atom = atom<string>("");
export const 부서Atom = atom<string>("");
export const 문의자Atom = atom<string>("");
export const 자산번호Atom = atom<string>("");
export const 문의유형Atom = atom<string>("");
export const 문의내용Atom = atom<string>("");
export const 첨부파일Atom = atom<FileWithId[]>([]);
export const 긴급도Atom = atom<string>("");
