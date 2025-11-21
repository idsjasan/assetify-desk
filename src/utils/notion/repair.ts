import type { RepairTicketDetail } from "@/types/repairTicket";
import { NOTION_PAGES_ENDPOINT, notionHeaders } from "@/utils/notion/ask";

export const REPAIR_TICKETS_DATABASE_ID =
  process.env.REPAIR_TICKETS_DATABASE_ID;

const NOTION_BASE_URL = "https://api.notion.com/v1";

type NotionSelectOption = {
  name?: string | null;
};

type NotionSelectProperty =
  | {
      select?: { options?: NotionSelectOption[] };
      multi_select?: { options?: NotionSelectOption[] };
      status?: { options?: NotionSelectOption[] };
    }
  | undefined;

export type RepairSelectOptions = {
  corporations: string[];
  urgencies: string[];
  issueTypes: string[];
};

const propertyNameMap = {
  title: "고장증상",
  corporation: "법인",
  department: "부서",
  requester: "문의자",
  assetNumber: "자산번호",
  team: "Team",
  urgency: "긴급도",
  issueType: "고장 내역",
  location: "실제 근무 위치",
  status: "상태",
  progressStatus: "수리진행상황",
  assignee: "담당자",
  attachments: "첨부파일",
  consent: "수리 진행 동의서",
  actionNotes: "조치내용",
  liability: "과실여부",
  schedule: "수리 일정",
  price: "단가",
};

export const REPAIR_FIELD_NAMES = propertyNameMap;

const extractOptions = (property?: NotionSelectProperty) => {
  if (!property) return [];
  const candidates =
    property.select?.options ??
    property.multi_select?.options ??
    property.status?.options ??
    [];

  return candidates
    .map((option) => option?.name)
    .filter((name): name is string => Boolean(name));
};

const extractMultiSelectOptions = (property?: NotionSelectProperty) => {
  if (!property?.multi_select?.options) return [];
  return property.multi_select.options
    .map((option) => option?.name)
    .filter((name): name is string => Boolean(name));
};

export async function fetchRepairDatabase() {
  if (!REPAIR_TICKETS_DATABASE_ID) {
    throw new Error("REPAIR_TICKETS_DATABASE_ID is not configured");
  }

  const response = await fetch(
    `${NOTION_BASE_URL}/databases/${REPAIR_TICKETS_DATABASE_ID}`,
    {
      method: "GET",
      cache: "no-store",
      headers: notionHeaders,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : "Failed to fetch Notion database";
    throw new Error(message);
  }

  return data as {
    properties?: Record<string, NotionSelectProperty>;
  };
}

export async function loadRepairSelectOptions(): Promise<RepairSelectOptions> {
  const database = await fetchRepairDatabase();
  const properties = database.properties ?? {};

  return {
    corporations: extractOptions(properties[propertyNameMap.corporation]),
    urgencies: extractOptions(properties[propertyNameMap.urgency]),
    issueTypes: extractMultiSelectOptions(
      properties[propertyNameMap.issueType],
    ),
  };
}

type NotionTextSpan = {
  plain_text?: string;
};

type NotionPropertyValue = {
  type: string;
  title?: NotionTextSpan[];
  rich_text?: NotionTextSpan[];
  select?: { name?: string | null } | null;
  multi_select?: Array<{ name?: string | null }> | null;
  status?: { name?: string | null } | null;
  people?: Array<{ name?: string | null }> | null;
  files?: Array<{ name?: string | null }> | null;
  checkbox?: boolean;
  date?: { start?: string | null; end?: string | null } | null;
  number?: number | null;
};

const getPlainText = (property?: NotionPropertyValue) => {
  if (!property) return undefined;
  if (property.type === "title" && property.title) {
    return property.title
      .map((item) => item.plain_text ?? "")
      .join("")
      .trim();
  }
  if (property.rich_text) {
    return property.rich_text
      .map((item) => item.plain_text ?? "")
      .join("")
      .trim();
  }
  return undefined;
};

const getSelectName = (property?: NotionPropertyValue) =>
  property?.select?.name ?? property?.status?.name ?? undefined;

const getStatusName = (property?: NotionPropertyValue) =>
  property?.status?.name ?? undefined;

const getMultiSelectNames = (property?: NotionPropertyValue) =>
  property?.multi_select
    ?.map((option) => option?.name)
    .filter((name): name is string => Boolean(name));

const getPeopleNames = (property?: NotionPropertyValue) =>
  property?.people?.map((person) => person.name).filter(Boolean) as
    | string[]
    | undefined;

const getFileNames = (property?: NotionPropertyValue) =>
  property?.files?.map((file) => file.name).filter(Boolean) as
    | string[]
    | undefined;

const getDateValue = (property?: NotionPropertyValue) =>
  property?.date?.start ?? undefined;

const getNumberText = (property?: NotionPropertyValue) =>
  typeof property?.number === "number"
    ? property.number.toLocaleString("ko-KR")
    : undefined;

export async function fetchRepairTicketDetail(
  ticketId: string,
): Promise<RepairTicketDetail> {
  const response = await fetch(`${NOTION_PAGES_ENDPOINT}/${ticketId}`, {
    method: "GET",
    cache: "no-store",
    headers: notionHeaders,
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : "수리 요청 정보를 불러오지 못했습니다.";
    throw new Error(message);
  }

  const properties = data.properties as
    | Record<string, NotionPropertyValue>
    | undefined;

  const getProp = (field: keyof typeof propertyNameMap) =>
    properties?.[propertyNameMap[field]];

  return {
    id: data.id,
    url: data.url ?? null,
    createdTime: data.created_time,
    lastEditedTime: data.last_edited_time,
    archived: data.archived ?? false,
    detail: getPlainText(getProp("title")),
    corporation: getSelectName(getProp("corporation")),
    team: getSelectName(getProp("team")),
    urgency: getSelectName(getProp("urgency")),
    issueTypes: getMultiSelectNames(getProp("issueType")),
    assetNumber: getPlainText(getProp("assetNumber")),
    department: getPlainText(getProp("department")),
    requester: getPlainText(getProp("requester")),
    location: getPlainText(getProp("location")),
    status: getSelectName(getProp("status")),
    progressStatus: getStatusName(getProp("progressStatus")),
    assignee: getPeopleNames(getProp("assignee"))?.join(", "),
    attachments: getFileNames(getProp("attachments")),
    actionNotes: getPlainText(getProp("actionNotes")),
    liability: getSelectName(getProp("liability")),
    schedule: getDateValue(getProp("schedule")),
    price: getNumberText(getProp("price")),
  };
}

export const buildMultiSelectProperty = (values?: string[]) =>
  values && values.length > 0
    ? {
        multi_select: values.map((value) => ({ name: value })),
      }
    : undefined;

export const buildCheckboxProperty = (value?: boolean) =>
  typeof value === "boolean"
    ? {
        checkbox: value,
      }
    : undefined;

export async function deleteRepairTicket(ticketId: string) {
  const response = await fetch(`${NOTION_PAGES_ENDPOINT}/${ticketId}`, {
    method: "PATCH",
    headers: notionHeaders,
    body: JSON.stringify({ archived: true }),
  });

  if (!response.ok) {
    const data = await response.json();
    const message =
      typeof data?.message === "string"
        ? data.message
        : "수리 요청 삭제에 실패했습니다.";
    throw new Error(message);
  }
}
