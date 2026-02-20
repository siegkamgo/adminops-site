export const metadata = {
  title: "Property Management AI Agents",
  description: "Reduce reconciliation and admin workload across leasing, maintenance, and rent operations with AdminOps AI agents."
};

export default function PropertyManagementPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>AI Agents for Property Management Operations</h1>
        <p>
          Property managers lose hours each week to reconciliations, tenant follow-ups, maintenance coordination, and report assembly.
          AdminOps automates these repetitive workflows while keeping managers in control of final approvals.
        </p>

        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Common Pain Points</h3>
            <ul>
              <li>Delayed monthly close due to manual reconciliation</li>
              <li>Missed maintenance updates and tenant complaint loops</li>
              <li>Inconsistent arrears tracking across properties</li>
              <li>Fragmented data across PMS, accounting, and spreadsheets</li>
            </ul>
          </article>

          <article className="card">
            <h3>Workflows Automated</h3>
            <ul>
              <li>Rent and invoice reconciliation with exception flags</li>
              <li>Maintenance ticket triage and vendor follow-up summaries</li>
              <li>Arrears reminders with escalation logic</li>
              <li>Owner and portfolio reporting packets</li>
            </ul>
          </article>

          <article className="card">
            <h3>Typical ROI Outcomes</h3>
            <ul>
              <li>60–80% reduction in repetitive admin effort</li>
              <li>Up to 70% faster reconciliation cycle times</li>
              <li>Fewer missed tasks and fewer avoidable disputes</li>
              <li>Cleaner reporting for owners and asset managers</li>
            </ul>
          </article>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Move from Firefighting to Controlled Operations</h2>
          <p>
            Start with one high-friction workflow in our 30-day pilot and expand once the numbers are proven.
          </p>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
