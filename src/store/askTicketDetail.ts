import { atom } from "jotai";

import type { AskTicketDetail } from "@/types/askTicket";

export const askTicketDetailAtom = atom<AskTicketDetail | null>(null);

export const copyStatusAtom = atom<"idle" | "copied">("idle");

export const cancelStatusAtom = atom<{
  state: "idle" | "pending" | "success" | "error";
  message?: string;
}>({
  state: "idle",
});
