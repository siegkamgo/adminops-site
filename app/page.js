import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "AdminOps | AI Agents for Admin Automation",
  description:
    "Automate 60–80% of routine admin work in 30 days with AI agents, human approval controls, and measurable ops KPIs. Book a free strategy call."
};

export default function HomePage() {
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AdminOps Homepage",
    url: "https://adminops.cloud/",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#home-hero-heading", "#home-hero-summary"]
    }
  };

  return (
    <>
      <Script id="home-speakable-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(speakableSchema)}
      </Script>

      <div className="home-page">
        <section className="home-hero">
          <div className="container home-hero-grid">
            <div>
              <span className="home-pill">AI Operations Support · Resolve more admin work with less effort</span>
              <h1 id="home-hero-heading">AI Agents for Admin Workflows & Revenue Operations</h1>
              <p id="home-hero-summary">
                AdminOps is an AI operations platform with human approval controls that handles repetitive requests,
                routing, reconciliations, and reporting so your team can focus on higher-value execution.
              </p>
              <div className="cta-row">
                <a
                  className="btn btn-primary"
                  href="https://www.cal.eu/sieg-kamgo/30min"
                  target="_blank"
                  rel="noreferrer"
                  data-track="book-call"
                  data-cta-location="home-hero"
                >
                  Schedule a demo
                </a>
                <Link className="btn btn-secondary" href="/adminops-pilot">
                  Get started free
                </Link>
              </div>
            </div>

            <div className="home-hero-visual" aria-hidden="true">
              <div className="visual-chat">Can I automate invoice approvals and monthly reporting?</div>
              <div className="visual-card">
                <strong>Automated workflow launched</strong>
                <p>Capture → Validate → Route → Approve → Report</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section home-section-dark">
          <div className="container">
            <h2>Go Beyond Reactive Operations</h2>
            <p className="home-section-subtitle">
              Layer automation, personalization, and governance across workflows so every process is faster, cleaner,
              and easier to control.
            </p>
            <div className="home-matrix">
              <article><h3>Proactive Workflow Triggers</h3><p>Start automation based on SLAs, bottlenecks, queue age, and exception signals.</p></article>
              <article><h3>Real-Time Sentiment Detection</h3><p>Prioritize urgent customer-facing requests and escalate when risk signals increase.</p></article>
              <article><h3>Adaptive Fallback Strategies</h3><p>When data is incomplete, agents ask for context or route to humans instead of failing silently.</p></article>
              <article><h3>User Journey Personalization</h3><p>Tailor handoffs and workflows by account type, role, and business priority.</p></article>
              <article><h3>Actionable Conversations</h3><p>Turn intake requests into structured actions in your systems while preserving controls.</p></article>
              <article><h3>Regulated Industry Compliance</h3><p>Use approval gates, masking, and audit logs for healthcare, finance, and sensitive operations.</p></article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Everything You Need for Ops Automation</h2>
            <div className="cta-row home-center-cta">
              <a
                className="btn btn-primary"
                href="https://www.cal.eu/sieg-kamgo/30min"
                target="_blank"
                rel="noreferrer"
                data-track="book-call"
                data-cta-location="home-capabilities"
              >
                Schedule a Demo
              </a>
              <Link className="btn btn-secondary" href="/adminops-pilot">Get Started Free</Link>
            </div>

            <div className="home-capabilities">
              <article className="card"><h3>No-Code AI Workflow Builder</h3><p>Build, train, and deploy AI automation without engineering complexity.</p></article>
              <article className="card"><h3>Multilingual Support in 95+ Languages</h3><p>Respond in each user’s language across distributed teams and markets.</p></article>
              <article className="card"><h3>Transparent Pricing Model</h3><p>Predictable packaging designed for SMB and mid-market operators.</p></article>
              <article className="card"><h3>Reliable Uptime & Failover</h3><p>Keep core operations available with resilient automation infrastructure.</p></article>
              <article className="card"><h3>Enterprise-Grade Security</h3><p>Data isolation, audit logs, and policy-based controls across every workflow.</p></article>
              <article className="card"><h3>Escalation from Agent to Human</h3><p>Give teams full context when handing off high-risk or ambiguous cases.</p></article>
              <article className="card"><h3>Actionable Analytics</h3><p>Track cycle time, exception rates, and throughput gains in one place.</p></article>
              <article className="card"><h3>White-Label & API Access</h3><p>Deploy under your own brand and integrate with existing tools quickly.</p></article>
            </div>
          </div>
        </section>

        <section className="section home-section-dark">
          <div className="container">
            <h2>How AdminOps Works in 60 Seconds</h2>
            <p className="home-section-subtitle">Watch a typical admin journey: request received → data validated → action completed → team notified.</p>

            <div className="home-process-grid">
              <div className="home-process-visual" aria-hidden="true">
                <div className="process-message">We were charged twice this month</div>
                <div className="process-reply">I can resolve this now and escalate billing if needed.</div>
                <div className="process-ticket">Ticket #234 · Submitted</div>
              </div>
              <div className="home-process-list">
                <article className="active"><h3>Full Context Awareness</h3><p>Uses conversation history, site context, and CRM data for relevant responses.</p></article>
                <article><h3>Automated Actions</h3><p>Triggers workflows such as status updates, escalations, and resolution checks.</p></article>
                <article><h3>Brand Voice Control</h3><p>Maintains approved language and response quality standards.</p></article>
                <article><h3>Intelligent Handoff</h3><p>Escalates to humans with complete context and recommended next steps.</p></article>
                <article><h3>Performance Insights</h3><p>Measures response speed, resolution quality, and workflow completion rates.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Trusted by Growing Teams</h2>
            <p className="home-section-subtitle">Real outcomes from teams replacing manual admin workflows with AdminOps.</p>
            <div className="home-testimonials">
              <article className="card"><h3>Seamless Across Channels</h3><p>AdminOps outperformed our previous setup with simpler no-code deployment and faster response loops.</p><span>Head of Operations · Oct 25, 2025</span></article>
              <article className="card"><h3>Funnels Clients Pro-Level</h3><p>It answers edge-case questions and hands off high-intent leads to our sales team with context.</p><span>CEO, OfferMarket · Oct 18, 2025</span></article>
              <article className="card"><h3>78% Ticket Reduction</h3><p>We moved from legacy chat and cut ticket volume dramatically in the first month.</p><span>Head of Support · Oct 28, 2025</span></article>
              <article className="card"><h3>Overpowered & Optimized</h3><p>Our Stripe and CRM workflows are now automated without losing control.</p><span>Founder · Oct 20, 2025</span></article>
              <article className="card"><h3>Evolved Beyond Chatbot</h3><p>We gained deeper control over training data, actions, and escalation quality.</p><span>Operations Lead · Nov 1, 2025</span></article>
              <article className="card"><h3>Cleaner Reporting, Less Rework</h3><p>Monthly close runs faster because reconciliations and exceptions are handled earlier.</p><span>Finance Manager · Oct 30, 2025</span></article>
            </div>
          </div>
        </section>

        <section className="section home-section-dark">
          <div className="container home-faq-wrap">
            <h2>Frequently Asked Questions</h2>
            <p className="home-section-subtitle">Clear answers to common questions about AdminOps.</p>
            <div className="home-faq-list">
              <details open>
                <summary>Is AdminOps a workflow automation platform or a chatbot?</summary>
                <p>AdminOps is an AI operations platform that handles repetitive admin workflows with approval controls and reporting.</p>
              </details>
              <details>
                <summary>How does it learn from our systems?</summary>
                <p>It uses controlled connectors, workflow rules, and approved context from your existing tools.</p>
              </details>
              <details>
                <summary>Can it integrate with help desk and shared inbox tools?</summary>
                <p>Yes. AdminOps can integrate with support inboxes and your core systems to route and resolve requests faster.</p>
              </details>
              <details>
                <summary>Does it capture leads as well as support requests?</summary>
                <p>Yes. It can capture high-intent interactions and pass structured context to your team.</p>
              </details>
              <details>
                <summary>How fast can we launch?</summary>
                <p>Most teams launch an initial workflow in about 30 days with measurable KPI movement.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container home-final-cta">
            <div>
              <span className="home-pill">Built-in Integrations</span>
              <h2>Turn leads into outcomes and drive revenue</h2>
              <p>Join operations teams using AdminOps to reduce admin cost and improve execution speed.</p>
              <div className="cta-row">
                <Link className="btn btn-primary" href="/adminops-pilot">Get Started Free</Link>
                <a
                  className="btn btn-secondary"
                  href="https://www.cal.eu/sieg-kamgo/30min"
                  target="_blank"
                  rel="noreferrer"
                  data-track="book-call"
                  data-cta-location="home-final-cta"
                >
                  Schedule a Demo
                </a>
              </div>
            </div>
            <div className="home-integrations-grid" aria-hidden="true">
              <span>Shopify</span>
              <span>Teams</span>
              <span>Messenger</span>
              <span>Instagram</span>
              <span>Meet</span>
              <span>Calendar</span>
              <span>Stripe</span>
              <span>CRM</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
