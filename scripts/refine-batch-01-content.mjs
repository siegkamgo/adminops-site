#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const batchFiles = [
  path.join(root, "content", "editorial-batches", "batch-01-20-titles.json"),
  path.join(root, "content", "editorial-batches", "batch-01-20-titles-live.json")
].filter((filePath) => fs.existsSync(filePath));

const insightsDir = path.join(root, "content", "insights");

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
  let batchTouched = 0;
  for (const filePath of batchFiles) {
    batchTouched += refineBatch(filePath);
  }

  const insightFiles = fs
    .readdirSync(insightsDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(insightsDir, name));

  let insightsTouched = 0;
  for (const filePath of insightFiles) {
    const changed = refineInsightFile(filePath);
    if (changed) insightsTouched += 1;
  }

  console.log(`Refinement complete. Batch titles touched: ${batchTouched}. Insight files updated: ${insightsTouched}.`);
}

run();
