import { atom } from "jotai";

import type { RepairTicketDetail } from "@/types/repairTicket";

export const repairTicketDetailAtom = atom<RepairTicketDetail | null>(null);

export const cancelStatusAtom = atom<{
  state: "idle" | "pending" | "success" | "error";
  message?: string;
}>({
  state: "idle",
});
