import Link from "next/link";
import Script from "next/script";
import { listInsights, listPublishedInsights } from "../../lib/insights-store";

export const metadata = {
  title: "Insights",
  description: "Data-backed SEO and operations insights generated from live search data research."
};

function getSearchParamValue(searchParams, key) {
  const value = searchParams?.[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function isPreviewAuthorized(searchParams) {
  const expectedToken = process.env.INSIGHTS_PREVIEW_TOKEN;
  if (!expectedToken) {
    return false;
  }

  const previewValue = String(getSearchParamValue(searchParams, "preview") || "").toLowerCase();
  const token = getSearchParamValue(searchParams, "token");

  return (previewValue === "1" || previewValue === "true") && token === expectedToken;
}

export default function InsightsIndexPage({ searchParams }) {
  const previewMode = isPreviewAuthorized(searchParams);
  const insights = previewMode ? listInsights() : listPublishedInsights();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: insights.map((insight, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://adminops.cloud/insights/${insight.slug}`,
      name: insight.title
    }))
  };

  return (
    <section className="section">
      <div className="container">
        <Script id="insights-itemlist-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(itemListSchema)}
        </Script>
        <h1>Insights</h1>
        <p>Data-backed articles generated from live keyword research to support SEO and AI Overview visibility.</p>
        {previewMode ? (
          <p><strong>Preview mode enabled:</strong> future-dated insights are visible.</p>
        ) : null}

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
