import { LucideShield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-spacing-700">
      <div className="flex flex-col items-center justify-center gap-spacing-200">
        <span className="text-display font-bold">
          Assetify <span className="text-core-accent">Desk.</span>
        </span>
        <span className="text-body text-content-standard-secondary">
          간편하게 문의하고, 진행 상황을 확인해 보세요
        </span>
      </div>
      <div className="mb-spacing-1000 flex max-w-64 flex-col items-center justify-center gap-spacing-500 md:flex-row">
        <div className="flex w-full shrink-0 flex-col items-start justify-center gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-500 text-content-standard-primary-primary duration-100 cursor-pointer hover:opacity-75 active:scale-95 active:opacity-50">
          <span className="text-heading font-semibold">문의하기</span>
          <span className="text-label">자산 관련 문의 사항이 있는 경우</span>
        </div>
        <div className="flex w-full shrink-0 flex-col items-start justify-center gap-spacing-100 rounded-radius-700 border border-line-outline bg-components-fill-standard-primary p-spacing-500 text-content-standard-primary-primary duration-100 cursor-pointer hover:opacity-75 active:scale-95 active:opacity-50">
          <span className="text-heading font-semibold">수리 요청하기</span>
          <span className="text-label">
            하드웨어 고장으로 수리가 필요한 경우
          </span>
        </div>
      </div>
      <div className="fixed bottom-spacing-900 flex flex-col items-center justify-center gap-spacing-300 text-core-accent">
        <div className="flex flex-row items-center justify-center gap-spacing-150">
          <LucideShield size={16} />
          <span className="text-label">서버와 안전하게 연결되어있어요.</span>
        </div>
        <span className="text-body text-content-standard-secondary">
          &copy; 2025 IdsTrust. All rights reserved.
        </span>
      </div>
    </div>
  );
}
