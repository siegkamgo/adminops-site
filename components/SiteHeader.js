import Link from "next/link";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/insights", label: "Insights" },
  { href: "/#faq", label: "FAQ" }
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
          Book a call
        </a>
      </div>
    </header>
  );
}
