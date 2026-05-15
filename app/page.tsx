import HeroScene from '@/components/HeroScene'

export default function Home() {
  return (
    <>
      <div className="site-bg" aria-hidden="true"></div>
      <div className="site-grid" aria-hidden="true"></div>

      <HeroScene />

      <header className="site-header">
        <a className="brand" href="/" aria-label="orenva home">
          <span className="brand-mark">
            <img className="brand-logo" src="/orenva-logo.png" alt="orenva logo" />
          </span>
          <span className="brand-copy">
            <strong>orenva</strong>
            <span>One place. Every solution</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          data-menu-toggle
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
        </button>

        <nav className="site-nav" data-menu>
          <a href="#hero">Home</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="/about">About</a>
          <a href="/team">Team</a>
          <a href="/for-you">For You</a>
          <a href="/connect">Connect</a>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          data-theme-toggle
          aria-label="Toggle dark mode"
          aria-pressed="false"
        >
          <span className="theme-toggle-orb"></span>
          <span className="theme-toggle-text">Dark mode</span>
        </button>

        <div className="header-links desktop-only">
          <a className="mini-link" href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
            App Store
          </a>
          <a className="mini-link" href="https://play.google.com/store" target="_blank" rel="noreferrer">
            Play Store
          </a>
        </div>
      </header>

      <main>
        <section className="hero section-shell" id="hero">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow-pill">Activating the future of healthcare</p>
            <h1>
              One intelligent ecosystem for
              <span>consultation, care, and wellness.</span>
            </h1>
            <p className="hero-text">
              orenva unifies AI doctor consultation, pharmacy ordering, diet and fitness coaching, therapy support,
              insurance intelligence, and supplements into one premium health-tech platform.
            </p>

            <div className="hero-actions">
              <button className="button-primary" type="button" data-activate>
                Activate orenva
              </button>
              <a className="button-secondary" href="#ecosystem">
                Explore ecosystem
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-column footer-brand-column">
          <a className="footer-brand-lockup" href="/" aria-label="orenva home">
            <span className="brand-mark footer-mark">
              <img className="brand-logo" src="/orenva-logo.png" alt="orenva logo" />
            </span>
            <div>
              <p className="footer-brand">orenva</p>
              <p className="footer-copy">One place. Every solution</p>
            </div>
          </a>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Solutions</p>
          <div className="footer-links footer-stack">
            <a href="/#ecosystem">AI Doctor</a>
            <a href="/#ecosystem">Pharmacy</a>
            <a href="/#ecosystem">Diet & Fitness</a>
            <a href="/#ecosystem">Therapy & Mental Health</a>
            <a href="/#ecosystem">Insurance</a>
            <a href="/#ecosystem">Supplements & Store</a>
          </div>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Get in touch</p>
          <div className="footer-contact">
            <a href="mailto:orenva.health@gmail.com">orenva.health@gmail.com</a>
            <a href="tel:+491745199723">+49-1745199723</a>
            <a href="tel:+918830224353">+91-8830224353</a>
          </div>
        </div>
      </footer>
    </>
  )
}
