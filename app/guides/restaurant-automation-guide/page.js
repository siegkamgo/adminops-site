import Link from "next/link";

export const metadata = {
  title: "Restaurant Operations Automation Guide",
  description: "Guide for restaurant operators to automate repetitive back-office workflows and improve multi-site reporting quality."
};

export default function RestaurantGuidePage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>Restaurant Operations Automation Guide</h1>
        <p>
          This guide outlines how restaurant operators reduce back-office friction by automating recurring admin tasks and keeping final
          approvals with managers.
        </p>
        <h2>Best first workflows</h2>
        <ul>
          <li>Supplier invoice capture and exception matching</li>
          <li>Shift admin summaries and reminder sequences</li>
          <li>Inventory/wastage data normalization</li>
          <li>Daily and weekly operations reporting</li>
        </ul>
        <h2>Success metrics to track</h2>
        <ul>
          <li>Back-office admin hours per site</li>
          <li>Reporting consistency across locations</li>
          <li>Invoice exception resolution speed</li>
          <li>Manager decision-cycle time</li>
        </ul>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/restaurant-ops-ai-agents">See Restaurant solution page</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer" data-track="book-call" data-cta-location="guide-restaurant">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
