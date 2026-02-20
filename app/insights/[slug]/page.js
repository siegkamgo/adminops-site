import Link from "next/link";
import Script from "next/script";
import { getPublishedInsightBySlug, listPublishedInsights } from "../../../lib/insights-store";

function extractFaqEntries(insight) {
  const faqSection = insight.sections.find((section) => section.title?.toLowerCase().includes("faq"));
  if (!faqSection) {
    return [];
  }

  return faqSection.paragraphs
    .map((paragraph) => {
      const questionEnd = paragraph.indexOf("?");
      if (questionEnd === -1) {
        return null;
      }

      const question = paragraph.slice(0, questionEnd + 1).trim();
      const answer = paragraph.slice(questionEnd + 1).trim();

      if (!question || !answer) {
        return null;
      }

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer
        }
      };
    })
    .filter(Boolean);
}

function buildSchemas(insight) {
  const insightUrl = `https://adminops.cloud/insights/${insight.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.metaDescription,
    datePublished: insight.publishDate,
    dateModified: insight.publishDate,
    mainEntityOfPage: insightUrl,
    author: {
      "@type": "Organization",
      name: "AdminOps"
    },
    publisher: {
      "@type": "Organization",
      name: "AdminOps",
      url: "https://adminops.cloud"
    },
    keywords: [
      insight.targetKeyword,
      ...(insight.keywordRows || []).slice(0, 6).map((row) => row.keyword)
    ].filter(Boolean)
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://adminops.cloud/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: "https://adminops.cloud/insights"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: insight.title,
        item: insightUrl
      }
    ]
  };

  const faqEntries = extractFaqEntries(insight);
  const faqSchema = faqEntries.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqEntries
      }
    : null;

  return { articleSchema, breadcrumbSchema, faqSchema };
}

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

  const { articleSchema, breadcrumbSchema, faqSchema } = buildSchemas(insight);

  return (
    <section className="section">
      <article className="container article">
        <Script id="insight-article-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(articleSchema)}
        </Script>
        <Script id="insight-breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(breadcrumbSchema)}
        </Script>
        {faqSchema ? (
          <Script id="insight-faq-schema" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify(faqSchema)}
          </Script>
        ) : null}
        <p className="badge">Target keyword: {insight.targetKeyword}</p>
        <h1>{insight.title}</h1>
        <p><strong>Published:</strong> {insight.publishDate}</p>
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
