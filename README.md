# AdminOps Website (Next.js App Router)

Brand website for AdminOps at adminops.cloud, including landing page, segment-specific money pages, offer page, SEO/GEO article, and analytics setup.

## Ideal Client Avatar (Summary)

- Role: Owner / COO / Operations Manager
- Company size: 5–50 staff
- Revenue: $1M–$10M
- Industries: Property managers, clinics, restaurants, and other admin-heavy SMBs
- Pain: Drowning in admin, error-prone workflows, slow reporting
- Desire: Fewer admin hours, clean reporting, no extra hires
- Fear: AI mistakes, security gaps, losing operational control

## Pages Included

- `/` Landing page with hero, problem, solution, agent stack, segments, packages, process, and CTA
- `/property-management-ai-agents` Segment page
- `/clinic-ops-ai-agents` Segment page
- `/restaurant-ops-ai-agents` Segment page
- `/adminops-pilot` Offer page for 30-day pilot
- `/blog/property-management-admin-automation` SEO + GEO article (UK + US angle)
- `/insights` Generated insights index (data-backed content)
- `/insights/[slug]` Generated insight detail page
- `/analytics-setup` GA4, GSC, Plausible/Fathom setup instructions

## DataForSEO SEO Agent Automation

This project includes an automation pipeline that uses real DataForSEO search data to generate publishable insight articles.

### Simplest auto mode (recommended)

If you want fully automatic content creation with minimal setup:

1. Add only these GitHub repository secrets:
	- `DATAFORSEO_API_KEY` (format: `login:password`)
2. Enable the existing workflow `.github/workflows/seo-agent.yml`
3. Done — it runs daily and generates/publishes insights for:
	- Restaurants
	- Property Managers
	- Clinics

No admin UI auth variables are required for this mode.

### Required environment variables

- `DATAFORSEO_LOGIN`
- `DATAFORSEO_PASSWORD`
- `DATAFORSEO_API_KEY` (optional single-secret alternative, format `login:password`)
- `SEO_AGENT_LOCATION_CODE` (example `2826` for UK, `2840` for US)
- `SEO_AGENT_LANGUAGE_CODE` (example `en`)
- `SEO_AGENT_SECRET` (optional, secures API endpoint)
- `ADMIN_BASIC_AUTH_USER` (required for private admin UI)
- `ADMIN_BASIC_AUTH_PASS` (required for private admin UI)

### Generate an insight locally

```bash
npm run seo:agent -- --seed "property management admin automation" --segment "Property Managers" --location 2826 --language en
```

Generate a new dated article (daily publishing mode):

```bash
npm run seo:agent -- --seed "property management admin automation" --segment "Property Managers" --location 2826 --language en --daily true
```

Generated files:

- `content/insights/<slug>.json`
- `content/insights/_reports/<slug>.json`

### Trigger keyword research from API

- Endpoint: `POST /api/seo-agent/research`
- Optional auth header: `x-seo-agent-token: <SEO_AGENT_SECRET>`
- Payload example:

```json
{
	"seedKeyword": "clinic operations automation",
	"segment": "Clinics",
	"locationCode": 2840,
	"languageCode": "en"
}
```

### Private admin UI

- Route: `/admin/seo-agent`
- Protected by HTTP Basic Auth via `middleware.js`
- The page allows generating and saving insights directly into `content/insights`
- If `SEO_AGENT_SECRET` is set, paste it into the UI token field
- The page also supports one-click daily workflow control and run-status refresh

To enable one-click workflow control from the admin dashboard, set:

- `GITHUB_ACTIONS_PAT` (GitHub token with Actions read/write on this repo)
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`
- `GITHUB_WORKFLOW_FILE` (default `seo-agent.yml`)
- `GITHUB_WORKFLOW_REF` (default `main`)

### Fully automated daily publishing

GitHub Action workflow: `.github/workflows/seo-agent.yml`

Set these GitHub repository secrets:

- `DATAFORSEO_LOGIN`
- `DATAFORSEO_PASSWORD`

Then run manually with **Actions → SEO Agent (DataForSEO) → Run workflow**, or let the daily schedule publish automatically.

## Suggested File Structure

```text
adminops-site/
├─ app/
│  ├─ adminops-pilot/page.js
│  ├─ analytics-setup/page.js
│  ├─ blog/property-management-admin-automation/page.js
│  ├─ clinic-ops-ai-agents/page.js
│  ├─ property-management-ai-agents/page.js
│  ├─ restaurant-ops-ai-agents/page.js
│  ├─ globals.css
│  ├─ layout.js
│  └─ page.js
├─ components/
│  └─ SiteHeader.js
├─ next.config.mjs
├─ package.json
└─ README.md
```

## Analytics Setup Quick Notes

- GA4 script injection is implemented in `app/layout.js` via `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Plausible script injection is implemented in `app/layout.js` via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- Add these values in Vercel Project Settings → Environment Variables, then redeploy.
- Verify GA4 with Realtime reports and GSC using domain-level DNS verification.

## Run Locally

```bash
npm install
npm run dev
```
