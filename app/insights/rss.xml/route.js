import { listPublishedInsights } from "../../../lib/insights-store";

function escapeXml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRfc822Date(dateValue) {
  const date = new Date(dateValue || Date.now());
  if (Number.isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}

export async function GET() {
  const baseUrl = "https://adminops.cloud";
  const now = new Date().toUTCString();
  const insights = listPublishedInsights();

  const staticItems = [
    {
      title: "AdminOps | AI Agent Automation for Admin Operations",
      link: `${baseUrl}/`,
      description: "Automate repetitive admin workflows while your team keeps final approval.",
      pubDate: now
    },
    {
      title: "AdminOps Insights",
      link: `${baseUrl}/insights`,
      description: "Data-backed SEO and operations insights generated from live search demand.",
      pubDate: now
    }
  ];

  const insightItems = insights.map((insight) => ({
    title: insight.title,
    link: `${baseUrl}/insights/${insight.slug}`,
    description: insight.metaDescription,
    pubDate: toRfc822Date(insight.publishDate)
  }));

  const items = [...staticItems, ...insightItems]
    .map(
      (item) => `<item>
  <title>${escapeXml(item.title)}</title>
  <link>${escapeXml(item.link)}</link>
  <guid>${escapeXml(item.link)}</guid>
  <description>${escapeXml(item.description)}</description>
  <pubDate>${escapeXml(item.pubDate)}</pubDate>
</item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>AdminOps Insights Feed</title>
  <link>${baseUrl}/insights</link>
  <description>AdminOps insights and automation content updates.</description>
  <language>en-us</language>
  <lastBuildDate>${now}</lastBuildDate>
${items}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}