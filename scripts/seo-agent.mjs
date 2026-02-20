#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { buildInsightFromSeed } from "../lib/seo-agent.js";
import { saveInsight } from "../lib/insights-store.js";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith("--")) {
      continue;
    }

    const key = part.replace("--", "");
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : true;
    args[key] = value;

    if (value !== true) {
      i += 1;
    }
  }
  return args;
}

async function run() {
  const args = parseArgs(process.argv);
  const seedKeyword = args.seed || "property management admin automation";
  const segment = args.segment || "Property Managers";
  const locationCode = Number(args.location || process.env.SEO_AGENT_LOCATION_CODE || 2840);
  const languageCode = args.language || process.env.SEO_AGENT_LANGUAGE_CODE || "en";
  const dailyMode = String(args.daily || "false").toLowerCase() === "true";

  const insight = await buildInsightFromSeed({
    seedKeyword,
    segment,
    locationCode,
    languageCode,
    dailyMode
  });

  saveInsight(insight);

  const reportDir = path.join(process.cwd(), "content", "insights", "_reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportDir, `${insight.slug}.json`),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        seedKeyword,
        segment,
        locationCode,
        languageCode,
        dailyMode,
        topKeywords: insight.keywordRows.slice(0, 10)
      },
      null,
      2
    )
  );

  console.log(`Generated insight: ${insight.slug}`);
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
