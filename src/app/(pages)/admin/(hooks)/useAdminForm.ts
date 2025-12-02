import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { AdminForm비밀번호Atom, AdminForm비밀번호저장Atom } from "@/app/(pages)/admin/(atoms)/useAdminFormStore";
import { AdminIsCopiedAtom, AdminLicenseLinkAtom } from "@/app/(pages)/admin/(atoms)/useAdminStore";
import { clearPassword, savePassword } from "@/shared/utils/encryptPassword";

interface UseAdminFormReturn {
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
  error: Error | null;
}

export const useAdminForm = (): UseAdminFormReturn => {
  const 비밀번호 = useAtomValue(AdminForm비밀번호Atom);
  const 비밀번호저장 = useAtomValue(AdminForm비밀번호저장Atom);
  const setLicenseLink = useSetAtom(AdminLicenseLinkAtom);
  const setIsCopied = useSetAtom(AdminIsCopiedAtom);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: 비밀번호,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: async (data) => {
      if (비밀번호저장) {
        savePassword(비밀번호);
      } else {
        clearPassword();
      }

      const url = `${window.location.origin}/license/${data.sessionId}`;
      setLicenseLink(url);

      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    },
    onError: () => {
      setLicenseLink("");
    },
  });

  const handleSubmit = async (): Promise<void> => {
    await mutateAsync();
  };

  return {
    isSubmitting: isPending,
    handleSubmit,
    error,
  };
};
