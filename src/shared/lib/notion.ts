const NOTION_API_VERSION = "2025-09-03";
const NOTION_BASE_URL = "https://api.notion.com/v1";

export async function notionRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${NOTION_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_API_VERSION,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return response.json();
}
