"use client";

import { useMemo, useState } from "react";

const defaultPayload = {
  seedKeyword: "property management admin automation",
  segment: "Property Managers",
  locationCode: 2826,
  languageCode: "en"
};

export default function AdminSeoAgentPage() {
  const [form, setForm] = useState(defaultPayload);
  const [token, setToken] = useState("");
  const [save, setSave] = useState(true);
  const [loading, setLoading] = useState(false);
  const [workflowLoading, setWorkflowLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState("");
  const [workflowError, setWorkflowError] = useState("");
  const [workflowResult, setWorkflowResult] = useState(null);
  const [runs, setRuns] = useState([]);
  const [result, setResult] = useState(null);

  const curlPreview = useMemo(() => {
    const body = JSON.stringify({ ...form, save }, null, 2);
    return `curl -X POST "/api/seo-agent/research" -H "Content-Type: application/json" -H "x-seo-agent-token: ${token || "<SEO_AGENT_SECRET>"}" -d '${body}'`;
  }, [form, save, token]);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/seo-agent/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-seo-agent-token": token } : {})
        },
        body: JSON.stringify({ ...form, save })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to run SEO agent");
      }

      setResult(data);
    } catch (submitError) {
      setError(submitError.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function runDailyWorkflowNow() {
    setWorkflowError("");
    setWorkflowLoading(true);
    try {
      const response = await fetch("/api/seo-agent/run", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to dispatch workflow");
      }
      setWorkflowResult(data);
      await loadWorkflowStatus();
    } catch (runError) {
      setWorkflowError(runError.message || "Unknown error");
    } finally {
      setWorkflowLoading(false);
    }
  }

  async function loadWorkflowStatus() {
    setWorkflowError("");
    setStatusLoading(true);
    try {
      const response = await fetch("/api/seo-agent/status", { method: "GET" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load workflow status");
      }
      setRuns(data.runs || []);
    } catch (statusError) {
      setWorkflowError(statusError.message || "Unknown error");
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container article">
        <h1>Admin · SEO Agent</h1>
        <p>Run DataForSEO keyword research and generate publishable insight content from real search data.</p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <h2>Daily Autopilot Control</h2>
          <p>Use one-click controls to trigger the GitHub daily SEO workflow and monitor latest runs.</p>
          <div className="cta-row">
            <button className="btn btn-primary" type="button" onClick={runDailyWorkflowNow} disabled={workflowLoading || statusLoading}>
              {workflowLoading ? "Starting workflow..." : "Run Daily Workflow Now"}
            </button>
            <button className="btn btn-secondary" type="button" onClick={loadWorkflowStatus} disabled={workflowLoading || statusLoading}>
              {statusLoading ? "Refreshing..." : "Refresh Workflow Status"}
            </button>
          </div>
          {workflowResult?.actionsUrl ? (
            <p style={{ marginTop: "0.75rem" }}>
              <a href={workflowResult.actionsUrl} target="_blank" rel="noreferrer">Open GitHub workflow page</a>
            </p>
          ) : null}
          {workflowError ? <p style={{ color: "#b42318" }}>{workflowError}</p> : null}

          {runs.length ? (
            <div style={{ marginTop: "1rem", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Created</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Conclusion</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Event</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Run</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run) => (
                    <tr key={run.id}>
                      <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{new Date(run.createdAt).toLocaleString()}</td>
                      <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{run.status}</td>
                      <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{run.conclusion || "-"}</td>
                      <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{run.event}</td>
                      <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>
                        <a href={run.htmlUrl} target="_blank" rel="noreferrer">View run</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <form className="card" onSubmit={onSubmit} style={{ marginTop: "1rem" }}>
          <h2>Generation Inputs</h2>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Seed keyword
            <input
              style={{ width: "100%", marginTop: "0.3rem", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #d0d5dd" }}
              value={form.seedKeyword}
              onChange={(event) => setForm((prev) => ({ ...prev, seedKeyword: event.target.value }))}
              required
            />
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Segment label
            <input
              style={{ width: "100%", marginTop: "0.3rem", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #d0d5dd" }}
              value={form.segment}
              onChange={(event) => setForm((prev) => ({ ...prev, segment: event.target.value }))}
              required
            />
          </label>

          <div className="grid-2">
            <label style={{ display: "block", marginBottom: "0.75rem" }}>
              Location code
              <input
                type="number"
                style={{ width: "100%", marginTop: "0.3rem", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #d0d5dd" }}
                value={form.locationCode}
                onChange={(event) => setForm((prev) => ({ ...prev, locationCode: Number(event.target.value) }))}
                required
              />
            </label>

            <label style={{ display: "block", marginBottom: "0.75rem" }}>
              Language code
              <input
                style={{ width: "100%", marginTop: "0.3rem", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #d0d5dd" }}
                value={form.languageCode}
                onChange={(event) => setForm((prev) => ({ ...prev, languageCode: event.target.value }))}
                required
              />
            </label>
          </div>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            API token (SEO_AGENT_SECRET)
            <input
              type="password"
              style={{ width: "100%", marginTop: "0.3rem", padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #d0d5dd" }}
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Optional if secret not set"
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="checkbox"
              checked={save}
              onChange={(event) => setSave(event.target.checked)}
            />
            Save generated insight to content/insights
          </label>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Running SEO Agent..." : "Generate Insight"}
          </button>
        </form>

        <div className="card" style={{ marginTop: "1rem" }}>
          <h2>API request preview</h2>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{curlPreview}</pre>
        </div>

        {error ? (
          <div className="card" style={{ marginTop: "1rem", borderColor: "#fda29b" }}>
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : null}

        {result ? (
          <div className="card" style={{ marginTop: "1rem" }}>
            <h2>Latest result</h2>
            <p><strong>Title:</strong> {result.insight?.title}</p>
            <p><strong>Slug:</strong> {result.insight?.slug}</p>
            <p><strong>Saved:</strong> {String(Boolean(result.saved))}</p>
            {result.savedPath ? <p><strong>Saved path:</strong> {result.savedPath}</p> : null}
            <p><strong>Target keyword:</strong> {result.insight?.targetKeyword}</p>
            <a className="btn btn-secondary" href={`/insights/${result.insight?.slug}`} target="_blank" rel="noreferrer">Open generated insight</a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
