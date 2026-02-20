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
- `/analytics-setup` GA4, GSC, Plausible/Fathom setup instructions

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
