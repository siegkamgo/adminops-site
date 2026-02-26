import { NextResponse } from "next/server";
import { listInsights } from "../../../../lib/insights-store";

function utcTodayString() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET() {
  try {
    const previewToken = process.env.INSIGHTS_PREVIEW_TOKEN || "";
    const today = utcTodayString();

    const items = listInsights()
      .filter((item) => item?.slug && item?.publishDate)
      .sort((a, b) => {
        const dateCompare = String(a.publishDate).localeCompare(String(b.publishDate));
        if (dateCompare !== 0) {
          return dateCompare;
        }

        return String(a.slug).localeCompare(String(b.slug));
      });

    const normalized = items.map((item) => {
      const isPublished = Boolean(item.publishDate && item.publishDate <= today);
      const previewPath = previewToken
        ? `/insights/${item.slug}?preview=1&token=${encodeURIComponent(previewToken)}`
        : null;

      return {
        day: item.day || null,
        publishDate: item.publishDate,
        slug: item.slug,
        title: item.title,
        segment: item.segment || "Insights",
        isPublished,
        insightPath: `/insights/${item.slug}`,
        previewPath
      };
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      timezone: "UTC",
      items: normalized
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to load scheduled insights" }, { status: 500 });
  }
}
