import { useAtom } from "jotai";
import { useState } from "react";
import {
  긴급도Atom,
  문의내용Atom,
  문의유형Atom,
  문의자Atom,
  법인Atom,
  부서Atom,
  자산번호Atom,
  첨부파일Atom,
} from "@/app/(pages)/inquiry/(atoms)/useInquiryFormStore";

interface UseInquiryFormReturn {
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
}

export const useInquiryForm = (): UseInquiryFormReturn => {
  const [법인] = useAtom(법인Atom);
  const [부서] = useAtom(부서Atom);
  const [문의자] = useAtom(문의자Atom);
  const [자산번호] = useAtom(자산번호Atom);
  const [문의유형] = useAtom(문의유형Atom);
  const [문의내용] = useAtom(문의내용Atom);
  const [첨부파일] = useAtom(첨부파일Atom);
  const [긴급도] = useAtom(긴급도Atom);

  const [, set법인명] = useAtom(법인Atom);
  const [, set부서] = useAtom(부서Atom);
  const [, set문의자] = useAtom(문의자Atom);
  const [, set자산번호] = useAtom(자산번호Atom);
  const [, set문의유형] = useAtom(문의유형Atom);
  const [, set문의내용] = useAtom(문의내용Atom);
  const [, set첨부파일] = useAtom(첨부파일Atom);
  const [, set긴급도] = useAtom(긴급도Atom);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    set법인명("");
    set부서("");
    set문의자("");
    set자산번호("");
    set문의유형("");
    set문의내용("");
    set첨부파일([]);
    set긴급도("");
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("법인", 법인);
      formData.append("부서", 부서);
      formData.append("문의자", 문의자);
      formData.append("자산번호", 자산번호);
      formData.append("문의유형", 문의유형);
      formData.append("문의내용", 문의내용);

      formData.append("긴급도", 긴급도);

      첨부파일.forEach((file) => {
        formData.append("첨부파일", file);
      });

      resetForm();

      const _response = await fetch("/api/inquiry/ticket", {
        method: "POST",
        body: formData,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
