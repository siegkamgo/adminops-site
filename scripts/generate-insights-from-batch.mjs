#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const batchPath = path.join(root, "content", "editorial-batches", "batch-01-20-titles.json");
const insightsDir = path.join(root, "content", "insights");

const cta = {
  label: "Book a free strategy call",
  href: "https://www.cal.eu/sieg-kamgo/30min"
};

const visuals = {
  workflow: {
    src: "/images/insights/workflow-map.svg",
    alt: "Workflow map from intake to reporting",
    caption: "Workflow map: intake → validation → routing → approval → reporting"
  },
  exceptions: {
    src: "/images/insights/exception-routing.svg",
    alt: "Exception routing model by severity",
    caption: "Exception routing with SLA-based escalation"
  },
  approvals: {
    src: "/images/insights/approval-matrix.svg",
    alt: "Approval policy matrix with thresholds and owners",
    caption: "Approval matrix for human-in-the-loop controls"
  },
  kpi: {
    src: "/images/insights/kpi-dashboard.svg",
    alt: "KPI dashboard showing cycle time and exception rate",
    caption: "Weekly KPI dashboard for operations review"
  },
  timeline: {
    src: "/images/insights/implementation-timeline.svg",
    alt: "30-day implementation timeline",
    caption: "30-day implementation timeline"
  },
  manualVsAuto: {
    src: "/images/insights/manual-vs-automated.svg",
    alt: "Manual versus automated process outcomes",
    caption: "Manual vs automated process outcomes"
  }
};

function segmentKey(segment) {
  const value = String(segment || "").toLowerCase();
  if (value.includes("clinic")) return "clinic";
  if (value.includes("restaurant")) return "restaurant";
  return "property";
}

function segmentLabel(segment) {
  const key = segmentKey(segment);
  if (key === "clinic") return "clinic operations teams";
  if (key === "restaurant") return "restaurant operations teams";
  return "property management operations teams";
}

function internalLinks(key) {
  if (key === "clinic") {
    return [
      "Pilot offer: /adminops-pilot",
      "Clinic operations service page: /clinic-ops-ai-agents",
      "Clinic automation guide: /guides/clinic-automation-guide",
      "Comparison page: /comparisons/adminops-vs-hiring-admin-staff",
      "Insights index: /insights"
    ];
  }

  if (key === "restaurant") {
    return [
      "Pilot offer: /adminops-pilot",
      "Restaurant operations service page: /restaurant-ops-ai-agents",
      "Restaurant automation guide: /guides/restaurant-automation-guide",
      "Comparison page: /comparisons/adminops-vs-rpa-tools",
      "Insights index: /insights"
    ];
  }

  return [
    "Pilot offer: /adminops-pilot",
    "Property operations service page: /property-management-ai-agents",
    "Property automation guide: /guides/property-management-automation-guide",
    "Comparison page: /comparisons/adminops-vs-hiring-admin-staff",
    "Insights index: /insights"
  ];
}

function section(title, paragraphs, list = [], images = []) {
  return { title, paragraphs, list, images };
}

function trimDescription(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 157)}...`;
}

function buildSections(item) {
  const team = segmentLabel(item.segment);
  const keyword = item.primaryKeyword;

  return [
    section(
      "Quick answer",
      [
        `${keyword} can reduce repetitive admin load when implemented as a controlled workflow with clear approvals and exception ownership.`,
        `For ${team}, the fastest path is to automate repetitive checks first, route edge cases to the right owner, and keep final decisions with humans.`
      ],
      [
        `Intent: ${item.intent}`,
        `SERP angle: ${item.serpAngle}`,
        "Goal: improve throughput, reduce errors, and speed up reporting"
      ],
      [visuals.manualVsAuto]
    ),
    section(
      `Why ${keyword} matters now`,
      [
        `Search demand for \"${keyword}\" indicates active buyer and implementation interest, especially among teams looking for operational leverage without increasing headcount.`,
        "Most organizations already have the tools; the real gap is execution consistency across intake, validation, routing, and approvals."
      ],
      [
        "Pain pattern: manual handoffs and exception backlog",
        "Business risk: delayed close cycles and avoidable rework",
        "Opportunity: policy-driven automation with visible controls"
      ],
      [visuals.workflow]
    ),
    section(
      "What to evaluate before rollout",
      [
        "Define the workflow boundary first: where requests enter, where exceptions go, and who approves final outcomes.",
        "Strong implementations prioritize measurable outcomes over tool complexity in the first 30 days."
      ],
      [
        "Workflow volume and repeatability",
        "Exception categories and escalation owners",
        "Approval thresholds and segregation of duties",
        "KPI baseline: cycle time, touchless rate, exception rate"
      ],
      [visuals.approvals]
    ),
    section(
      `How to implement ${keyword} in 30 days`,
      [
        "Start with one high-friction process and run supervised automation in short weekly loops.",
        "Expand scope only after exception rates stabilize and the team trusts control policies."
      ],
      [
        "Step 1: map current-state workflow and owners",
        "Step 2: define required fields and validation checks",
        "Step 3: classify exceptions by severity and assign SLAs",
        "Step 4: launch policy-based routing with human approvals",
        "Step 5: review KPI trends weekly and tune rules"
      ],
      [visuals.timeline]
    ),
    section(
      "Common mistakes to avoid",
      [
        "The biggest failure mode is automating unstable processes before ownership and SOPs are clear.",
        "A close second is over-automating exception decisions that still require human context."
      ],
      [
        "Skipping baseline KPI measurement",
        "No clear owner for exception queues",
        "Approval policies that are vague or inconsistent",
        "Too many workflows launched at once"
      ],
      [visuals.exceptions]
    ),
    section(
      "KPI scorecard for leadership",
      [
        "Use a small KPI set and review weekly to maintain execution focus.",
        "If these metrics improve consistently, scale the pattern to adjacent workflows."
      ],
      [
        "Cycle time (request to completion)",
        "Touchless rate (% processed without manual edits)",
        "Exception rate and exception aging",
        "Rework rate after approval",
        "On-time reporting delivery"
      ],
      [visuals.kpi]
    ),
    section(
      "Internal links to continue your research",
      [
        "Use these pages to compare delivery models, evaluate rollout scope, and book a pilot.",
        "This cluster linking supports both human navigation and stronger topical authority."
      ],
      internalLinks(segmentKey(item.segment)),
      [visuals.workflow]
    ),
    section(
      "FAQ",
      [
        `What is ${keyword}? ${keyword} is a practical operations workflow where automation handles repeatable steps and humans retain approval over high-risk decisions.`,
        "How quickly can we see results? Most teams see measurable movement in 2–4 weeks when scope is narrow and KPIs are reviewed weekly.",
        "Does this replace managers? No. It removes repetitive manual work and keeps manager approvals in policy-defined checkpoints.",
        "What should we automate first? Start with high-volume, rules-based tasks that currently create queue delays and rework."
      ]
    ),
    section(
      "CTA",
      [
        "Want a tailored rollout map for this workflow?",
        "Book a strategy call and get a 30-day pilot plan with KPI targets and control policies."
      ],
      [
        "Top CTA: Book a free strategy call",
        "Mid CTA: Request a workflow blueprint",
        "End CTA: Launch a 30-day pilot"
      ],
      [visuals.kpi]
    )
  ];
}

function buildMetaDescription(item) {
  return trimDescription(
    `${item.title} Learn how ${item.segment.toLowerCase()} can apply ${item.primaryKeyword} with human-in-the-loop controls, KPI tracking, and a practical 30-day rollout.`
  );
}

function toKeywordRows(item) {
  return [
    {
      keyword: item.primaryKeyword,
      searchVolume: item.searchVolume ?? null,
      cpc: item.cpc ?? null,
      competition: null,
      competitionLevel: item.competitionLevel ?? null,
      keywordDifficulty: null
    }
  ];
}

function buildInsight(item) {
  return {
    slug: item.suggestedSlug,
    title: item.title,
    metaDescription: buildMetaDescription(item),
    targetKeyword: item.primaryKeyword,
    segment: item.segment,
    seedKeyword: item.seed,
    locationCode: 2840,
    languageCode: "en",
    publishDate: item.publishDate,
    keywordRows: toKeywordRows(item),
    sections: buildSections(item),
    cta
  };
}

function run() {
  if (!fs.existsSync(batchPath)) {
    throw new Error(`Batch file not found: ${batchPath}`);
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
  const items = Array.isArray(batch.items) ? batch.items : [];

  if (!items.length) {
    throw new Error("No items found in batch file.");
  }

  fs.mkdirSync(insightsDir, { recursive: true });

  let created = 0;
  let updated = 0;

  for (const item of items) {
    const insight = buildInsight(item);
    const filePath = path.join(insightsDir, `${insight.slug}.json`);
    if (fs.existsSync(filePath)) {
      updated += 1;
    } else {
      created += 1;
    }

    fs.writeFileSync(filePath, JSON.stringify(insight, null, 2));
  }

  const report = {
    generatedAt: new Date().toISOString(),
    sourceBatch: path.relative(root, batchPath).replace(/\\/g, "/"),
    total: items.length,
    created,
    updated,
    slugs: items.map((item) => item.suggestedSlug)
  };

  fs.writeFileSync(
    path.join(root, "content", "editorial-batches", "batch-01-20-generation-report.json"),
    JSON.stringify(report, null, 2)
  );

  console.log(`Generated ${items.length} insights (created: ${created}, updated: ${updated}).`);
}

run();
