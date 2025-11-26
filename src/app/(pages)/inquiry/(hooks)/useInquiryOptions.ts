import { useQuery } from "@tanstack/react-query";

interface InquiryOptionsResponse {
  법인: string[];
  문의유형: string[];
  긴급도: string[];
}

export const useInquiryOptions = () => {
  return useQuery<InquiryOptionsResponse>({
    queryKey: ["inquiryOptions"],
    queryFn: async () => {
      const response = await fetch("/api/inquiry/options");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
