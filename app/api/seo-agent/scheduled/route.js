import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

function utcTodayString() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET() {
  try {
    const calendarPath = path.join(process.cwd(), "content", "editorial-calendar-two-weeks.json");
    if (!fs.existsSync(calendarPath)) {
      return NextResponse.json({ items: [] });
    }

    const raw = fs.readFileSync(calendarPath, "utf8");
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed.items) ? parsed.items : [];

    const previewToken = process.env.INSIGHTS_PREVIEW_TOKEN || "";
    const today = utcTodayString();

    const normalized = items.map((item) => {
      const isPublished = Boolean(item.publishDate && item.publishDate <= today);
      const previewPath = previewToken
        ? `/insights/${item.slug}?preview=1&token=${encodeURIComponent(previewToken)}`
        : null;

      return {
        day: item.day,
        publishDate: item.publishDate,
        slug: item.slug,
        title: item.title,
        segment: item.segment,
        isPublished,
        insightPath: `/insights/${item.slug}`,
        previewPath
      };
    });

    return NextResponse.json({
      generatedAt: parsed.generatedAt || null,
      timezone: parsed.timezone || "UTC",
      items: normalized
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load scheduled insights" }, { status: 500 });
  }
}
