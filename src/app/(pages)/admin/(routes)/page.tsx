"use client";

import Container from "@/shared/components/common/container";
import Header from "@/shared/components/common/header";
import { FormField, FormFieldList, TextInput } from "@/shared/components/form/form-fields";
import SubmitButton from "@/shared/components/form/submit-button";

export default function Admin() {
  return (
    <Container>
      <Header title="Assetify" highlighted="Desk" />
      <FormFieldList>
        <FormField title="라이선스 조회 링크 생성" required>
          <TextInput type="password" required placeholder="비밀번호" />
        </FormField>
        <SubmitButton text="생성하기" />
      </FormFieldList>
    </Container>
  );
}
