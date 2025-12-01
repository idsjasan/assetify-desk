import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  InquiryForm긴급도Atom,
  InquiryForm문의내용Atom,
  InquiryForm문의유형Atom,
  InquiryForm문의자Atom,
  InquiryForm법인Atom,
  InquiryForm부서Atom,
  InquiryForm자산번호Atom,
} from "@/app/(pages)/inquiry/(atoms)/useInquiryFormStore";

interface UseInquiryFormReturn {
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
}

export const useInquiryForm = (): UseInquiryFormReturn => {
  const router = useRouter();

  const [법인, set법인] = useAtom(InquiryForm법인Atom);
  const [부서, set부서] = useAtom(InquiryForm부서Atom);
  const [문의자, set문의자] = useAtom(InquiryForm문의자Atom);
  const [자산번호, set자산번호] = useAtom(InquiryForm자산번호Atom);
  const [문의유형, set문의유형] = useAtom(InquiryForm문의유형Atom);
  const [문의내용, set문의내용] = useAtom(InquiryForm문의내용Atom);
  const [긴급도, set긴급도] = useAtom(InquiryForm긴급도Atom);

  const resetForm = () => {
    set법인("");
    set부서("");
    set문의자("");
    set자산번호("");
    set문의유형("");
    set문의내용("");
    set긴급도("");
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("법인", 법인);
      formData.append("부서", 부서);
      formData.append("문의자", 문의자);
      formData.append("자산번호", 자산번호);
      formData.append("문의유형", 문의유형);
      formData.append("문의내용", 문의내용);
      formData.append("긴급도", 긴급도);

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    onSuccess: (data) => {
      resetForm();
      router.push(`/inquiry/ticket/${data.ticketId}`);
    },
  });

  const handleSubmit = async (): Promise<void> => {
    await mutateAsync();
  };

  return {
    isSubmitting: isPending,
    handleSubmit,
  };
};
