export default function sitemap() {
  const baseUrl = "https://adminops.cloud";

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
    lastModified: new Date(),
    changeFrequency: route.includes("/blog/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("/blog/") ? 0.8 : 0.9
  }));
}
