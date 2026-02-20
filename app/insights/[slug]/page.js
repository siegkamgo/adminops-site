import Link from "next/link";
import { getPublishedInsightBySlug, listPublishedInsights } from "../../../lib/insights-store";

export async function generateStaticParams() {
  const insights = listPublishedInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }) {
  const insight = getPublishedInsightBySlug(params.slug);
  if (!insight) {
    return {
      title: "Insight Not Found"
    };
  }

  return {
    title: insight.title,
    description: insight.metaDescription,
    alternates: {
      canonical: `https://adminops.cloud/insights/${insight.slug}`
    }
  };
}

export default function InsightDetailPage({ params }) {
  const insight = getPublishedInsightBySlug(params.slug);

  if (!insight) {
    return (
      <section className="section">
        <div className="container card">
          <h1>Insight not found</h1>
          <p>The requested insight does not exist yet.</p>
          <Link className="btn btn-secondary" href="/insights">Back to Insights</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <article className="container article">
        <p className="badge">Target keyword: {insight.targetKeyword}</p>
        <h1>{insight.title}</h1>
        <p>{insight.metaDescription}</p>

        {insight.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list?.length ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <h2>Top keywords from this research run</h2>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Keyword</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Search volume</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>CPC</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Competition</th>
              </tr>
            </thead>
            <tbody>
              {insight.keywordRows.map((row) => (
                <tr key={row.keyword}>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row.keyword}</td>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row.searchVolume ?? "-"}</td>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row.cpc ?? "-"}</td>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row.competition ?? row.competitionLevel ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h3>CTA: Book a free strategy call</h3>
          <a
            className="btn btn-primary"
            href={insight.cta.href}
            target="_blank"
            rel="noreferrer"
            data-track="book-call"
            data-cta-location="insight-detail"
          >
            {insight.cta.label}
          </a>
        </div>
      </article>
    </section>
  );
}
