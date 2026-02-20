import { fetchKeywordResearch } from "./dataforseo.js";

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSection(title, paragraphs, list) {
  return {
    title,
    paragraphs,
    list: list || []
  };
}

export async function buildInsightFromSeed({
  seedKeyword,
  segment,
  locationCode = 2840,
  languageCode = "en",
  dailyMode = false
}) {
  const keywordRows = await fetchKeywordResearch({
    seedKeyword,
    locationCode,
    languageCode,
    limit: 80
  });

  if (!keywordRows.length) {
    throw new Error("No keyword data returned by DataForSEO for this seed.");
  }

  const primary = keywordRows[0];
  const secondary = keywordRows.slice(1, 8);
  const publishDate = new Date().toISOString().split("T")[0];

  const title = `${segment}: ${primary.keyword} Strategy Based on Live Search Data`;
  const baseSlug = slugify(`${segment}-${primary.keyword}`);
  const slug = dailyMode ? `${baseSlug}-${publishDate}` : baseSlug;

  const sections = [
    buildSection(
      "What the market is searching for right now",
      [
        `This insight is based on live keyword research from DataForSEO for the seed term "${seedKeyword}".`,
        `The strongest opportunity keyword in this data set is "${primary.keyword}", with an estimated search volume of ${primary.searchVolume || 0}.`
      ],
      secondary.map((item) => `${item.keyword} (${item.searchVolume || 0} monthly searches)`)
    ),
    buildSection(
      "Prioritize high-intent content first",
      [
        "Start with pages that map directly to commercial and operational intent: implementation guides, comparisons, and ROI pages.",
        "Use one primary keyword and 4-7 close secondary phrases per article to improve topical relevance while preserving clarity."
      ],
      [
        `Primary keyword: ${primary.keyword}`,
        `Suggested segment: ${segment}`,
        "Page type: conversion-focused insight article"
      ]
    ),
    buildSection(
      "Execution blueprint for the next 30 days",
      [
        "Publish one insight article per week per segment and internally link each article to the relevant money page.",
        "Refresh top-performing articles monthly using fresh search-volume pulls to maintain relevance for both Google and AI overviews."
      ],
      [
        "Week 1: publish primary insight article",
        "Week 2: publish a comparison article",
        "Week 3: publish a practical checklist article",
        "Week 4: refresh links and update data references"
      ]
    )
  ];

  return {
    slug,
    title,
    metaDescription: `Data-backed ${segment} SEO insight built from live DataForSEO keyword research around \"${seedKeyword}\".`,
    targetKeyword: primary.keyword,
    segment,
    seedKeyword,
    locationCode,
    languageCode,
    publishDate,
    keywordRows: keywordRows.slice(0, 25),
    sections,
    cta: {
      label: "Book a free strategy call",
      href: "https://www.cal.eu/sieg-kamgo/30min"
    }
  };
}
