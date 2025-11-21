import { NextResponse } from "next/server";

import { deleteAskTicket, fetchAskTicketDetail } from "@/utils/notion/ask";

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
    const detail = await fetchAskTicketDetail(ticketId);
    if (detail.archived) {
      return NextResponse.json(
        { error: "이미 취소된 문의입니다." },
        { status: 400 },
      );
    }

    if (detail.assignee && detail.assignee.trim().length > 0) {
      return NextResponse.json(
        { error: "담당자가 지정된 문의는 취소할 수 없습니다." },
        { status: 400 },
      );
    }
    if (detail.status && detail.status !== "시작 전") {
      return NextResponse.json(
        { error: "이미 진행 중인 문의는 취소할 수 없습니다." },
        { status: 400 },
      );
    }

    await deleteAskTicket(ticketId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "문의 취소 처리에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
