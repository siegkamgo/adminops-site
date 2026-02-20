import { NextResponse } from "next/server";

function getGitHubConfig() {
  const token = process.env.GITHUB_ACTIONS_PAT;
  const owner = process.env.GITHUB_REPO_OWNER || "siegkamgo";
  const repo = process.env.GITHUB_REPO_NAME || "adminops-site";
  const workflowId = process.env.GITHUB_WORKFLOW_FILE || "seo-agent.yml";

  if (!token) {
    throw new Error("Missing GITHUB_ACTIONS_PAT env variable.");
  }

  return { token, owner, repo, workflowId };
}

export async function GET() {
  try {
    const { token, owner, repo, workflowId } = getGitHubConfig();

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub status fetch failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const runs = (data.workflow_runs || []).map((run) => ({
      id: run.id,
      status: run.status,
      conclusion: run.conclusion,
      htmlUrl: run.html_url,
      createdAt: run.created_at,
      updatedAt: run.updated_at,
      branch: run.head_branch,
      event: run.event
    }));

    return NextResponse.json({
      ok: true,
      runs
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Failed to fetch workflow status"
      },
      { status: 500 }
    );
  }
}
