import { execSync } from "node:child_process";
import { listPublishedInsights } from "../lib/insights-store";

function getGitLastModified(relativePath) {
  try {
    const output = execSync(`git log -1 --format=%cs -- "${relativePath}"`, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();

    return output || null;
  } catch {
    return null;
  }
}

export default function sitemap() {
  const baseUrl = "https://adminops.cloud";
  const contentUpdatedAt = process.env.NEXT_PUBLIC_SITE_UPDATED_AT || "2026-02-20";
  const staticRouteToSourceFile = new Map([
    ["", "app/page.js"],
    ["/adminops-pilot", "app/adminops-pilot/page.js"],
    ["/analytics-setup", "app/analytics-setup/page.js"],
    ["/property-management-ai-agents", "app/property-management-ai-agents/page.js"],
    ["/clinic-ops-ai-agents", "app/clinic-ops-ai-agents/page.js"],
    ["/restaurant-ops-ai-agents", "app/restaurant-ops-ai-agents/page.js"],
    ["/blog/property-management-admin-automation", "app/blog/property-management-admin-automation/page.js"],
    ["/insights", "app/insights/page.js"],
    ["/insights/rss.xml", "app/insights/rss.xml/route.js"],
    ["/comparisons/adminops-vs-hiring-admin-staff", "app/comparisons/adminops-vs-hiring-admin-staff/page.js"],
    ["/comparisons/adminops-vs-rpa-tools", "app/comparisons/adminops-vs-rpa-tools/page.js"],
    ["/comparisons/adminops-vs-virtual-assistants", "app/comparisons/adminops-vs-virtual-assistants/page.js"],
    ["/guides/property-management-automation-guide", "app/guides/property-management-automation-guide/page.js"],
    ["/guides/clinic-automation-guide", "app/guides/clinic-automation-guide/page.js"],
    ["/guides/restaurant-automation-guide", "app/guides/restaurant-automation-guide/page.js"]
  ]);

  const dynamicInsightRoutes = listPublishedInsights().map((item) => ({
    route: `/insights/${item.slug}`,
    sourceFile: `content/insights/${item.slug}.json`,
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
    "/insights/rss.xml",
    "/comparisons/adminops-vs-hiring-admin-staff",
    "/comparisons/adminops-vs-rpa-tools",
    "/comparisons/adminops-vs-virtual-assistants",
    "/guides/property-management-automation-guide",
    "/guides/clinic-automation-guide",
    "/guides/restaurant-automation-guide",
    ...dynamicInsightRoutes.map((item) => item.route)
  ];

  const insightLastModifiedByRoute = new Map(dynamicInsightRoutes.map((item) => [item.route, item.lastModified]));
  const insightSourceFileByRoute = new Map(dynamicInsightRoutes.map((item) => [item.route, item.sourceFile]));

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified:
      getGitLastModified(insightSourceFileByRoute.get(route) || staticRouteToSourceFile.get(route)) ||
      insightLastModifiedByRoute.get(route) ||
      (route.includes("/blog/") ? "2026-02-20" : contentUpdatedAt),
    changeFrequency: route.includes("/blog/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("/blog/") ? 0.8 : 0.9,
    alternates: {
      languages: {
        "en-US": `${baseUrl}${route}`,
        "x-default": `${baseUrl}${route}`
      }
    }
  }));
}
