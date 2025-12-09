import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type React from "react";
import { Providers } from "@/shared/lib/provider";

export const metadata: Metadata = {
  title: "Assetify Desk",
  description: "대웅그룹 Notion 기반 자산 관련 문의, 수리 요청 웹서비스",
};

export const viewport: Viewport = {
  themeColor: "#ED8B00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
