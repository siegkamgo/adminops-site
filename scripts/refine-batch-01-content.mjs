#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const insightsDir = path.join(root, "content", "insights");

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

const phraseReplacements = [
  ["software accounting restaurant", "restaurant accounting software"],
  ["software medical billing", "medical billing software"],
  ["inventory management software for restaurant", "restaurant inventory management software"],
  ["automation accounts payable", "accounts payable automation"],
  ["software for medical billing and coding", "medical billing and coding software"]
];

const titleOverrides = {
  "property-managers-best-software-for-property-management": "Best Software for Property Management: SMB Buyer Guide (2026)",
  "property-managers-property-management-software-buildium": "Buildium Property Management Software: Buyer Guide for Operations Teams (2026)",
  "clinics-software-for-medical-billing": "Software for Medical Billing: Buyer Guide for Clinic Operations Teams (2026)",
  "clinics-software-for-medical-billing-and-coding": "Best Medical Billing and Coding Software for Clinic Operations Teams (2026)",
  "clinics-software-medical-billing": "Best Medical Billing Software for Clinic Operations Teams (2026)",
  "restaurants-software-accounting-restaurant": "Best Restaurant Accounting Software for Restaurant Operations Teams (2026)",
  "restaurants-inventory-management-software-for-restaurant": "Best Restaurant Inventory Management Software for Restaurant Operations Teams (2026)",
  "property-managers-automation-accounts-payable": "Accounts Payable Automation: 30-Day Implementation Playbook for Property Management Teams"
};

function replaceCaseInsensitive(text, from, to) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(text || "").replace(new RegExp(escaped, "gi"), (match) => {
    if (match === match.toUpperCase()) return to.toUpperCase();
    if (match[0] === match[0].toUpperCase()) return to.charAt(0).toUpperCase() + to.slice(1);
    return to;
  });
}

function normalizeText(value) {
  let output = String(value || "");
  for (const [from, to] of phraseReplacements) {
    output = replaceCaseInsensitive(output, from, to);
  }
  output = output.replace(/\bBest\s+Best\b/gi, "Best");
  return output;
}

function buildMetaDescription(title, segment, keyword) {
  const text = `${title} Learn how ${segment.toLowerCase()} can implement ${keyword} with human approval controls, KPI tracking, and a practical 30-day rollout.`;
  return text.length <= 160 ? text : `${text.slice(0, 157)}...`;
}

function refineBatch(filePath) {
  const batch = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let touched = 0;

  batch.items = (batch.items || []).map((item) => {
    const next = { ...item };
    next.title = titleOverrides[item.suggestedSlug] || normalizeText(item.title);
    touched += next.title !== item.title ? 1 : 0;
    return next;
  });

  fs.writeFileSync(filePath, JSON.stringify(batch, null, 2));
  return touched;
}

function refineInsightFile(filePath) {
  const insight = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const original = JSON.stringify(insight);

  if (titleOverrides[insight.slug]) {
    insight.title = titleOverrides[insight.slug];
  } else {
    insight.title = normalizeText(insight.title);
  }

  insight.metaDescription = buildMetaDescription(
    insight.title,
    insight.segment || "operations teams",
    normalizeText(insight.targetKeyword || "workflow automation")
  );

  insight.sections = (insight.sections || []).map((section) => ({
    ...section,
    title: normalizeText(section.title),
    paragraphs: (section.paragraphs || []).map((text) => normalizeText(text)),
    list: (section.list || []).map((text) => normalizeText(text))
  }));

  const changed = JSON.stringify(insight) !== original;
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(insight, null, 2));
  }
  return changed;
}

function run() {
  const batchNumber = getBatchNumber();
  const batchFiles = [
    path.join(root, "content", "editorial-batches", batchFileName(batchNumber, "20-titles.json")),
    path.join(root, "content", "editorial-batches", batchFileName(batchNumber, "20-titles-live.json"))
  ].filter((filePath) => fs.existsSync(filePath));

  if (!batchFiles.length) {
    throw new Error(`No batch files found for batch ${batchNumber}`);
  }

  const targetSlugs = new Set();
  let batchTouched = 0;
  for (const filePath of batchFiles) {
    const batch = JSON.parse(fs.readFileSync(filePath, "utf8"));
    for (const item of batch.items || []) {
      if (item?.suggestedSlug) targetSlugs.add(item.suggestedSlug);
    }
    batchTouched += refineBatch(filePath);
  }

  const insightFiles = Array.from(targetSlugs)
    .map((slug) => path.join(insightsDir, `${slug}.json`))
    .filter((filePath) => fs.existsSync(filePath));

  let insightsTouched = 0;
  for (const filePath of insightFiles) {
    const changed = refineInsightFile(filePath);
    if (changed) insightsTouched += 1;
  }

  console.log(`Refinement complete for batch ${batchNumber}. Batch titles touched: ${batchTouched}. Insight files updated: ${insightsTouched}.`);
}

run();
