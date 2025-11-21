import {
  FileUploadInput,
  FormField,
  RadioSelect,
  RichTextInput,
  SelectInput,
  TextInput,
} from "@/components/ask-form/form-fields";

export default function AskForm() {
  return (
    <div className="flex flex-col items-center justify-start gap-spacing-700 px-spacing-700 py-spacing-900">
      <span className="font-semibold text-display">
        Ask Form<span className="text-core-accent">.</span>
      </span>
      <div className="flex w-full flex-col items-center gap-spacing-500">
        <FormField
          title="법인"
          description="현재 소속되어계신 법인을 입력해주세요."
          required={true}
        >
          <SelectInput
            defaultValue=""
            options={[
              { label: "선택해주세요", value: "", disabled: true },
              { label: "대웅제약", value: "대웅제약" },
              { label: "대웅", value: "대웅" },
              { label: "IdsTrust", value: "IdsTrust" },
            ]}
            required
          />
        </FormField>

        <FormField
          title="부서"
          description="현재 소속되어계신 부서를 입력해주세요."
        >
          <TextInput defaultValue="" placeholder="ex. 경영지원팀" required />
        </FormField>

        <FormField
          title="자산번호"
          description="사용중인 기기에 붙어있는 자산번호를 적어주세요."
          required
        >
          <TextInput defaultValue="" placeholder="ex. 2309-N0001" required />
        </FormField>

        <FormField
          title="문의 유형"
          required
          description="필요하신 지원 유형을 골라주세요."
        >
          <RadioSelect
            name="request-type"
            defaultValue="PC/OA"
            required
            options={[
              {
                label: "PC/OA",
                value: "PC/OA",
                description: "일반 하드웨어/ 소프트웨어 관련 문의",
              },
              {
                label: "인프라/보안시스템",
                value: "인프라/보안시스템",
                description: "베어독/보안프로그램 관련 문의",
              },
              {
                label: "네트워크",
                value: "네트워크",
              },
              {
                label: "라이선스",
                value: "라이선스",
              },
              {
                label: "기타",
                value: "기타",
              },
            ]}
          />
        </FormField>

        <FormField
          title="문의 내용"
          description="필요한 도움이나 요청 사항을 구체적으로 입력해주세요."
        >
          <RichTextInput
            id="detail"
            placeholder="상세히 적어주실수록 더욱 빠른 처리가 가능합니다."
          />
        </FormField>

        <FormField
          title="참고 자료"
          description="각종 첨부 파일을 업로드 하실 수 있습니다."
        >
          <FileUploadInput
            id="reference-file"
            accept=".pdf,image/*"
            hint="대외비등 의 자료를 업로드 하지 말아주세요."
          />
        </FormField>

        <FormField title="급하신가요?" required>
          <RadioSelect
            name="request-type"
            defaultValue="매우 급합니다."
            required
            options={[
              {
                label: "매우 급합니다.",
                value: "매우 급합니다.",
              },
              {
                label: "조금 급합니다.",
                value: "조금 급합니다.",
              },
              {
                label: "기다릴 수 있어요.",
                value: "기다릴 수 있어요.",
              },
            ]}
          />
        </FormField>

        <button
          type="submit"
          className="w-full max-w-[768px] rounded-radius-700 bg-core-accent px-spacing-500 py-spacing-300 font-semibold text-heading text-solid-white transition duration-100 hover:opacity-75 active:scale-95 active:opacity-50"
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
