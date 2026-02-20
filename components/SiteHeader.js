import Link from "next/link";

const navItems = [
  { href: "/restaurant-ops-ai-agents", label: "Restaurants" },
  { href: "/property-management-ai-agents", label: "Property Managers" },
  { href: "/clinic-ops-ai-agents", label: "Clinics" },
  { href: "/adminops-pilot", label: "Pilot" },
  { href: "/insights", label: "Insights" }
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container topbar">
        <Link className="brand" href="/">
          <span className="ops-dot" />
          <span>AdminOps</span>
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="btn btn-primary"
          href="https://www.cal.eu/sieg-kamgo/30min"
          target="_blank"
          rel="noreferrer"
          data-track="book-call"
          data-cta-location="header"
        >
          Book a free strategy call
        </a>
      </div>
    </header>
  );
}
