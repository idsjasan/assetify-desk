import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  RepairForm고장내역Atom,
  RepairForm고장증상Atom,
  RepairForm긴급도Atom,
  RepairForm문의자Atom,
  RepairForm법인Atom,
  RepairForm부서Atom,
  RepairForm수리진행동의서Atom,
  RepairForm실제근무위치Atom,
  RepairForm자산번호Atom,
} from "@/app/(pages)/repair/(atoms)/useRepairFormStore";

interface UseRepairFormReturn {
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
}

export const useRepairForm = (): UseRepairFormReturn => {
  const router = useRouter();

  const [법인] = useAtom(RepairForm법인Atom);
  const [부서] = useAtom(RepairForm부서Atom);
  const [문의자] = useAtom(RepairForm문의자Atom);
  const [실제근무위치] = useAtom(RepairForm실제근무위치Atom);
  const [자산번호] = useAtom(RepairForm자산번호Atom);
  const [고장내역] = useAtom(RepairForm고장내역Atom);
  const [고장증상] = useAtom(RepairForm고장증상Atom);
  const [긴급도] = useAtom(RepairForm긴급도Atom);
  const [수리진행동의서] = useAtom(RepairForm수리진행동의서Atom);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("법인", 법인);
      formData.append("부서", 부서);
      formData.append("문의자", 문의자);
      formData.append("실제근무위치", 실제근무위치);
      formData.append("자산번호", 자산번호);
      formData.append("고장내역", 고장내역);
      formData.append("문의내용", 고장증상);
      formData.append("긴급도", 긴급도);
      formData.append("수리진행동의서", 수리진행동의서 ? "true" : "false");

      const response = await fetch("/api/repair", {
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
      router.push(`/repair/ticket/${data.ticketId}`);
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
