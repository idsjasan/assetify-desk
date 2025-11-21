"use client";

import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { repairTicketDetailAtom } from "@/store/repairTicketDetail";
import type { RepairTicketDetail } from "@/types/repairTicket";

const fetchRepairDetail = async (
  ticketId: string,
): Promise<RepairTicketDetail> => {
  const response = await fetch(`/api/ticket/repair/${ticketId}`, {
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error ?? "수리 요청 정보를 불러오지 못했습니다.");
  }

  return data;
};

export function useRepairTicketDetail(
  ticketId: string,
  initialData?: RepairTicketDetail,
) {
  const setDetail = useSetAtom(repairTicketDetailAtom);

  const query = useQuery<RepairTicketDetail>({
    queryKey: ["repair-ticket-detail", ticketId],
    queryFn: () => fetchRepairDetail(ticketId),
    initialData,
    enabled: Boolean(ticketId),
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    if (query.data) {
      setDetail(query.data);
    }
  }, [query.data, setDetail]);

  return query;
}
