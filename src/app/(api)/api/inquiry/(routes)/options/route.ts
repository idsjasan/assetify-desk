import { NextResponse } from "next/server";
import type { InquiryRetrieveData } from "@/app/(api)/api/inquiry/types";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  const data_source = await notionRequest<InquiryRetrieveData>(
    `/data_sources/${process.env.INQUIRY_TICKETS_DATA_SOURCE_ID}`,
  );

  const options = {
    법인: (data_source.properties.법인.select?.options || []).map(
      (option: { name: string }) => option.name,
    ),
    문의유형: (data_source.properties.문의유형.select?.options || []).map(
      (option: { name: string }) => option.name,
    ),
    긴급도: (data_source.properties.긴급도.select?.options || []).map(
      (option: { name: string }) => option.name,
    ),
  };

  return NextResponse.json(options);
}
