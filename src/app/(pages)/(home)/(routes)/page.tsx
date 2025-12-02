"use client";

import MenuButton from "@/app/(pages)/(home)/(components)/menuButton";
import Container from "@/shared/components/common/container";
import Header from "@/shared/components/common/header";

export default function Home() {
  return (
    <Container className="items-center md:h-dvh md:justify-center">
      <Header title="Assetify" highlighted="Desk" />
      <div className="grid w-full max-w-3xl grid-cols-1 gap-spacing-400 md:grid-cols-2">
        <MenuButton href="/inquiry" title="문의하기" description="자산 관련 문의 사항을 해결할 수 있어요." />
        <MenuButton
          href="/repair"
          title="수리 요청하기"
          description="하드웨어 고장이 난 경우 수리를 요청할 수 있어요."
        />
      </div>
    </Container>
  );
}
