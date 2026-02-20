import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const insightsDir = path.join(root, "content", "insights");
const calendarPath = path.join(root, "content", "editorial-calendar-two-weeks.json");

const coreLinks = {
  property: [
    "Pilot offer: /adminops-pilot",
    "Property ops service page: /property-management-ai-agents",
    "Property automation guide: /guides/property-management-automation-guide"
  ],
  clinic: [
    "Pilot offer: /adminops-pilot",
    "Clinic operations service page: /clinic-ops-ai-agents",
    "Clinic automation guide: /guides/clinic-automation-guide"
  ],
  restaurant: [
    "Pilot offer: /adminops-pilot",
    "Restaurant operations service page: /restaurant-ops-ai-agents",
    "Restaurant automation guide: /guides/restaurant-automation-guide"
  ]
};

const visuals = {
  workflow: {
    src: "/images/insights/workflow-map.svg",
    alt: "Workflow map from input to reporting for AdminOps agent operations",
    caption: "Workflow map: input -> validation -> routing -> approval -> posting -> reporting"
  },
  exceptions: {
    src: "/images/insights/exception-routing.svg",
    alt: "Exception routing decision tree showing low, medium, and high-risk handling",
    caption: "Exception routing model with SLA-based escalation"
  },
  approvals: {
    src: "/images/insights/approval-matrix.svg",
    alt: "Approval policy matrix with thresholds, owners, and controls",
    caption: "Approval matrix for policy-driven human oversight"
  },
  kpi: {
    src: "/images/insights/kpi-dashboard.svg",
    alt: "KPI dashboard mockup with cycle time, touchless rate, and exception rate",
    caption: "KPI dashboard outline for weekly operations review"
  },
  manualVsAuto: {
    src: "/images/insights/manual-vs-automated.svg",
    alt: "Comparison of manual process bottlenecks versus automated workflow outcomes",
    caption: "Manual vs automated workflow outcomes"
  },
  timeline: {
    src: "/images/insights/implementation-timeline.svg",
    alt: "Thirty-day implementation timeline showing audit, build, run, and optimization phases",
    caption: "30-day rollout timeline for controlled automation"
  }
};

const briefBySlug = {
  "property-managers-computer-use-agent-invoice-reconciliation": {
    title: "How can property managers automate invoice reconciliation with a computer use agent?",
    type: "Guide",
    segment: "property",
    quickAnswer:
      "Property managers can automate invoice reconciliation by using a Capture Agent for intake, a Reconciliation Agent for matching and exception flags, and a manager approval step for high-risk items.",
    problem:
      "Manual reconciliation slows month-end close, hides exceptions, and creates avoidable rework across AP and operations teams.",
    solution:
      "Build a workflow that captures invoices, validates fields, routes mismatches, and only escalates exceptions that need judgment.",
    steps: [
      "Map invoice sources and required fields",
      "Define matching logic and tolerance thresholds",
      "Create exception categories and ownership",
      "Add approval gates for high-value or high-risk records",
      "Track cycle time, touchless rate, and exception aging weekly"
    ]
  },
  "property-managers-accounts-payable-automation-computer-use-agents": {
    title: "What does accounts payable automation look like with computer use agents?",
    type: "Tutorial",
    segment: "property",
    quickAnswer:
      "AP automation with computer use agents means invoices are captured, validated, coded, and routed automatically, while finance leads approve policy exceptions.",
    problem:
      "AP queues grow when teams process invoices manually and approvals are delayed or inconsistent.",
    solution:
      "Use rule-based routing, escalation logic, and daily exception review to reduce manual effort and improve payment reliability.",
    steps: [
      "Standardize invoice intake channels",
      "Apply coding and duplicate checks",
      "Route by amount and policy risk",
      "Escalate exceptions with SLA timers",
      "Publish weekly AP performance dashboard"
    ]
  },
  "property-managers-computer-use-agents-workflow-automation": {
    title: "How do computer use AI agents improve property management workflow automation?",
    type: "Use Case",
    segment: "property",
    quickAnswer:
      "Computer use AI agents improve property workflows by executing repetitive handoffs across inboxes, PMS exports, and accounting updates with fewer manual touches.",
    problem:
      "Property teams lose productivity when requests move through inconsistent channels and ad-hoc spreadsheets.",
    solution:
      "Create one structured flow for intake, validation, routing, approval, posting, and reporting across recurring operational tasks.",
    steps: [
      "Pick one repeatable workflow with visible backlog",
      "Define policy checks and priority rules",
      "Route tasks to role-specific queues",
      "Keep manager approval for exceptions",
      "Review throughput and recurrence weekly"
    ]
  },
  "property-managers-browser-automation-ai-agent-rent-reconciliation": {
    title: "Can a browser automation AI agent speed up rent reconciliation?",
    type: "Comparison",
    segment: "property",
    quickAnswer:
      "Yes. Browser automation AI agents can reduce reconciliation drag by collecting data faster, flagging mismatches earlier, and routing exceptions to the right owner.",
    problem:
      "Rent reconciliation often depends on repetitive portal checks and manual comparison work.",
    solution:
      "Use browser-based collection plus exception-first review to shorten close cycles without removing human control.",
    steps: [
      "Automate portal data capture",
      "Normalize records into one schema",
      "Run mismatch and duplicate checks",
      "Escalate aged exceptions by severity",
      "Track completion rate and exception recurrence"
    ]
  },
  "clinics-clinic-workflow-automation-ai-agents-playbook": {
    title: "How can clinics automate admin workflows with AI agents while keeping control?",
    type: "Guide",
    segment: "clinic",
    quickAnswer:
      "Clinics can automate referral intake, claims pre-checks, and recurring reporting with AI agents while preserving approvals, audit trails, and escalation rules.",
    problem:
      "Clinic teams face recurring admin bottlenecks that delay throughput and create inconsistent handoffs.",
    solution:
      "Start with one high-volume workflow, define queue ownership, and use human-in-the-loop approvals for non-standard cases.",
    steps: [
      "Choose a workflow with measurable queue pressure",
      "Define required data fields and validation checks",
      "Route tasks by urgency and risk",
      "Approve only flagged exceptions",
      "Monitor backlog aging and error rate weekly"
    ]
  },
  "clinics-claims-processing-ai-agent-medical-billing-automation": {
    title: "What is the best way to use a claims processing AI agent for medical billing automation?",
    type: "Review",
    segment: "clinic",
    quickAnswer:
      "The best model uses AI agents for pre-submission validation and routing, with supervisors approving high-risk or unclear claims before final submission.",
    problem:
      "Claims rework increases when completeness checks and payer-rule validation are handled manually.",
    solution:
      "Automate first-pass checks, route exceptions with reason codes, and enforce weekly denial root-cause reviews.",
    steps: [
      "Build claim intake checklist",
      "Validate required fields against policy",
      "Separate clean claims from exception claims",
      "Require approval on high-risk submissions",
      "Track first-pass acceptance and rework hours"
    ]
  },
  "restaurants-back-office-ai-agents-inventory-reporting": {
    title: "How can restaurant teams use back-office AI agents to automate inventory and reporting?",
    type: "Use Case",
    segment: "restaurant",
    quickAnswer:
      "Restaurant teams can automate inventory and reporting by standardizing data capture across sites, routing anomalies, and using manager approvals for critical adjustments.",
    problem:
      "Multi-site reporting breaks when each location follows a different admin routine.",
    solution:
      "Deploy a shared workflow model with variance thresholds, queue ownership, and weekly cross-site KPI review.",
    steps: [
      "Normalize stock and invoice data",
      "Apply variance checks by category",
      "Route anomalies to site owners",
      "Approve critical adjustments",
      "Compare site KPIs weekly"
    ]
  },
  "property-managers-data-entry-email-triage-ai-agents": {
    title: "How do data entry and email triage AI agents reduce admin overload for ops teams?",
    type: "FAQ",
    segment: "property",
    quickAnswer:
      "Data entry and email triage AI agents reduce admin overload by classifying requests, extracting key fields, and routing work to the right queue automatically.",
    problem:
      "Ops teams spend large parts of the day moving information between inboxes, sheets, and systems.",
    solution:
      "Use intent tagging, required-field validation, and SLA-based routing so teams focus on decisions rather than manual transfer work.",
    steps: [
      "Define inbox categories and routing rules",
      "Extract required fields into a standard schema",
      "Assign queue ownership and response SLAs",
      "Escalate overdue or ambiguous requests",
      "Track queue time and correction rate"
    ]
  }
};

function section(title, paragraphs, list = [], images = []) {
  return { title, paragraphs, list, images };
}

function buildSections({ type, targetKeyword, quickAnswer, problem, solution, steps, links }) {
  return [
    section(
      "Quick answer",
      [
        `${targetKeyword} can be implemented with an answer-first workflow design: define the problem, automate repeatable steps, and keep high-risk approvals human.`,
        quickAnswer
      ],
      [
        `Content type: ${type}`,
        "Format: answer first, then implementation depth",
        "Goal: reduce admin load, errors, and cycle time"
      ],
      [visuals.manualVsAuto]
    ),
    section(
      `What problem does ${targetKeyword} solve?`,
      [
        `${targetKeyword} solves recurring operational friction where teams repeat the same checks, copy data between systems, and lose time to exception chasing.`,
        problem
      ]
    ),
    section(
      "What is the solution approach?",
      [
        `${targetKeyword} works best when workflows follow one consistent map: input, validation, routing, approval, posting, and reporting.`,
        solution
      ],
      [
        "Capture Agent: intake and normalization",
        "Process Agent: policy checks and routing",
        "Reconciliation Agent: matching and exception handling",
        "Reporting Agent: KPI and close visibility"
      ],
      [visuals.workflow, visuals.approvals]
    ),
    section(
      `How to implement ${targetKeyword}`,
      [
        `${targetKeyword} implementation should start narrow with one high-volume workflow and weekly KPI reviews.`,
        "Run supervised automation first, then increase automation depth after exception rates stabilize."
      ],
      steps.map((value, index) => `Step ${index + 1}: ${value}`),
      [visuals.timeline]
    ),
    section(
      "Manual vs automated: what changes",
      [
        "Manual workflows depend on memory, ad-hoc tracking, and fragmented ownership.",
        "Automated workflows standardize rule execution, improve queue visibility, and preserve manager control for high-risk decisions."
      ],
      [
        "Manual: slow handoffs and inconsistent prioritization",
        "Automated: SLA-based routing and exception-first triage",
        "Manual: hidden backlog",
        "Automated: measurable queue health and cycle-time trends"
      ],
      [visuals.manualVsAuto, visuals.exceptions]
    ),
    section(
      "Internal links to continue your research",
      [
        "Use these pages next to evaluate delivery model, implementation scope, and workflow fit.",
        "Each article should link to two to three core pages to reinforce topical authority and conversion paths."
      ],
      links,
      [visuals.workflow]
    ),
    section(
      "FAQ",
      [
        `What is ${targetKeyword}? ${targetKeyword} is a structured ops workflow that automates repeatable tasks and routes exceptions for human decisions.`,
        "How fast can teams see impact? Most teams can see measurable progress within 30 days on one focused workflow.",
        "Does automation remove manager control? No. Final approvals stay with human owners by policy.",
        "What metrics should we track first? Start with cycle time, touchless rate, and exception rate.",
        "When should we not automate? Do not automate unstable workflows without clear ownership and baseline SOPs."
      ]
    ),
    section(
      "CTA",
      [
        "Get an AdminOps automation audit for this workflow.",
        "See how an agent stack would handle your current process and exception load."
      ],
      [
        "Top CTA: Get an AdminOps automation audit / 30-day pilot",
        "Mid CTA: See how an agent stack would handle this workflow",
        "End CTA: Book a demo / request a workflow blueprint"
      ],
      [visuals.kpi]
    )
  ];
}

const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));

for (const item of calendar.items || []) {
  const filePath = path.join(insightsDir, `${item.slug}.json`);
  if (!fs.existsSync(filePath)) continue;

  const current = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const brief = briefBySlug[item.slug];
  if (!brief) continue;

  const updated = {
    ...current,
    title: brief.title,
    metaDescription: `${brief.type}: ${brief.quickAnswer.slice(0, 140)}`.slice(0, 160),
    sections: buildSections({
      type: brief.type,
      targetKeyword: current.targetKeyword,
      quickAnswer: brief.quickAnswer,
      problem: brief.problem,
      solution: brief.solution,
      steps: brief.steps,
      links: coreLinks[brief.segment]
    })
  };

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
}

console.log("Restructured scheduled insights with question-title + answer-first format.");
