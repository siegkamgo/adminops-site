export async function GET() {
  const content = `# AdminOps
> Automate 60–80% of routine admin work in 30 days.

AdminOps provides AI agents that automate repetitive admin workflows while humans keep final approval.

## Primary audience
- Owners, COOs, and operations managers
- SMBs with 5–50 staff and admin-heavy workflows
- Property management, clinics, restaurants, and similar sectors

## Canonical pages
- https://adminops.cloud/
- https://adminops.cloud/adminops-pilot
- https://adminops.cloud/property-management-ai-agents
- https://adminops.cloud/clinic-ops-ai-agents
- https://adminops.cloud/restaurant-ops-ai-agents
- https://adminops.cloud/blog/property-management-admin-automation
- https://adminops.cloud/insights
- https://adminops.cloud/insights/rss.xml
- https://adminops.cloud/comparisons/adminops-vs-hiring-admin-staff
- https://adminops.cloud/comparisons/adminops-vs-rpa-tools
- https://adminops.cloud/comparisons/adminops-vs-virtual-assistants
- https://adminops.cloud/guides/property-management-automation-guide
- https://adminops.cloud/guides/clinic-automation-guide
- https://adminops.cloud/guides/restaurant-automation-guide

## Contact
- Email: info@adminops.cloud
- CTA: https://www.cal.eu/sieg-kamgo/30min
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
