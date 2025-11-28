import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  InquiryOptions긴급도Atom,
  InquiryOptions문의유형Atom,
  InquiryOptions법인Atom,
} from "@/app/(pages)/inquiry/(atoms)/useInquiryOptionsStore";

interface InquiryOptionsResponse {
  법인: string[];
  문의유형: string[];
  긴급도: string[];
}

export const useInquiryOptions = () => {
  const [, set법인] = useAtom(InquiryOptions법인Atom);
  const [, set문의유형] = useAtom(InquiryOptions문의유형Atom);
  const [, set긴급도] = useAtom(InquiryOptions긴급도Atom);

  return useQuery<InquiryOptionsResponse>({
    queryKey: ["inquiryOptions"],
    queryFn: async () => {
      const response = await fetch("/api/inquiry/options");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      set법인(data.법인);
      set문의유형(data.문의유형);
      set긴급도(data.긴급도);

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
