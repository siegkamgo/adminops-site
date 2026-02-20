import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content", "insights");

function toUtcDateString(value) {
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isInsightPublished(insight, now = new Date()) {
  const publishDate = insight?.publishDate;
  if (!publishDate) {
    return true;
  }

  return publishDate <= toUtcDateString(now);
}

function ensureDir() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
}

export function listInsights() {
  ensureDir();

  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => b.localeCompare(a));

  return files.map((file) => {
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(raw);
  });
}

export function getInsightBySlug(slug) {
  ensureDir();
  const fullPath = path.join(contentDir, `${slug}.json`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

export function listPublishedInsights(now = new Date()) {
  return listInsights().filter((insight) => isInsightPublished(insight, now));
}

export function getPublishedInsightBySlug(slug, now = new Date()) {
  const insight = getInsightBySlug(slug);
  if (!insight || !isInsightPublished(insight, now)) {
    return null;
  }

  return insight;
}

export function saveInsight(insight) {
  ensureDir();
  const fullPath = path.join(contentDir, `${insight.slug}.json`);
  fs.writeFileSync(fullPath, JSON.stringify(insight, null, 2));
  return fullPath;
}
