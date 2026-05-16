import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { MODULES, getModule } from '@/lib/modules'

// One static page per module, generated from lib/modules.ts.
export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.id }))
}

export function generateMetadata({
  params,
}: {
  params: { module: string }
}): Metadata {
  const m = getModule(params.module)
  if (!m) return { title: 'Module not found | orenva' }
  return {
    title: `${m.title} | orenva`,
    description: m.summary,
    openGraph: {
      title: `${m.title} — orenva`,
      description: m.tagline,
      type: 'website',
    },
  }
}

export default function ModulePage({ params }: { params: { module: string } }) {
  const m = getModule(params.module)
  if (!m) notFound()

  const related = m.connectsTo
    .map((id) => getModule(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <>
      <div className="site-bg" aria-hidden="true"></div>
      <div className="site-grid" aria-hidden="true"></div>

      <SiteHeader active="ecosystem" />

      <main id="main">
        <section className="section-shell content-section page-hero">
          <div className="page-hero-copy" data-reveal>
            <p className="eyebrow-pill">{m.label}</p>
            <h1>{m.title}</h1>
            <p>{m.summary}</p>
            <div className="hero-actions">
              <a className="button-primary" href="/#cta">
                Join the waitlist
              </a>
              <a className="button-secondary" href="/ecosystem">
                All six modules
              </a>
            </div>
          </div>
        </section>

        <section className="section-shell content-section">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">What it does</p>
            <h2>{m.tagline}</h2>
          </div>
          <article className="glass-card large-copy-card" data-reveal>
            <ul className="module-capabilities">
              {m.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section-shell content-section">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Works with</p>
            <h2>It does not work alone.</h2>
            <p>
              {m.title} shares one health context with the rest of orenva. It hands off most
              naturally to these:
            </p>
          </div>
          <div className="card-grid three-up">
            {related.map((r, i) => (
              <a
                key={r.id}
                href={`/ecosystem/${r.id}`}
                className="glass-card module-card"
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="module-line"></span>
                <p className="module-tag">{r.label}</p>
                <h3>{r.title}</h3>
                <p>{r.tagline}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="section-shell content-section">
          <article className="glass-card large-copy-card" data-reveal>
            <p className="section-kicker">Get started</p>
            <h2>One platform, the whole picture.</h2>
            <p>
              {m.title} is one module of orenva — and it is strongest as part of the whole. Join the
              waitlist for early access to the unified platform.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="/#cta">
                Join the waitlist
              </a>
              <a className="button-secondary" href="/ecosystem">
                Explore the ecosystem
              </a>
            </div>
          </article>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
