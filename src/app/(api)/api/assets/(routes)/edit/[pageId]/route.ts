import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { convertToNotionProperties } from "@/app/(api)/api/assets/(utils)/convertToNotionProperties";
import { notionRequest } from "@/shared/lib/notion";

type RouteContext = {
  params: Promise<{ pageId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { pageId } = await context.params;
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ message: "수정할 데이터가 필요합니다." }, { status: 400 });
    }

    const properties = body.properties ? body.properties : convertToNotionProperties(body);

    if (Object.keys(properties).length === 0) {
      return NextResponse.json({ message: "유효한 프로퍼티가 없습니다." }, { status: 400 });
    }

    const notionResponse = await notionRequest<any>(`/pages/${pageId}`, {
      method: "PATCH",
      body: {
        properties,
      },
    });

    return NextResponse.json({
      message: "자산이 성공적으로 수정되었습니다.",
      pageId: notionResponse.id,
    });
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
