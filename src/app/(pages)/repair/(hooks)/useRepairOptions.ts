import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  RepairOptions고장내역Atom,
  RepairOptions긴급도Atom,
  RepairOptions법인Atom,
} from "@/app/(pages)/repair/(atoms)/useRepairOptionsStore";

interface RepairOptionsResponse {
  법인: string[];
  고장내역: string[];
  긴급도: string[];
}

export const useRepairOptions = () => {
  const [, set법인] = useAtom(RepairOptions법인Atom);
  const [, set고장내역] = useAtom(RepairOptions고장내역Atom);
  const [, set긴급도] = useAtom(RepairOptions긴급도Atom);

  return useQuery<RepairOptionsResponse>({
    queryKey: ["repairOptions"],
    queryFn: async () => {
      const response = await fetch("/api/repair/options");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      set법인(data.법인);
      set고장내역(data.고장내역);
      set긴급도(data.긴급도);

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
