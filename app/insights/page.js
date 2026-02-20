import Link from "next/link";
import { listInsights } from "../../lib/insights-store";

export const metadata = {
  title: "Insights",
  description: "Data-backed SEO and operations insights generated from live search data research."
};

export default function InsightsIndexPage() {
  const insights = listInsights();

  return (
    <section className="section">
      <div className="container">
        <h1>Insights</h1>
        <p>Data-backed articles generated from live keyword research to support SEO and AI Overview visibility.</p>

        {insights.length === 0 ? (
          <div className="card">
            <h2>No generated insights yet</h2>
            <p>Run the SEO agent script to generate the first data-backed insight article.</p>
          </div>
        ) : (
          <div className="grid-2" style={{ marginTop: "1rem" }}>
            {insights.map((insight) => (
              <article className="card" key={insight.slug}>
                <h2>{insight.title}</h2>
                <p>{insight.metaDescription}</p>
                <p><strong>Target keyword:</strong> {insight.targetKeyword}</p>
                <p><strong>Published:</strong> {insight.publishDate}</p>
                <Link className="btn btn-secondary" href={`/insights/${insight.slug}`}>
                  Read insight
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
