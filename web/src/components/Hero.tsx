import { AcequiaFlow } from '../flow/AcequiaFlow'
import { HERO } from '../content/site'
import { Icon } from './Icon'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">{HERO.title}</h1>
          <p className="hero-body">{HERO.body}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={HERO.primary.href}>
              {HERO.primary.label}
              <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn-ghost" href={HERO.secondary.href}>
              {HERO.secondary.label}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <AcequiaFlow />
        </div>
      </div>
    </section>
  )
}
