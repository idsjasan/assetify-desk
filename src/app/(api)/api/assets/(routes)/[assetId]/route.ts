import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

type RouteContext = {
  params: Promise<{ assetId: string }>;
};

export async function GET(_: NextRequest, context: RouteContext) {
  try {
    const { assetId } = await context.params;

    const notionResponse = await notionRequest<any>(`/data_source/${process.env.ASSETS_DATA_SOURCE_ID}/query`, {
      method: "POST",
      body: {
        filter: {
          property: "자산번호",
          select: {
            equals: assetId,
          },
        },
      },
    });

    const response = { notionResponse };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
