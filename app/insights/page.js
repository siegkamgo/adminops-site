import Link from "next/link";
import Script from "next/script";
import { listInsights, listPublishedInsights } from "../../lib/insights-store";

export const revalidate = 3600;

export const metadata = {
  title: "Insights",
  description: "Data-backed SEO and operations insights generated from live search data research."
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

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

function getCoverImage(insight) {
  if (typeof insight.featuredImage === "string" && insight.featuredImage) {
    return insight.featuredImage;
  }

  if (insight.featuredImage?.src) {
    return insight.featuredImage.src;
  }

  for (const section of insight.sections || []) {
    if (Array.isArray(section.images) && section.images.length > 0) {
      return section.images[0].src;
    }
  }

  return null;
}

function getExcerpt(insight) {
  const fallback = "Explore practical workflows, implementation guidance, and KPI-focused playbooks for operations teams.";
  const firstParagraph = insight.sections?.find((section) => Array.isArray(section.paragraphs) && section.paragraphs.length > 0)?.paragraphs?.[0];
  const source = insight.metaDescription || firstParagraph || fallback;
  return source.length > 150 ? `${source.slice(0, 147)}...` : source;
}

function estimateReadTime(insight) {
  const textChunks = [];
  for (const section of insight.sections || []) {
    if (Array.isArray(section.paragraphs)) {
      textChunks.push(...section.paragraphs);
    }
    if (Array.isArray(section.list)) {
      textChunks.push(...section.list);
    }
  }

  const words = textChunks.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.round(words / 220) || 4);
}

function toHashtag(value) {
  const tokens = String(value || "")
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase());

  if (tokens.length === 0) {
    return null;
  }

  return `#${tokens.join("")}`;
}

function getTags(insight) {
  const candidates = [insight.segment, insight.seedKeyword, insight.targetKeyword, insight.keywordRows?.[0]?.keyword].filter(Boolean);
  const tags = [];
  const seen = new Set();

  for (const candidate of candidates) {
    const tag = toHashtag(candidate);
    if (tag && !seen.has(tag)) {
      tags.push(tag);
      seen.add(tag);
    }
    if (tags.length === 3) {
      break;
    }
  }

  return tags;
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
    <section className="section insights-page">
      <div className="container">
        <Script id="insights-itemlist-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(itemListSchema)}
        </Script>
        <header className="insights-header">
          <h1>Insights</h1>
          <p>Data-backed articles generated from live keyword research to support SEO and AI Overview visibility.</p>
          <p>
            Subscribe: <Link href="/insights/rss.xml">RSS feed</Link>
          </p>
        </header>
        {previewMode ? (
          <p className="insights-preview"><strong>Preview mode enabled:</strong> future-dated insights are visible.</p>
        ) : null}

        {insights.length === 0 ? (
          <div className="card">
            <h2>No generated insights yet</h2>
            <p>Run the SEO agent script to generate the first data-backed insight article.</p>
          </div>
        ) : (
          <div className="insights-grid" style={{ marginTop: "1rem" }}>
            {insights.map((insight) => {
              const href = `/insights/${insight.slug}`;
              const coverImage = getCoverImage(insight);
              const readTime = estimateReadTime(insight);
              const tags = getTags(insight);
              const publishedDate = insight.publishDate ? DATE_FORMATTER.format(new Date(insight.publishDate)) : "Upcoming";

              return (
                <article className="insight-card-v2" key={insight.slug}>
                  <Link href={href} className="insight-card-media" aria-label={insight.title}>
                    {coverImage ? (
                      <img src={coverImage} alt={insight.title} loading="lazy" />
                    ) : (
                      <div className="insight-card-media-placeholder">No image available</div>
                    )}
                  </Link>

                  <div className="insight-card-body">
                    <div className="insight-card-meta-row">
                      <span className="insight-pill">{insight.segment || "Insights"}</span>
                      <span>{readTime} min read</span>
                    </div>

                    <h2>
                      <Link href={href}>{insight.title}</Link>
                    </h2>

                    <p className="insight-card-excerpt">{getExcerpt(insight)}</p>

                    <div className="insight-card-footer">
                      <div className="insight-card-author">
                        <span className="insight-avatar" aria-hidden="true">AO</span>
                        <div>
                          <strong>AdminOps Team</strong>
                          <span>{publishedDate}</span>
                        </div>
                      </div>

                      <Link href={href} className="insight-read-more">
                        Read more
                      </Link>
                    </div>

                    {tags.length > 0 ? (
                      <div className="insight-card-tags">
                        {tags.map((tag) => (
                          <span key={`${insight.slug}-${tag}`}>{tag}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
