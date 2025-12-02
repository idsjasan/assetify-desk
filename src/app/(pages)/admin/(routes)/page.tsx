"use client";

import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { AdminForm비밀번호Atom, AdminForm비밀번호저장Atom } from "@/app/(pages)/admin/(atoms)/useAdminFormStore";
import { AdminIsCopiedAtom, AdminLicenseLinkAtom } from "@/app/(pages)/admin/(atoms)/useAdminStore";
import { useAdminForm } from "@/app/(pages)/admin/(hooks)/useAdminForm";
import Container from "@/shared/components/common/container";
import Header from "@/shared/components/common/header";
import { CheckboxOption, FormField, FormFieldList, TextInput } from "@/shared/components/form/form-fields";
import SubmitButton from "@/shared/components/form/submit-button";
import { hasStoredPassword, loadPassword } from "@/shared/utils/encryptPassword";

export default function Admin() {
  const [비밀번호, set비밀번호] = useAtom(AdminForm비밀번호Atom);
  const [비밀번호저장, set비밀번호저장] = useAtom(AdminForm비밀번호저장Atom);
  const licenseLink = useAtomValue(AdminLicenseLinkAtom);
  const isCopied = useAtomValue(AdminIsCopiedAtom);

  const { isSubmitting, handleSubmit, error } = useAdminForm();

  useEffect(() => {
    const loadSavedPassword = async () => {
      if (hasStoredPassword()) {
        const savedPassword = await loadPassword();
        set비밀번호(savedPassword);
        set비밀번호저장(true);
      }
    };
    loadSavedPassword();
  }, [set비밀번호, set비밀번호저장]);

  return (
    <Container>
      <Header title="Assetify" highlighted="Desk" />
      <FormFieldList onSubmit={handleSubmit}>
        <FormField title="라이선스 조회 링크 생성" required>
          <TextInput type="password" required placeholder="비밀번호" value={비밀번호} onChange={set비밀번호} />
          <CheckboxOption
            label="비밀번호 저장 (암호화되어 저장됩니다)"
            checked={비밀번호저장}
            onChange={set비밀번호저장}
          />
        </FormField>
        <SubmitButton text="생성하기" isLoading={isSubmitting} />
      </FormFieldList>
      <FormFieldList>
        {error && <p className="text-core-status-negative text-label">{error.message}</p>}
        {licenseLink && (
          <FormField title="생성된 링크">
            <div className="flex items-center gap-spacing-300 rounded-radius-300 border border-line-outline bg-components-fill-standard-secondary px-spacing-400 py-spacing-300">
              <code className="wrap-anywhere flex-1 text-content-standard-secondary text-label">{licenseLink}</code>
            </div>
            {isCopied && (
              <p className="w-full text-center font-semibold text-core-status-positive text-label">
                링크가 클립보드에 복사되었습니다! (1시간 유효)
              </p>
            )}
          </FormField>
        )}
      </FormFieldList>
    </Container>
  );
}
