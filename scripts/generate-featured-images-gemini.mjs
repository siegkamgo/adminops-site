#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
const batchPath = path.join(root, "content", "editorial-batches", "batch-01-20-titles.json");
const insightsDir = path.join(root, "content", "insights");
const outputDir = path.join(root, "public", "images", "insights", "featured");

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

function buildPrompt(item) {
  const segment = safeText(item.segment);
  const keyword = safeText(item.primaryKeyword);
  const title = safeText(item.title);

  return [
    "Create a premium, modern, editorial featured image for a B2B operations automation article.",
    `Article title: ${title}`,
    `Primary topic: ${keyword}`,
    `Audience segment: ${segment}`,
    "Style: clean SaaS illustration, soft gradients, professional, high contrast, minimal clutter.",
    "Composition: 16:9 landscape hero image with clear focal point and workflow motif.",
    "Constraints: no logos, no copyrighted brands, no text overlays, no watermarks, no people faces.",
    "Use visual metaphors like dashboards, process flows, and controlled automation systems.",
    "Color mood: blue, slate, and neutral tones aligned with enterprise software websites."
  ].join("\n");
}

function extractImageBase64(response) {
  const candidates = response?.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts || [];
    for (const part of parts) {
      const inlineData = part?.inlineData || part?.inline_data;
      if (inlineData?.data) {
        return { data: inlineData.data, mimeType: inlineData.mimeType || inlineData.mime_type || "image/png" };
      }
    }
  }
  return null;
}

function extractText(response) {
  if (!response) return "";

  const directText = response.text;
  if (typeof directText === "string" && directText.trim()) {
    return directText;
  }
  if (typeof directText === "function") {
    try {
      const computed = directText.call(response);
      if (typeof computed === "string" && computed.trim()) {
        return computed;
      }
    } catch {
      // Ignore and continue with candidate parsing.
    }
  }

  const candidates = response?.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts || [];
    for (const part of parts) {
      if (typeof part?.text === "string" && part.text.trim()) {
        return part.text;
      }
    }
  }
  return "";
}

function extractSvg(text) {
  const raw = String(text || "");
  const codeFenceMatch = raw.match(/```(?:svg)?\s*([\s\S]*?)```/i);
  const candidate = codeFenceMatch ? codeFenceMatch[1] : raw;
  const svgMatch = candidate.match(/<svg[\s\S]*<\/svg>/i);
  return svgMatch ? svgMatch[0] : "";
}

function hashString(value) {
  let hash = 0;
  const source = String(value || "");
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickPalette(seed) {
  const palettes = [
    ["#0B1220", "#1D4ED8", "#60A5FA", "#0EA5E9"],
    ["#0F172A", "#334155", "#3B82F6", "#22D3EE"],
    ["#111827", "#1E3A8A", "#2563EB", "#38BDF8"],
    ["#0B1324", "#1E293B", "#0EA5E9", "#818CF8"]
  ];
  return palettes[seed % palettes.length];
}

function buildLocalSvg(prompt, slug) {
  const seed = hashString(`${slug}-${prompt}`);
  const [bgA, bgB, accentA, accentB] = pickPalette(seed);
  const nodeY1 = 180 + (seed % 80);
  const nodeY2 = 420 + (seed % 60);
  const rightY = 260 + (seed % 120);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${bgA}"/>
      <stop offset="1" stop-color="${bgB}"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0.05)"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accentA}"/>
      <stop offset="1" stop-color="${accentB}"/>
    </linearGradient>
    <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="200" cy="120" r="220" fill="${accentA}" opacity="0.20" filter="url(#blur)"/>
  <circle cx="1420" cy="760" r="260" fill="${accentB}" opacity="0.18" filter="url(#blur)"/>

  <rect x="180" y="110" width="1240" height="680" rx="36" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.20)"/>
  <rect x="250" y="190" width="280" height="170" rx="24" fill="url(#card)" stroke="rgba(255,255,255,0.25)"/>
  <rect x="250" y="420" width="320" height="200" rx="24" fill="url(#card)" stroke="rgba(255,255,255,0.25)"/>
  <rect x="1020" y="280" width="320" height="200" rx="24" fill="url(#card)" stroke="rgba(255,255,255,0.25)"/>
  <rect x="700" y="170" width="240" height="140" rx="24" fill="url(#card)" stroke="rgba(255,255,255,0.25)"/>
  <rect x="700" y="500" width="240" height="140" rx="24" fill="url(#card)" stroke="rgba(255,255,255,0.25)"/>

  <path d="M530 ${nodeY1} C620 ${nodeY1 - 20}, 640 240, 700 240" stroke="url(#line)" stroke-width="10" stroke-linecap="round"/>
  <path d="M530 ${nodeY2} C620 ${nodeY2 - 10}, 640 570, 700 570" stroke="url(#line)" stroke-width="10" stroke-linecap="round"/>
  <path d="M940 240 C1020 245, 980 ${rightY}, 1020 ${rightY}" stroke="url(#line)" stroke-width="10" stroke-linecap="round"/>
  <path d="M940 570 C1020 560, 980 ${rightY + 80}, 1020 ${rightY + 80}" stroke="url(#line)" stroke-width="10" stroke-linecap="round"/>

  <circle cx="700" cy="240" r="12" fill="${accentA}"/>
  <circle cx="700" cy="570" r="12" fill="${accentB}"/>
  <circle cx="1020" cy="${rightY}" r="12" fill="${accentA}"/>
  <circle cx="1020" cy="${rightY + 80}" r="12" fill="${accentB}"/>
</svg>`;
}

async function generateWithFallback(ai, prompt, slug) {
  const mode = String(process.env.GEMINI_IMAGE_MODE || "").toLowerCase();
  if (mode === "local" || mode === "local-only") {
    return {
      svg: buildLocalSvg(prompt, slug),
      mimeType: "image/svg+xml",
      source: "local-fallback"
    };
  }

  const imageModels = ["imagen-3.0-generate-002", "imagen-3.0-generate-001"];
  const multimodalModels = ["gemini-2.0-flash-preview-image-generation", "gemini-2.0-flash-exp-image-generation"];

  let lastError = null;

  for (const model of imageModels) {
    try {
      const response = await ai.models.generateImages({
        model,
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/png",
          aspectRatio: "16:9"
        }
      });

      const generatedImages = response?.generatedImages || response?.images || [];
      const first = generatedImages[0]?.image || generatedImages[0];
      const data = first?.imageBytes || first?.bytesBase64Encoded || first?.data;
      if (data) {
        return { data, mimeType: "image/png" };
      }
    } catch (error) {
      lastError = error;
    }
  }

  for (const model of multimodalModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseModalities: ["TEXT", "IMAGE"]
        }
      });

      const extracted = extractImageBase64(response);
      if (extracted) {
        return extracted;
      }
    } catch (error) {
      lastError = error;
    }
  }

  try {
    const svgPrompt = [
      "Generate a complete standalone SVG image (1600x900) only.",
      "Return ONLY valid SVG markup with no markdown, no explanation, and no surrounding text.",
      "Design brief:",
      prompt,
      "Additional constraints: no logos, no brand names, no text labels, no watermarks.",
      "Use modern abstract workflow shapes, cards, connectors, and dashboard-style geometry."
    ].join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: svgPrompt,
      config: {
        temperature: 0.4
      }
    });

    const text = extractText(response);
    const svg = extractSvg(text);
    if (svg) {
      return { svg, mimeType: "image/svg+xml" };
    }
  } catch (error) {
    lastError = error;
  }

  return {
    svg: buildLocalSvg(prompt, slug),
    mimeType: "image/svg+xml",
    source: "local-fallback",
    error: lastError?.message || null
  };
}

function updateInsightFeaturedImage(slug, imagePath, title) {
  const filePath = path.join(insightsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return false;

  const insight = JSON.parse(fs.readFileSync(filePath, "utf8"));
  insight.featuredImage = {
    src: imagePath,
    alt: `Featured illustration for ${title}`,
    caption: "Featured visual generated for this insight"
  };

  fs.writeFileSync(filePath, JSON.stringify(insight, null, 2));
  return true;
}

async function run() {
  loadEnv(envPath);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in .env.local");
  }

  if (!fs.existsSync(batchPath)) {
    throw new Error(`Batch file not found: ${batchPath}`);
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
  const items = Array.isArray(batch.items) ? batch.items : [];
  if (!items.length) {
    throw new Error("No batch items found");
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });
  const results = [];

  for (const item of items) {
    const slug = item.suggestedSlug;
    const prompt = buildPrompt(item);

    try {
      const image = await generateWithFallback(ai, prompt, slug);
      const extension = image.mimeType.includes("svg") ? "svg" : image.mimeType.includes("jpeg") ? "jpg" : "png";
      const outputPath = path.join(outputDir, `${slug}.${extension}`);
      if (image.svg) {
        fs.writeFileSync(outputPath, image.svg);
      } else {
        fs.writeFileSync(outputPath, Buffer.from(image.data, "base64"));
      }

      const relativeImagePath = `/images/insights/featured/${slug}.${extension}`;
      const updated = updateInsightFeaturedImage(slug, relativeImagePath, item.title);

      results.push({
        slug,
        status: "ok",
        image: relativeImagePath,
        insightUpdated: updated,
        source: image.source || "gemini"
      });
      console.log(`Generated image: ${slug}${image.source ? ` (${image.source})` : ""}`);
    } catch (error) {
      results.push({ slug, status: "failed", error: error.message || String(error) });
      console.error(`Failed image: ${slug} -> ${error.message || error}`);
    }
  }

  const reportPath = path.join(root, "content", "editorial-batches", "batch-01-featured-images-report.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
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
