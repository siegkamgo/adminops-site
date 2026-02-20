import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/property-management-ai-agents", label: "Property" },
  { href: "/clinic-ops-ai-agents", label: "Clinic" },
  { href: "/restaurant-ops-ai-agents", label: "Restaurant" },
  { href: "/adminops-pilot", label: "Pilot" },
  { href: "/blog/property-management-admin-automation", label: "Blog" },
  { href: "/analytics-setup", label: "Analytics" }
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
