import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content", "insights");

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

export function saveInsight(insight) {
  ensureDir();
  const fullPath = path.join(contentDir, `${insight.slug}.json`);
  fs.writeFileSync(fullPath, JSON.stringify(insight, null, 2));
  return fullPath;
}
