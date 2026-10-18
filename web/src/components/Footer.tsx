import { BRAND, CONTACT, NAV } from '../content/site'
import { Mark } from './Icon'

const YEAR = new Date().getFullYear()

export function Footer() {
  const legal = CONTACT.legal.filter((l) => l.href)
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <a className="wordmark" href="#inicio">
            <Mark />
            <span>{BRAND.name}</span>
          </a>
          <p>{BRAND.descriptor}</p>
          <p className="footer-purpose">{BRAND.purpose}</p>
        </div>
        <nav aria-label="Pie de página">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-meta">
          {CONTACT.email && (
            <p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          )}
          {legal.length === 0 && <p className="footer-pending">Aviso legal, privacidad y cookies: pendientes de publicar.</p>}
          {legal.length > 0 && (
            <ul>
              {legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href!}>{l.label}</a>
                </li>
              ))}
            </ul>
          )}
          <p>
            © {YEAR} {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
