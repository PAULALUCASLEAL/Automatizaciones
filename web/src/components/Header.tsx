import { useEffect, useRef, useState } from 'react'
import { BRAND, NAV } from '../content/site'
import { Icon, Mark } from './Icon'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape cierra el menú y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 900px)')
    const onMq = () => mq.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    panelRef.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap header-inner">
        <a className="wordmark" href="#inicio" aria-label={`${BRAND.name}, inicio`}>
          <Mark />
          <span>{BRAND.name}</span>
        </a>

        <nav className="nav-desktop" aria-label="Principal">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary btn-sm header-cta" href="#contacto">
          Hablemos
        </a>

        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
          <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>
      </div>

      <div id="menu-movil" ref={panelRef} className="menu-panel" hidden={!open}>
        <nav aria-label="Principal (móvil)" className="wrap">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                  <Icon name="arrow" size={18} />
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary menu-cta" href="#contacto" onClick={() => setOpen(false)}>
            Hablemos
          </a>
        </nav>
      </div>
    </header>
  )
}
