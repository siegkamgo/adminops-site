import { NextResponse } from "next/server";
import { buildInsightFromSeed } from "../../../../lib/seo-agent.js";
import { saveInsight } from "../../../../lib/insights-store.js";

function getProvidedToken(request) {
  const bearer = request.headers.get("authorization");
  if (bearer && bearer.toLowerCase().startsWith("bearer ")) {
    return bearer.slice(7).trim();
  }

  return (
    request.headers.get("x-agent-api-key") ||
    request.headers.get("x-seo-agent-token") ||
    ""
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const expectedToken = process.env.OPENCLAW_API_KEY || process.env.SEO_AGENT_SECRET;

    if (expectedToken) {
      const authToken = getProvidedToken(request);
      if (authToken !== expectedToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const insight = await buildInsightFromSeed({
      seedKeyword: body.seedKeyword || "property management admin automation",
      segment: body.segment || "Property Managers",
      locationCode: body.locationCode || process.env.SEO_AGENT_LOCATION_CODE || 2826,
      languageCode: body.languageCode || process.env.SEO_AGENT_LANGUAGE_CODE || "en"
    });

    let savedPath = null;
    const shouldSave = body.save === true;
    if (shouldSave) {
      savedPath = saveInsight(insight);
    }

    return NextResponse.json({
      insight,
      saved: shouldSave,
      savedPath
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Failed to generate insight"
      },
      { status: 500 }
    );
  }
}
