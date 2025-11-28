import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  RepairTicketCreatedTimeAtom,
  RepairTicket고장내역Atom,
  RepairTicket고장증상Atom,
  RepairTicket과실여부Atom,
  RepairTicket긴급도Atom,
  RepairTicket단가Atom,
  RepairTicket담당자Atom,
  RepairTicket문의자Atom,
  RepairTicket법인Atom,
  RepairTicket부서Atom,
  RepairTicket상태Atom,
  RepairTicket수리일정Atom,
  RepairTicket수리진행동의서Atom,
  RepairTicket수리진행상황Atom,
  RepairTicket실제근무위치Atom,
  RepairTicket자산번호Atom,
  RepairTicket조치내용Atom,
} from "@/app/(pages)/repair/(atoms)/useRepairTicketStore";

interface TicketData {
  법인: string;
  부서: string;
  문의자: string;
  실제근무위치: string;
  자산번호: string;
  고장내역: string;
  고장증상: string;
  긴급도: string;
  수리진행동의서: boolean;
  상태: string;
  조치내용: string;
  담당자: string;
  과실여부: string;
  수리일정: string;
  단가: string;
  수리진행상황: string;
  createdAt: string;
}

export const useRepairTicket = (ticketId: string) => {
  const [, set법인] = useAtom(RepairTicket법인Atom);
  const [, set부서] = useAtom(RepairTicket부서Atom);
  const [, set문의자] = useAtom(RepairTicket문의자Atom);
  const [, set실제근무위치] = useAtom(RepairTicket실제근무위치Atom);
  const [, set자산번호] = useAtom(RepairTicket자산번호Atom);
  const [, set고장내역] = useAtom(RepairTicket고장내역Atom);
  const [, set고장증상] = useAtom(RepairTicket고장증상Atom);
  const [, set긴급도] = useAtom(RepairTicket긴급도Atom);
  const [, set수리진행동의서] = useAtom(RepairTicket수리진행동의서Atom);
  const [, set상태] = useAtom(RepairTicket상태Atom);
  const [, set조치내용] = useAtom(RepairTicket조치내용Atom);
  const [, set담당자] = useAtom(RepairTicket담당자Atom);
  const [, set과실여부] = useAtom(RepairTicket과실여부Atom);
  const [, set수리일정] = useAtom(RepairTicket수리일정Atom);
  const [, set단가] = useAtom(RepairTicket단가Atom);
  const [, set수리진행상황] = useAtom(RepairTicket수리진행상황Atom);
  const [, setCreatedTime] = useAtom(RepairTicketCreatedTimeAtom);

  return useQuery<TicketData>({
    queryKey: ["repairTicket", ticketId],
    queryFn: async () => {
      const response = await fetch(`/api/repair/ticket/${ticketId}`, {
        method: "GET",
      });

      const data: TicketData = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    enabled: !!ticketId,
    select: (data) => {
      set법인(data.법인);
      set부서(data.부서);
      set문의자(data.문의자);
      set실제근무위치(data.실제근무위치);
      set자산번호(data.자산번호);
      set고장내역(data.고장내역);
      set고장증상(data.고장증상);
      set긴급도(data.긴급도);
      set수리진행동의서(data.수리진행동의서);
      set상태(data.상태);
      set조치내용(data.조치내용);
      set담당자(data.담당자);
      set과실여부(data.과실여부);
      set수리일정(data.수리일정);
      set단가(data.단가);
      set수리진행상황(data.수리진행상황);
      setCreatedTime(data.createdAt);

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
