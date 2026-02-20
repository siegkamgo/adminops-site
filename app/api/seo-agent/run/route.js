import { NextResponse } from "next/server";

function getGitHubConfig() {
  const token = process.env.GITHUB_ACTIONS_PAT;
  const owner = process.env.GITHUB_REPO_OWNER || "siegkamgo";
  const repo = process.env.GITHUB_REPO_NAME || "adminops-site";
  const workflowId = process.env.GITHUB_WORKFLOW_FILE || "seo-agent.yml";
  const ref = process.env.GITHUB_WORKFLOW_REF || "main";

  if (!token) {
    throw new Error("Missing GITHUB_ACTIONS_PAT env variable.");
  }

  return { token, owner, repo, workflowId, ref };
}

export async function POST() {
  try {
    const { token, owner, repo, workflowId, ref } = getGitHubConfig();

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ref })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub dispatch failed (${response.status}): ${errorText}`);
    }

    return NextResponse.json({
      ok: true,
      message: "Workflow dispatch started",
      actionsUrl: `https://github.com/${owner}/${repo}/actions/workflows/${workflowId}`
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Failed to dispatch workflow"
      },
      { status: 500 }
    );
  }
}
