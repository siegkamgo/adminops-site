#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fetchKeywordSuggestions } from "../lib/dataforseo.js";

const root = process.cwd();

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

function toTitleCase(value) {
  return String(value || "")
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function hasRepeatedAdjacentWords(keyword) {
  return /(\b\w+\b)\s+\1\b/i.test(keyword);
}

function canonicalTopic(keyword) {
  const value = String(keyword || "").toLowerCase();
  if (value.includes("property management") && value.includes("software")) return "property-management-software";
  if (value.includes("accounts payable") && value.includes("automation")) return "accounts-payable-automation";
  if (value.includes("invoice") && value.includes("automation")) return "invoice-processing-automation";
  if (value.includes("clinic") && value.includes("management") && value.includes("software")) return "clinic-management-software";
  if (value.includes("medical") && value.includes("billing")) return "medical-billing-automation";
  if (value.includes("restaurant") && value.includes("inventory") && value.includes("software")) return "restaurant-inventory-software";
  if (value.includes("restaurant") && value.includes("back") && value.includes("office")) return "restaurant-back-office";
  return value;
}

function isAllowedKeyword(keyword) {
  const value = String(keyword || "").toLowerCase().trim();
  if (!value || value.split(/\s+/).length < 2) return false;
  if (hasRepeatedAdjacentWords(value)) return false;

  const blockedExact = new Set([
    "software property management",
    "property software management",
    "management property software",
    "property management software software",
    "management software for property"
  ]);

  if (blockedExact.has(value)) return false;

  return /(property|accounts payable|invoice|reconciliation|clinic|medical billing|restaurant|inventory|back office|automation)/.test(value);
}

function inferIntent(keyword) {
  const value = String(keyword).toLowerCase();
  if (/(best|software|tools?|solution|solutions|vs|alternative|platform)/.test(value)) return "BOFU";
  if (/(how|playbook|checklist|workflow|automation|process|implementation)/.test(value)) return "MOFU-BOFU";
  return "MOFU";
}

function inferSerpAngle(keyword, intent) {
  const value = String(keyword).toLowerCase();
  if (/(vs|alternative|alternatives)/.test(value)) return "comparison/alternatives";
  if (/(software|tools?|platform)/.test(value)) return "buyer guide";
  if (/(checklist|playbook|implementation|workflow|process)/.test(value)) return "implementation guide";
  return intent === "BOFU" ? "conversion-focused guide" : "problem-solution guide";
}

function makeTitle(segment, keyword, intent) {
  const segmentLabel = segment === "Property Managers"
    ? "Property Management Teams"
    : segment === "Clinics"
      ? "Clinic Operations Teams"
      : segment === "Restaurants"
        ? "Restaurant Operations Teams"
        : `${segment} Teams`;

  const keywordTitle = toTitleCase(keyword);

  if (intent === "BOFU") {
    const cleaned = keywordTitle.replace(/^Best\s+/i, "");
    if (/software|tool|platform|solution/.test(keyword.toLowerCase())) {
      return `Best ${cleaned} for ${segmentLabel} (2026)`;
    }
    return `${cleaned}: Buyer Guide for ${segmentLabel}`;
  }

  if (/automation|workflow|process|reconciliation/.test(keyword.toLowerCase())) {
    return `${keywordTitle}: 30-Day Implementation Playbook for ${segmentLabel}`;
  }

  return `How ${segmentLabel} Can Use ${keywordTitle} to Reduce Admin Work`;
}

function tokenize(value) {
  return new Set(
    String(value || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2)
  );
}

function similarity(a, b) {
  const aTokens = tokenize(a);
  const bTokens = tokenize(b);
  if (!aTokens.size || !bTokens.size) return 0;
  let overlap = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) overlap += 1;
  }
  return overlap / Math.max(aTokens.size, bTokens.size);
}

function nextDate(startDate, index) {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() + Math.floor(index / 2));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function run() {
  loadEnvFile(path.join(root, ".env.local"));

  const seeds = [
    { seed: "accounts payable automation", segment: "Property Managers" },
    { seed: "property management software", segment: "Property Managers" },
    { seed: "property management accounting software", segment: "Property Managers" },
    { seed: "invoice processing automation", segment: "Property Managers" },
    { seed: "rent reconciliation", segment: "Property Managers" },
    { seed: "clinic management software", segment: "Clinics" },
    { seed: "medical billing automation", segment: "Clinics" },
    { seed: "restaurant inventory management software", segment: "Restaurants" },
    { seed: "restaurant back office automation", segment: "Restaurants" },
    { seed: "restaurant accounting software", segment: "Restaurants" },
    { seed: "medical billing software", segment: "Clinics" },
    { seed: "claims processing automation", segment: "Clinics" }
  ];

  const pulled = [];

  for (const item of seeds) {
    const rows = await fetchKeywordSuggestions({
      seedKeyword: item.seed,
      locationCode: 2840,
      languageCode: "en",
      limit: 35
    });

    for (const row of rows) {
      pulled.push({
        keyword: row.keyword,
        searchVolume: row.searchVolume || 0,
        cpc: row.cpc,
        competitionLevel: row.competitionLevel || null,
        segment: item.segment,
        seed: item.seed
      });
    }
  }

  const byKeyword = new Map();
  for (const row of pulled) {
    const key = row.keyword.toLowerCase().trim();
    if (!key) continue;
    const existing = byKeyword.get(key);
    if (!existing || row.searchVolume > existing.searchVolume) {
      byKeyword.set(key, row);
    }
  }

  const candidates = Array.from(byKeyword.values())
    .filter((row) => row.searchVolume >= 20)
    .filter((row) => isAllowedKeyword(row.keyword))
    .sort((a, b) => b.searchVolume - a.searchVolume);

  const targetBySegment = {
    "Property Managers": 10,
    "Clinics": 6,
    "Restaurants": 4
  };
  const selected = [];
  const usedTopicFamilies = new Set();
  const countBySegment = {
    "Property Managers": 0,
    "Clinics": 0,
    "Restaurants": 0
  };

  for (const candidate of candidates) {
    if (selected.length >= 20) break;
    if ((countBySegment[candidate.segment] || 0) >= (targetBySegment[candidate.segment] || 20)) continue;

    const topicFamily = canonicalTopic(candidate.keyword);
    const tooClose = selected.some((item) => similarity(item.primaryKeyword, candidate.keyword) >= 0.72);
    const sameFamilyAlreadyUsed = usedTopicFamilies.has(topicFamily);
    if (tooClose) continue;
    if (sameFamilyAlreadyUsed && candidate.searchVolume < 500) continue;

    const intent = inferIntent(candidate.keyword);
    const serpAngle = inferSerpAngle(candidate.keyword, intent);
    const title = makeTitle(candidate.segment, candidate.keyword, intent);

    selected.push({
      segment: candidate.segment,
      title,
      primaryKeyword: candidate.keyword,
      searchVolume: candidate.searchVolume,
      intent,
      serpAngle,
      cpc: candidate.cpc,
      competitionLevel: candidate.competitionLevel,
      seed: candidate.seed,
      suggestedSlug: toSlug(`${candidate.segment}-${candidate.keyword}`)
    });

    usedTopicFamilies.add(topicFamily);

    countBySegment[candidate.segment] = (countBySegment[candidate.segment] || 0) + 1;
  }

  if (selected.length < 20) {
    for (const candidate of candidates) {
      if (selected.length >= 20) break;
      const exists = selected.some((item) => item.primaryKeyword.toLowerCase() === candidate.keyword.toLowerCase());
      if (exists) continue;
      const topicFamily = canonicalTopic(candidate.keyword);
      const tooClose = selected.some((item) => similarity(item.primaryKeyword, candidate.keyword) >= 0.8);
      if (tooClose) continue;
      if (usedTopicFamilies.has(topicFamily) && candidate.searchVolume < 300) continue;

      const intent = inferIntent(candidate.keyword);
      const serpAngle = inferSerpAngle(candidate.keyword, intent);
      const title = makeTitle(candidate.segment, candidate.keyword, intent);

      selected.push({
        segment: candidate.segment,
        title,
        primaryKeyword: candidate.keyword,
        searchVolume: candidate.searchVolume,
        intent,
        serpAngle,
        cpc: candidate.cpc,
        competitionLevel: candidate.competitionLevel,
        seed: candidate.seed,
        suggestedSlug: toSlug(`${candidate.segment}-${candidate.keyword}`)
      });

      usedTopicFamilies.add(topicFamily);
    }
  }

  const startDate = new Date("2026-02-27T00:00:00Z");
  const scheduled = selected.slice(0, 20).map((item, index) => ({
    publishDate: nextDate(startDate, index),
    slot: index % 2 === 0 ? "AM" : "PM",
    ...item
  }));

  const output = {
    generatedAt: new Date().toISOString(),
    batch: 1,
    source: "live-dataforseo",
    titleCount: scheduled.length,
    cadence: "2 posts per day",
    dateRange: {
      start: scheduled[0]?.publishDate || null,
      end: scheduled[scheduled.length - 1]?.publishDate || null
    },
    seeds,
    notes: "Fresh live pull from DataForSEO keyword suggestions endpoint with deduplication by semantic overlap.",
    items: scheduled
  };

  const research = {
    generatedAt: output.generatedAt,
    seeds,
    pulledKeywordRows: pulled.length,
    uniqueCandidates: candidates.length,
    topCandidates: candidates.slice(0, 80)
  };

  const outDir = path.join(root, "content", "editorial-batches");
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "batch-01-20-titles-live.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(outDir, "batch-01-live-research.json"), JSON.stringify(research, null, 2));

  console.log(`Generated ${scheduled.length} titles from ${pulled.length} live keyword rows.`);
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
