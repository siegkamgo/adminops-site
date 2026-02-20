import { listPublishedInsights } from "../lib/insights-store";

export default function sitemap() {
  const baseUrl = "https://adminops.cloud";
  const contentUpdatedAt = process.env.NEXT_PUBLIC_SITE_UPDATED_AT || "2026-02-20";
  const dynamicInsightRoutes = listPublishedInsights().map((item) => ({
    route: `/insights/${item.slug}`,
    lastModified: item.publishDate || contentUpdatedAt
  }));

  const routes = [
    "",
    "/adminops-pilot",
    "/analytics-setup",
    "/property-management-ai-agents",
    "/clinic-ops-ai-agents",
    "/restaurant-ops-ai-agents",
    "/blog/property-management-admin-automation",
    "/insights",
    "/comparisons/adminops-vs-hiring-admin-staff",
    "/comparisons/adminops-vs-rpa-tools",
    "/comparisons/adminops-vs-virtual-assistants",
    "/guides/property-management-automation-guide",
    "/guides/clinic-automation-guide",
    "/guides/restaurant-automation-guide",
    ...dynamicInsightRoutes.map((item) => item.route)
  ];

  const insightLastModifiedByRoute = new Map(dynamicInsightRoutes.map((item) => [item.route, item.lastModified]));

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified:
      insightLastModifiedByRoute.get(route) ||
      (route.includes("/blog/") ? "2026-02-20" : contentUpdatedAt),
    changeFrequency: route.includes("/blog/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("/blog/") ? 0.8 : 0.9
  }));
}
