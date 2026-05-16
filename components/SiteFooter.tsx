import Image from 'next/image'

// Shared site footer.

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-column footer-brand-column">
        <a className="footer-brand-lockup" href="/" aria-label="orenva home">
          <span className="brand-mark footer-mark">
            <Image className="brand-logo" src="/orenva-logo.png" alt="orenva logo" fill sizes="48px" />
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
          <a href="/ecosystem/ai-doctor">AI Doctor</a>
          <a href="/ecosystem/pharmacy">Pharmacy</a>
          <a href="/ecosystem/diet-fitness">Diet &amp; Fitness</a>
          <a href="/ecosystem/therapy">Therapy &amp; Mental Health</a>
          <a href="/ecosystem/insurance">Insurance</a>
          <a href="/ecosystem/store">Supplements &amp; Store</a>
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
  )
}
