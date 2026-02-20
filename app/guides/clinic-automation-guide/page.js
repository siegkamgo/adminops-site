import Link from "next/link";

export const metadata = {
  title: "Clinic Operations Automation Guide",
  description: "Implementation guide for clinic admin automation with approval controls and operational KPI tracking."
};

export default function ClinicGuidePage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>Clinic Operations Automation Guide</h1>
        <p>
          Clinics can improve throughput and reduce queue pressure by automating repetitive admin flows while preserving compliance-ready
          visibility and human sign-off.
        </p>
        <h2>Best first workflows</h2>
        <ul>
          <li>Referral intake and classification</li>
          <li>Claims and billing pre-check validation</li>
          <li>Follow-up reminders for missing documentation</li>
          <li>Weekly operational report preparation</li>
        </ul>
        <h2>Success metrics to track</h2>
        <ul>
          <li>Admin queue turnaround time</li>
          <li>Submission-ready accuracy rate</li>
          <li>Staff time spent on repetitive admin</li>
          <li>Ops report completion reliability</li>
        </ul>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/clinic-ops-ai-agents">See Clinic solution page</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer" data-track="book-call" data-cta-location="guide-clinic">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
