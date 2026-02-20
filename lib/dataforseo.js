const DATAFORSEO_BASE_URL = "https://api.dataforseo.com/v3";

function getAuthHeader() {
  const apiKey = process.env.DATAFORSEO_API_KEY;
  const keyLogin = apiKey?.includes(":") ? apiKey.split(":")[0] : "";
  const keyPassword = apiKey?.includes(":") ? apiKey.split(":").slice(1).join(":") : "";
  const login = keyLogin || process.env.DATAFORSEO_LOGIN || process.env.DATAFORSEO_API_LOGIN;
  const password = keyPassword || process.env.DATAFORSEO_PASSWORD || process.env.DATAFORSEO_API_PASSWORD;

  if (!login || !password) {
    throw new Error("Missing DataForSEO credentials. Set DATAFORSEO_API_KEY as login:password, or DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD.");
  }

  return `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`;
}

async function dataforseoPost(path, body) {
  const response = await fetch(`${DATAFORSEO_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DataForSEO request failed (${response.status}): ${text}`);
  }

  const json = await response.json();

  if (json.status_code && json.status_code !== 20000) {
    throw new Error(`DataForSEO error: ${json.status_message || "Unknown error"}`);
  }

  return json;
}

function normalizeKeywordItem(item) {
  const keywordInfo = item.keyword_info || {};
  return {
    keyword: item.keyword || "",
    searchVolume: keywordInfo.search_volume ?? item.search_volume ?? 0,
    cpc: keywordInfo.cpc ?? item.cpc ?? null,
    competition: keywordInfo.competition ?? item.competition ?? null,
    competitionLevel: keywordInfo.competition_level ?? item.competition_level ?? null,
    keywordDifficulty: item.keyword_difficulty ?? null
  };
}

export async function fetchKeywordSuggestions({
  seedKeyword,
  locationCode = 2840,
  languageCode = "en",
  limit = 50
}) {
  const payload = [
    {
      keyword: seedKeyword,
      location_code: Number(locationCode),
      language_code: languageCode,
      limit,
      include_serp_info: true,
      include_seed_keyword: true
    }
  ];

  const json = await dataforseoPost("/dataforseo_labs/google/keyword_suggestions/live", payload);
  const items = json.tasks?.[0]?.result?.[0]?.items || [];
  return items.map(normalizeKeywordItem).filter((item) => item.keyword);
}

export async function fetchKeywordOverview({
  keywords,
  locationCode = 2840,
  languageCode = "en"
}) {
  if (!keywords.length) {
    return [];
  }

  const payload = [
    {
      keywords,
      location_code: Number(locationCode),
      language_code: languageCode,
      include_serp_info: true,
      include_clickstream_data: true
    }
  ];

  const json = await dataforseoPost("/dataforseo_labs/google/keyword_overview/live", payload);
  const items = json.tasks?.[0]?.result?.[0]?.items || [];
  return items.map(normalizeKeywordItem).filter((item) => item.keyword);
}

export async function fetchKeywordResearch(input) {
  const suggestions = await fetchKeywordSuggestions(input);
  const topKeywords = suggestions
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 20)
    .map((item) => item.keyword);

  const overview = await fetchKeywordOverview({
    keywords: topKeywords,
    locationCode: input.locationCode,
    languageCode: input.languageCode
  });

  const byKeyword = new Map();
  for (const item of suggestions) {
    byKeyword.set(item.keyword, item);
  }
  for (const item of overview) {
    byKeyword.set(item.keyword, { ...(byKeyword.get(item.keyword) || {}), ...item });
  }

  return Array.from(byKeyword.values())
    .filter((item) => item.keyword)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
}
