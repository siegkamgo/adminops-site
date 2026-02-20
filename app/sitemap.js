export default function sitemap() {
  const baseUrl = "https://adminops.cloud";
  const contentUpdatedAt = process.env.NEXT_PUBLIC_SITE_UPDATED_AT || "2026-02-20";

  const routes = [
    "",
    "/adminops-pilot",
    "/analytics-setup",
    "/property-management-ai-agents",
    "/clinic-ops-ai-agents",
    "/restaurant-ops-ai-agents",
    "/blog/property-management-admin-automation"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: route.includes("/blog/") ? "2026-02-20" : contentUpdatedAt,
    changeFrequency: route.includes("/blog/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("/blog/") ? 0.8 : 0.9
  }));
}
