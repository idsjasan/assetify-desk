import { NextResponse } from "next/server";

import {
  deleteRepairTicket,
  fetchRepairTicketDetail,
} from "@/utils/notion/repair";

type RouteContext = {
  params: Promise<{ ticketId: string }>;
};

export async function POST(_: Request, context: RouteContext) {
  const { ticketId } = await context.params;

  if (!ticketId) {
    return NextResponse.json(
      { error: "ticketId가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const detail = await fetchRepairTicketDetail(ticketId);
    if (detail.archived) {
      return NextResponse.json(
        { error: "이미 취소된 요청입니다." },
        { status: 400 },
      );
    }

    if (detail.assignee && detail.assignee.trim().length > 0) {
      return NextResponse.json(
        { error: "담당자가 지정된 요청은 취소할 수 없습니다." },
        { status: 400 },
      );
    }

    if (
      (detail.status && detail.status !== "시작 전") ||
      (detail.progressStatus && detail.progressStatus !== "시작 전")
    ) {
      return NextResponse.json(
        { error: "이미 진행 중인 요청은 취소할 수 없습니다." },
        { status: 400 },
      );
    }

    await deleteRepairTicket(ticketId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "수리 요청 취소 처리에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
