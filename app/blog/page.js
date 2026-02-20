import Link from "next/link";

const posts = [
  {
    slug: "property-management-admin-automation",
    title: "Property Management Admin Automation: How AI Agents Cut Reconciliation Time by 70%",
    description:
      "How property managers in the UK and US use AI agents to reduce reconciliation cycles, improve reporting, and keep approval control."
  },
  {
    slug: "property-management-computer-use-agents",
    title: "Property Management Automation with Computer‑Use AI Agents",
    description:
      "A GEO-focused overview of computer-use agents automating property admin workflows without replacing core systems."
  },
  {
    slug: "rent-reconciliation-automation",
    title: "Rent Reconciliation Automation for Property Managers",
    description:
      "A practical guide to automating rent reconciliation with AI agents in the US + UK."
  },
  {
    slug: "property-management-accounting-automation",
    title: "Property Management Accounting Automation (US + UK)",
    description:
      "How property teams automate accounting workflows with computer-use AI agents and approval checkpoints."
  }
];

export const metadata = {
  title: "AdminOps Blog",
  description: "AdminOps insights on AI automation for admin-heavy teams."
};

export default function BlogIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>AdminOps Blog</h1>
        <p>Insights on automating admin workflows for property managers, clinics, and restaurants.</p>
        <div className="grid-2" style={{ marginTop: "1.5rem" }}>
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
