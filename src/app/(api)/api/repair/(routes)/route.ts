import { NextResponse } from "next/server";
import type { RepairCreatePageData } from "@/app/(api)/api/repair/types";
import { notionRequest } from "@/shared/lib/notion";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const 법인 = formData.get("법인") as string;
    const 부서 = formData.get("부서") as string;
    const 문의자 = formData.get("문의자") as string;
    const 실제근무위치 = formData.get("실제근무위치") as string;
    const 자산번호 = formData.get("자산번호") as string;
    const 고장내역 = formData.get("고장내역") as string;
    const 고장증상 = formData.get("문의내용") as string;
    const 긴급도 = formData.get("긴급도") as string;
    const 수리진행동의서 = formData.get("수리진행동의서") === "true";

    const body = {
      parent: {
        data_source_id: process.env.REPAIR_TICKETS_DATA_SOURCE_ID,
      },
      properties: {
        법인: { select: { name: 법인 || "" } },
        부서: { rich_text: [{ text: { content: 부서 || "" } }] },
        문의자: { rich_text: [{ text: { content: 문의자 || "" } }] },
        "실제 근무 위치": {
          rich_text: [{ text: { content: 실제근무위치 || "" } }],
        },
        자산번호: { rich_text: [{ text: { content: 자산번호 || "" } }] },
        "고장 내역": { multi_select: [{ name: 고장내역 || "" }] },
        고장증상: { title: [{ text: { content: 고장증상 || "" } }] },
        긴급도: { select: { name: 긴급도 || "" } },
        "수리 진행 동의서": { checkbox: 수리진행동의서 },
      },
    };

    const notionResponse = await notionRequest<RepairCreatePageData>("/pages", {
      method: "POST",
      body,
    });

    const response = {
      ticketId: notionResponse.id,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
