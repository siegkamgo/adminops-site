#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
const insightsDir = path.join(root, "content", "insights");
const outputDir = path.join(root, "public", "images", "insights", "featured");

function getBatchNumber() {
  const cliValue = Number(process.argv[2] || "");
  if (Number.isInteger(cliValue) && cliValue > 0) return cliValue;

  const envValue = Number(process.env.BATCH_NUMBER || "");
  if (Number.isInteger(envValue) && envValue > 0) return envValue;

  return 1;
}

function batchFileName(batchNumber, suffix) {
  const label = String(batchNumber).padStart(2, "0");
  return `batch-${label}-${suffix}`;
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
}

function safeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function buildSearchQueries(item) {
  const primaryKeyword = safeText(item.primaryKeyword);
  const segment = safeText(item.segment);
  const segmentLower = segment.toLowerCase();

  if (segmentLower.includes("property")) {
    return [
      `${primaryKeyword} property management office`,
      "property management team office dashboard",
      "real estate operations team computer",
      "property accounting office teamwork",
      "leasing office staff working"
    ];
  }

  if (segmentLower.includes("restaurant")) {
    return [
      `${primaryKeyword} restaurant back office`,
      "restaurant manager office computer",
      "restaurant accounting and inventory staff",
      "hospitality operations team dashboard",
      "restaurant admin team working"
    ];
  }

  if (segmentLower.includes("clinic") || segmentLower.includes("medical")) {
    return [
      `${primaryKeyword} medical office admin`,
      "clinic administrative staff computer",
      "healthcare billing office team",
      "medical records workflow office",
      "clinic operations dashboard"
    ];
  }

  return [
    `${primaryKeyword} business office workflow`,
    `${segment} operations team software`,
    "business operations office team dashboard",
    "back office staff working with computer",
    "operations workflow meeting"
  ];
}

function scorePhoto(photo) {
  const width = Number(photo?.width || 0);
  const height = Number(photo?.height || 0);
  if (!width || !height) return -Infinity;

  const ratio = width / height;
  const ratioPenalty = Math.abs(ratio - 16 / 9);
  const sizeBonus = Math.min(width / 2000, 1) + Math.min(height / 1200, 1);

  return sizeBonus - ratioPenalty;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function pickRandomUniquePhoto(photos, usedPhotoIds) {
  if (!Array.isArray(photos) || photos.length === 0) return null;

  const uniquePool = photos.filter((photo) => {
    const id = Number(photo?.id || 0);
    if (!id || usedPhotoIds.has(id)) return false;

    const width = Number(photo?.width || 0);
    const height = Number(photo?.height || 0);
    if (width < 1200 || height < 700) return false;

    const ratio = width / height;
    return ratio >= 1.3 && ratio <= 2.4;
  });

  if (!uniquePool.length) {
    return null;
  }

  const scored = uniquePool
    .map((photo) => ({ photo, score: scorePhoto(photo) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(8, uniquePool.length));

  return scored[randomInt(0, scored.length - 1)]?.photo || null;
}

async function searchPexels(apiKey, query, page, perPage) {
  const params = new URLSearchParams({
    query,
    orientation: "landscape",
    size: "large",
    per_page: String(perPage),
    page: String(page)
  });

  const response = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: {
      Authorization: apiKey
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pexels search failed (${response.status}): ${body.slice(0, 300)}`);
  }

  return response.json();
}

async function downloadPhoto(url, outputPath, apiKey) {
  const response = await fetch(url, {
    headers: {
      Authorization: apiKey
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Image download failed (${response.status}): ${body.slice(0, 300)}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

function updateInsightFeaturedImage(slug, imagePath, title, photo) {
  const filePath = path.join(insightsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return false;

  const insight = JSON.parse(fs.readFileSync(filePath, "utf8"));
  insight.featuredImage = {
    src: imagePath,
    alt: `Featured image for ${title}`,
    caption: `Photo by ${photo?.photographer || "Pexels"} on Pexels`,
    creditUrl: photo?.url || "https://www.pexels.com"
  };

  fs.writeFileSync(filePath, JSON.stringify(insight, null, 2));
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  loadEnv(envPath);

  const batchNumber = getBatchNumber();
  const batchPath = path.join(root, "content", "editorial-batches", batchFileName(batchNumber, "20-titles.json"));
  const reportPath = path.join(root, "content", "editorial-batches", batchFileName(batchNumber, "featured-images-report.json"));

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PEXELS_API_KEY in .env.local");
  }

  if (!fs.existsSync(batchPath)) {
    throw new Error(`Batch file not found: ${batchPath}`);
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
  const items = Array.isArray(batch.items) ? batch.items : [];
  if (!items.length) {
    throw new Error("No batch items found");
  }

  const baseDelayMs = Number(process.env.PEXELS_DELAY_MS || 900);
  const jitterDelayMs = Number(process.env.PEXELS_DELAY_JITTER_MS || 700);
  const perPage = Number(process.env.PEXELS_PER_PAGE || 30);
  const maxPage = Number(process.env.PEXELS_MAX_PAGE || 40);
  const attemptsPerQuery = Number(process.env.PEXELS_ATTEMPTS_PER_QUERY || 3);

  fs.mkdirSync(outputDir, { recursive: true });

  const results = [];
  const usedPhotoIds = new Set();

  for (const item of items) {
    const slug = item.suggestedSlug;

    try {
      const queries = shuffle(buildSearchQueries(item));
      let chosenPhoto = null;

      for (const query of queries) {
        for (let attempt = 0; attempt < attemptsPerQuery; attempt += 1) {
          const page = randomInt(1, maxPage);
          await sleep(baseDelayMs + randomInt(0, jitterDelayMs));
          const searchResult = await searchPexels(apiKey, query, page, perPage);
          const candidate = pickRandomUniquePhoto(searchResult?.photos || [], usedPhotoIds);
          if (candidate) {
            chosenPhoto = candidate;
            break;
          }
        }

        if (chosenPhoto) break;
      }

      if (!chosenPhoto) {
        throw new Error("No suitable photo found from Pexels search");
      }

      usedPhotoIds.add(Number(chosenPhoto.id));

      const imageUrl = chosenPhoto?.src?.large2x || chosenPhoto?.src?.large || chosenPhoto?.src?.landscape || chosenPhoto?.src?.original;
      if (!imageUrl) {
        throw new Error("Pexels response did not include a usable image URL");
      }

      const outputPath = path.join(outputDir, `${slug}.jpg`);
      await downloadPhoto(imageUrl, outputPath, apiKey);

      const relativeImagePath = `/images/insights/featured/${slug}.jpg`;
      const updated = updateInsightFeaturedImage(slug, relativeImagePath, item.title, chosenPhoto);

      results.push({
        slug,
        status: "ok",
        image: relativeImagePath,
        insightUpdated: updated,
        photographer: chosenPhoto?.photographer || null,
        photographerUrl: chosenPhoto?.photographer_url || null,
        photoPage: chosenPhoto?.url || null,
        source: "pexels"
      });

      console.log(`Downloaded Pexels image: ${slug}`);
      await sleep(baseDelayMs + randomInt(0, jitterDelayMs));
    } catch (error) {
      results.push({ slug, status: "failed", error: error.message || String(error), source: "pexels" });
      console.error(`Failed image: ${slug} -> ${error.message || error}`);
    }
  }

  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        batch: batchNumber,
        total: items.length,
        success: results.filter((r) => r.status === "ok").length,
        failed: results.filter((r) => r.status === "failed").length,
        results
      },
      null,
      2
    )
  );

  console.log(`Completed. Success: ${results.filter((r) => r.status === "ok").length}, Failed: ${results.filter((r) => r.status === "failed").length}`);
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
