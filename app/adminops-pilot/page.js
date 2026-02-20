export const metadata = {
  title: "AdminOps Pilot",
  description: "Launch a 30-day AdminOps pilot to automate one high-friction workflow and prove measurable ROI."
};

export default function PilotPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>AdminOps 30-Day Pilot</h1>
        <p>
          The pilot is designed to prove value quickly: one high-friction workflow, one month, one clear ROI scorecard.
          You keep final approval at every critical step.
        </p>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h2>What You Get</h2>
            <ul>
              <li>Workflow audit and automation blueprint</li>
              <li>Custom AI agent configuration for one priority process</li>
              <li>Human-in-the-loop approval controls and escalation rules</li>
              <li>Dashboard with throughput, cycle time, and error metrics</li>
              <li>Final handover pack and scale recommendation</li>
            </ul>
          </article>

          <article className="card">
            <h2>Pilot Deliverables</h2>
            <ul>
              <li>Week 1: Process mapping and baseline KPI capture</li>
              <li>Week 2: Agent setup and integration with your existing tools</li>
              <li>Week 3: Live workflow run with monitored quality checks</li>
              <li>Week 4: Optimization sprint and ROI review</li>
            </ul>
          </article>
        </div>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h2>Pricing</h2>
            <p><strong>Placeholder:</strong> Starting at $2,500 to $6,500 depending on workflow complexity and systems involved.</p>
            <p>Exact quote is provided after the strategy call and process audit.</p>
          </article>

          <article className="card">
            <h2>Guarantees</h2>
            <ul>
              <li>Defined success metrics before launch</li>
              <li>Weekly transparency on performance and issues</li>
              <li>If no measurable operational gain, receive a documented remediation plan at no extra cost</li>
            </ul>
          </article>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Ready to Validate Admin Automation?</h2>
          <p>
            Book a call to identify the fastest workflow to automate and the KPI targets that matter for your team.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">Book a free strategy call</a>
            <a className="btn btn-secondary" href="mailto:info@adminops.cloud">info@adminops.cloud</a>
          </div>
        </div>
      </div>
    </section>
  );
}
