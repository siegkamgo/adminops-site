import Link from "next/link";
import Script from "next/script";
import { getInsightBySlug, getPublishedInsightBySlug, listPublishedInsights } from "../../../lib/insights-store";

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

function parseInternalLinkItem(item) {
  if (typeof item !== "string") {
    return null;
  }

  const match = item.match(/^(.*):\s(\/[^\s]+)$/);
  if (!match) {
    return null;
  }

  return {
    label: match[1].trim(),
    href: match[2].trim()
  };
}

function extractHowToSteps(insight) {
  const playbookSection = insight.sections.find((section) =>
    section.title?.toLowerCase().includes("how to implement")
  );

  if (!playbookSection?.list?.length) {
    return [];
  }

  return playbookSection.list
    .map((item) => item.replace(/^Step\s*\d+\s*:\s*/i, "").trim())
    .filter(Boolean)
    .map((text) => ({
      "@type": "HowToStep",
      name: text,
      text
    }));
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

  const howToSteps = extractHowToSteps(insight);
  const howToSchema = howToSteps.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `${insight.title} Implementation Steps`,
        description: insight.metaDescription,
        step: howToSteps,
        totalTime: "P30D"
      }
    : null;

  return { articleSchema, breadcrumbSchema, faqSchema, howToSchema };
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

export default function InsightDetailPage({ params, searchParams }) {
  const previewMode = isPreviewAuthorized(searchParams);
  const insight = previewMode
    ? getInsightBySlug(params.slug)
    : getPublishedInsightBySlug(params.slug);

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

  const { articleSchema, breadcrumbSchema, faqSchema, howToSchema } = buildSchemas(insight);

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
        {howToSchema ? (
          <Script id="insight-howto-schema" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify(howToSchema)}
          </Script>
        ) : null}
        <p className="badge">Target keyword: {insight.targetKeyword}</p>
        {previewMode ? <p><strong>Preview mode enabled:</strong> viewing unpublished content.</p> : null}
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
                  <li key={item}>
                    {(() => {
                      const parsedLink = parseInternalLinkItem(item);
                      if (!parsedLink) {
                        return item;
                      }

                      return (
                        <>
                          {parsedLink.label}: <Link href={parsedLink.href}>{parsedLink.href}</Link>
                        </>
                      );
                    })()}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.images?.length ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0.75rem",
                  marginTop: "0.75rem"
                }}
              >
                {section.images.map((image) => (
                  <figure key={`${section.title}-${image.src}`} className="card" style={{ margin: 0 }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
                    />
                    {image.caption ? <figcaption style={{ marginTop: "0.5rem" }}>{image.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
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
