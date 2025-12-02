import { NextResponse } from "next/server";
import { createSession } from "@/shared/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password !== process.env.SECRET_KEY) {
      return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }

    const { session, token } = await createSession();

    return NextResponse.json({
      sessionId: token,
      expiresAt: session.expiresAt,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "세션 생성에 실패했습니다." }, { status: 500 });
  }
}
