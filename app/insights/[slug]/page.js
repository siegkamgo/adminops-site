import Link from "next/link";
import Script from "next/script";
import { getInsightBySlug, getPublishedInsightBySlug, listPublishedInsights } from "../../../lib/insights-store";

export const revalidate = 3600;

function tokenizeText(value) {
  return String(value || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((part) => part.length > 2);
}

function scoreRelatedness(currentInsight, candidateInsight) {
  let score = 0;

  if (currentInsight.segment && candidateInsight.segment && currentInsight.segment === candidateInsight.segment) {
    score += 4;
  }

  if (currentInsight.targetKeyword && candidateInsight.targetKeyword) {
    const currentKeyword = String(currentInsight.targetKeyword).toLowerCase();
    const candidateKeyword = String(candidateInsight.targetKeyword).toLowerCase();

    if (currentKeyword === candidateKeyword) {
      score += 5;
    } else if (currentKeyword.includes(candidateKeyword) || candidateKeyword.includes(currentKeyword)) {
      score += 2;
    }
  }

  const currentTokens = new Set([
    ...tokenizeText(currentInsight.title),
    ...tokenizeText(currentInsight.targetKeyword)
  ]);

  const candidateTokens = [
    ...tokenizeText(candidateInsight.title),
    ...tokenizeText(candidateInsight.targetKeyword)
  ];

  candidateTokens.forEach((token) => {
    if (currentTokens.has(token)) {
      score += 1;
    }
  });

  return score;
}

function getRelatedInsights(currentInsight, limit = 3) {
  const published = listPublishedInsights();

  return published
    .filter((item) => item.slug !== currentInsight.slug)
    .map((item) => ({
      insight: item,
      score: scoreRelatedness(currentInsight, item)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.insight);
}

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

function getHumanLeadParagraph(insight) {
  const candidateParagraphs = insight.sections
    .flatMap((section) => section.paragraphs || [])
    .map((paragraph) => String(paragraph || "").trim())
    .filter(Boolean);

  const segmentToken = String(insight.segment || "").split(" ")[0]?.toLowerCase();
  const keyword = String(insight.targetKeyword || "").toLowerCase();

  const preferred = candidateParagraphs.find((paragraph) => {
    const lower = paragraph.toLowerCase();
    const startsWithUppercase = /^[A-Z]/.test(paragraph);
    const segmentMatch = segmentToken ? lower.includes(segmentToken) : false;
    const avoidsKeywordPrefix = keyword ? !lower.startsWith(keyword) : true;
    return startsWithUppercase && (segmentMatch || avoidsKeywordPrefix);
  });

  if (preferred) {
    return preferred;
  }

  return insight.metaDescription;
}

function toSectionId(value, index) {
  const normalized = String(value || "section")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `${normalized || "section"}-${index + 1}`;
}

function getKeyTakeaways(insight) {
  const firstLists = insight.sections
    .flatMap((section) => section.list || [])
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  if (firstLists.length) {
    return firstLists.slice(0, 3);
  }

  const shortParagraphs = insight.sections
    .flatMap((section) => section.paragraphs || [])
    .map((paragraph) => String(paragraph || "").trim())
    .filter((paragraph) => paragraph.length > 0 && paragraph.length < 180);

  return shortParagraphs.slice(0, 3);
}

function getLeadVisual(insight) {
  if (insight.featuredImage?.src) {
    return insight.featuredImage;
  }

  for (const section of insight.sections || []) {
    if (section.images?.length) {
      return section.images[0];
    }
  }

  return null;
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
    openGraph: {
      title: insight.title,
      description: insight.metaDescription,
      type: "article",
      url: `https://adminops.cloud/insights/${insight.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.metaDescription
    },
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
  const relatedInsights = getRelatedInsights(insight);
  const leadParagraph = getHumanLeadParagraph(insight);
  const keyTakeaways = getKeyTakeaways(insight);
  const leadVisual = getLeadVisual(insight);
  const tocEntries = insight.sections.map((section, index) => ({
    id: toSectionId(section.title, index),
    title: section.title
  }));

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
        {previewMode ? <p><strong>Preview mode enabled:</strong> viewing unpublished content.</p> : null}
        <p className="article-meta">
          <strong>Written by:</strong> AdminOps Editorial Team · <strong>Reviewed by:</strong> Operations Strategy Lead
        </p>
        <h1>{insight.title}</h1>
        <p className="article-meta"><strong>Published:</strong> {insight.publishDate}</p>

        {leadVisual ? (
          <figure className="article-lead-visual card">
            <img
              src={leadVisual.src}
              alt={leadVisual.alt}
              loading="eager"
              style={{ width: "100%", height: "auto", borderRadius: "0.75rem" }}
            />
            {leadVisual.caption ? <figcaption>{leadVisual.caption}</figcaption> : null}
          </figure>
        ) : null}

        <p className="article-intro">{leadParagraph}</p>

        {keyTakeaways.length ? (
          <aside className="article-takeaways card" aria-label="Key takeaways">
            <h2>Key takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        ) : null}

        {tocEntries.length ? (
          <nav className="article-toc card" aria-label="In-article table of contents">
            <h2>On this page</h2>
            <ul>
              {tocEntries.map((entry) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`}>{entry.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {insight.sections.map((section, index) => (
          <section key={section.title} id={toSectionId(section.title, index)}>
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

        {relatedInsights.length ? (
          <div className="card" style={{ marginTop: "1.5rem" }}>
            <h3>Related insights</h3>
            <ul>
              {relatedInsights.map((related) => (
                <li key={related.slug}>
                  <Link href={`/insights/${related.slug}`}>{related.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </section>
  );
}
