import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="badge">AdminOps · AI + Human Approval</span>
          <h1>Automate 60–80% of routine admin work in 30 days.</h1>
          <p>
            AdminOps builds AI agents that handle repetitive admin workflows end-to-end while your team keeps final approval.
            You get cleaner operations, fewer errors, and faster reporting without adding headcount.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">
              Book a free strategy call
            </a>
            <Link className="btn btn-secondary" href="/adminops-pilot">
              Explore the 30-day pilot
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container grid-3">
          <article className="card">
            <h3>Ideal Client Avatar</h3>
            <p><strong>Role:</strong> Owner, COO, Operations Manager</p>
            <p><strong>Company size:</strong> 5–50 staff · <strong>Revenue:</strong> $1M–$10M</p>
            <p><strong>Industries:</strong> Property managers, clinics, restaurants, and other admin-heavy SMBs.</p>
          </article>
          <article className="card">
            <h3>Core Pain</h3>
            <p>Drowning in repetitive admin, error-prone workflows, and reporting that arrives too late to act on.</p>
          </article>
          <article className="card">
            <h3>Desired Outcome</h3>
            <p>Fewer admin hours, clean reporting, and no extra hires, without losing control or compromising security.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>The Problem</h2>
          <div className="grid-3">
            <div className="card"><h3>Manual overload</h3><p>Teams spend hours on data entry, reconciliations, chasing documents, and status updates.</p></div>
            <div className="card"><h3>Errors and rework</h3><p>Human fatigue leads to duplicated records, missed deadlines, and inconsistent reporting.</p></div>
            <div className="card"><h3>Growth bottlenecks</h3><p>Operations become fragile as volume grows, forcing expensive hiring before revenue catches up.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>The Solution: AdminOps Agent Stack</h2>
          <div className="grid-2">
            <div className="card">
              <h3>Capture Agent</h3>
              <p>Collects data from forms, inboxes, spreadsheets, and portals into a single structured queue.</p>
            </div>
            <div className="card">
              <h3>Process Agent</h3>
              <p>Classifies requests, validates data, applies business rules, and routes tasks by priority.</p>
            </div>
            <div className="card">
              <h3>Reconciliation Agent</h3>
              <p>Matches records across systems, flags exceptions, and prepares approval-ready summaries.</p>
            </div>
            <div className="card">
              <h3>Reporting Agent</h3>
              <p>Builds weekly and monthly ops reports with KPI trends and actionable exception logs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What Agents Do in Practice</h2>
          <div className="grid-2">
            <ul className="card">
              <li>Inbox triage and request categorization</li>
              <li>Invoice and payment reconciliation</li>
              <li>Vendor follow-ups and deadline reminders</li>
              <li>Data cleanup and CRM/ERP updates</li>
              <li>Approval-ready summaries for managers</li>
            </ul>
            <ul className="card">
              <li>Compliance checklist verification</li>
              <li>Recurring report generation</li>
              <li>Exception detection and escalation</li>
              <li>Audit trails for every workflow action</li>
              <li>Secure handoff to a human final approver</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Segments Served</h2>
          <div className="grid-3">
            <article className="card">
              <h3>Property Management</h3>
              <p>Tenant comms, maintenance requests, arrears tracking, and monthly reconciliations.</p>
              <Link className="btn btn-secondary" href="/property-management-ai-agents">View Property solution</Link>
            </article>
            <article className="card">
              <h3>Clinics</h3>
              <p>Patient admin, referral handling, billing checks, and compliance-ready reporting workflows.</p>
              <Link className="btn btn-secondary" href="/clinic-ops-ai-agents">View Clinic solution</Link>
            </article>
            <article className="card">
              <h3>Restaurants</h3>
              <p>Supplier invoices, rota admin, inventory updates, and daily/weekly performance summaries.</p>
              <Link className="btn btn-secondary" href="/restaurant-ops-ai-agents">View Restaurant solution</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Packages</h2>
          <div className="grid-3">
            <article className="card">
              <h3>Pilot</h3>
              <p>30 days to automate one high-friction workflow, prove ROI, and deliver measurable time savings.</p>
              <p><strong>Best for:</strong> Teams validating AI operations fit.</p>
            </article>
            <article className="card">
              <h3>Growth</h3>
              <p>Automate 3–5 workflows with deeper integrations, reporting dashboards, and team enablement.</p>
              <p><strong>Best for:</strong> SMBs scaling without adding admin headcount.</p>
            </article>
            <article className="card">
              <h3>Enterprise</h3>
              <p>Multi-location governance, custom controls, and advanced security/compliance requirements.</p>
              <p><strong>Best for:</strong> Complex operations with strict oversight.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>How It Works</h2>
          <div className="grid-3">
            <div className="card"><h3>1. Audit</h3><p>We map your current process, bottlenecks, and risk controls in week one.</p></div>
            <div className="card"><h3>2. Build</h3><p>We deploy your AI agents with human approval gates and clear escalation rules.</p></div>
            <div className="card"><h3>3. Optimize</h3><p>We measure throughput, error rate, and admin hours saved, then iterate fast.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>Start with a Free Strategy Call</h2>
          <p>
            Tell us your most repetitive admin workflow. We will show you where automation can deliver visible gains in 30 days.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">Book a free strategy call</a>
            <a className="btn btn-secondary" href="mailto:info@adminops.cloud">info@adminops.cloud</a>
          </div>
        </div>
      </section>
    </>
  );
}
