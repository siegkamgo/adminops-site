export const metadata = {
  title: "Restaurant Operations AI Agents",
  description: "Use AdminOps AI agents to automate restaurant back-office admin, reduce errors, and speed up reporting."
};

export default function RestaurantOpsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>AI Agents for Restaurant Operations</h1>
        <p>
          Restaurant teams should focus on service, not repetitive back-office admin.
          AdminOps automates invoice processing, rota admin, and reporting workflows so operators can scale with less friction.
        </p>

        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Segment Pain Points</h3>
            <ul>
              <li>Manual supplier invoice checks and reconciliation delays</li>
              <li>Constant rota and shift-change admin overhead</li>
              <li>Stock and cost reporting inconsistencies</li>
              <li>Fragmented multi-site reporting visibility</li>
            </ul>
          </article>

          <article className="card">
            <h3>Workflows Automated</h3>
            <ul>
              <li>Invoice data capture and exception matching</li>
              <li>Shift admin summaries and reminder workflows</li>
              <li>Inventory and wastage data normalization</li>
              <li>Daily and weekly ops reporting packs</li>
            </ul>
          </article>

          <article className="card">
            <h3>ROI Outcomes</h3>
            <ul>
              <li>Lower admin hours per location</li>
              <li>Faster decision cycles for managers</li>
              <li>Reduced avoidable reporting errors</li>
              <li>Improved consistency across sites</li>
            </ul>
          </article>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Keep Teams Focused on Guest Experience</h2>
          <p>
            Launch a focused pilot and identify the fastest path to measurable operational gains.
          </p>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
