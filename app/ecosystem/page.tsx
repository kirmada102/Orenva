import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { MODULES } from '@/lib/modules'

export const metadata: Metadata = {
  title: 'Ecosystem | orenva',
  description:
    'The six modules of orenva — AI consultation, pharmacy, diet & fitness, therapy, insurance, and a wellness marketplace — working as one intelligent healthcare system.',
  openGraph: {
    title: 'The orenva ecosystem',
    description: 'Six modules, one shared health context.',
    type: 'website',
  },
}

export default function EcosystemPage() {
  return (
    <>
      <div className="site-bg" aria-hidden="true"></div>
      <div className="site-grid" aria-hidden="true"></div>

      <SiteHeader active="ecosystem" />

      <main id="main">
        <section className="section-shell content-section page-hero">
          <div className="page-hero-copy" data-reveal>
            <p className="eyebrow-pill">The ecosystem</p>
            <h1>Six modules. One health context.</h1>
            <p>
              orenva is not six apps behind a shared login. It is one intelligent system —
              consultation, pharmacy, lifestyle, therapy, insurance, and wellness commerce — where
              every module reads from the same understanding of you.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="/#cta">
                Join the waitlist
              </a>
              <a className="button-secondary" href="/for-you">
                See what it means for you
              </a>
            </div>
          </div>
        </section>

        {/* Quick index — jump to any module */}
        <section className="section-shell" data-reveal>
          <nav aria-label="Modules" className="module-index">
            {MODULES.map((m) => (
              <a key={m.id} href={`#${m.id}`} className="module-index__link">
                {m.title}
              </a>
            ))}
          </nav>
        </section>

        {/* One panel per module */}
        {MODULES.map((m, i) => (
          <section key={m.id} id={m.id} className="section-shell content-section">
            <article
              className="glass-card large-copy-card"
              data-reveal
              style={{ '--reveal-delay': `${(i % 2) * 80}ms` } as React.CSSProperties}
            >
              <p className="section-kicker">{`0${i + 1} · ${m.label}`}</p>
              <h2>{m.title}</h2>
              <p>{m.summary}</p>
              <ul className="module-capabilities">
                {m.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="hero-actions">
                <a className="button-secondary" href={`/ecosystem/${m.id}`}>
                  Explore {m.title}
                </a>
              </div>
            </article>
          </section>
        ))}

        <section className="section-shell content-section">
          <article className="glass-card large-copy-card" data-reveal>
            <p className="section-kicker">One system</p>
            <h2>The point is not the modules. It is the thread between them.</h2>
            <p>
              Any one of these exists elsewhere as a standalone app. What does not exist elsewhere
              is the connective tissue — a single health context every module reads from, so care
              stops restarting every time you move between services.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="/#cta">
                Join the waitlist
              </a>
              <a className="button-secondary" href="/about">
                Why we are building this
              </a>
            </div>
          </article>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
