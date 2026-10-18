import { useId, useState } from 'react'
import { ABOUT, FAQ, FOUNDER, PROCESS, RECOGNITION, SERVICES, VALUE } from '../content/site'
import { Icon } from './Icon'

export function Recognition() {
  return (
    <section className="section recognition" aria-labelledby="rec-title">
      <div className="wrap rec-grid">
        <div className="rec-head">
          <h2 id="rec-title">{RECOGNITION.title}</h2>
          <p className="lead">{RECOGNITION.intro}</p>
        </div>
        <div>
          <ul className="rec-list">
            {RECOGNITION.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="rec-close">{RECOGNITION.close}</p>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section className="section services" id="soluciones" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="svc-title">{SERVICES.title}</h2>
          <p className="lead">{SERVICES.intro}</p>
        </div>
        <ol className="svc-list">
          {SERVICES.areas.map((a) => (
            <li key={a.id} className="svc-row">
              <h3>{a.name}</h3>
              <dl>
                <div>
                  <dt>Cuando</dt>
                  <dd>{a.trigger}</dd>
                </div>
                <div>
                  <dt>Qué hacemos</dt>
                  <dd>{a.does}</dd>
                </div>
                <div>
                  <dt>Qué ganáis</dt>
                  <dd>{a.benefit}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  max: number
  suffix: string
}) {
  const id = useId()
  return (
    <div className="num-field">
      <label htmlFor={id}>{label}</label>
      <div className="num-input">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
        <span aria-hidden="true">{suffix}</span>
      </div>
    </div>
  )
}

function Estimator() {
  const [volume, setVolume] = useState(600)
  const [before, setBefore] = useState(5)
  const [after, setAfter] = useState(1)
  const valid = [volume, before, after].every((n) => Number.isFinite(n) && n >= 0)
  const saved = valid ? Math.max(0, before - after) : 0
  const hours = valid ? (volume * saved) / 60 : 0
  const fmt = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })
  const problem = !valid ? 'Introduce números iguales o mayores que cero.' : after > before ? 'El tiempo después debería ser menor que el de ahora.' : null

  return (
    <div className="estimator">
      <h3>{VALUE.estimator.title}</h3>
      <p>{VALUE.estimator.text}</p>
      <div className="est-fields">
        <NumberField label="Operaciones al mes" value={volume} onChange={setVolume} min={0} max={100000} suffix="uds." />
        <NumberField label="Minutos por operación hoy" value={before} onChange={setBefore} min={0} max={600} suffix="min" />
        <NumberField label="Minutos con la mejora" value={after} onChange={setAfter} min={0} max={600} suffix="min" />
      </div>
      <div className="est-result" aria-live="polite">
        {problem ? (
          <p className="est-problem">
            <Icon name="alert" size={18} />
            {problem}
          </p>
        ) : (
          <>
            <p className="est-number">
              <span>{fmt.format(hours)}</span> horas al mes
            </p>
            <p className="est-formula">
              {fmt.format(volume)} operaciones × {fmt.format(saved)} min ÷ 60 = {fmt.format(hours)} h de capacidad estimada
            </p>
          </>
        )}
      </div>
      <p className="est-note">{VALUE.estimator.note}</p>
    </div>
  )
}

export function Value() {
  return (
    <section className="section value" aria-labelledby="val-title">
      <div className="wrap val-grid">
        <div>
          <h2 id="val-title">{VALUE.title}</h2>
          <ul className="val-list">
            {VALUE.items.map((i) => (
              <li key={i.title}>
                <Icon name="check" size={20} />
                <div>
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Estimator />
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="section process" id="como-trabajamos" aria-labelledby="proc-title">
      <div className="wrap proc-grid">
        <div className="proc-head">
          <h2 id="proc-title">{PROCESS.title}</h2>
          <p className="lead">{PROCESS.intro}</p>
        </div>
        <ol className="proc-steps">
          {PROCESS.steps.map((s, i) => (
            <li key={s.title}>
              <span className="proc-node" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function About() {
  const hasFounder = Boolean(FOUNDER.name)
  return (
    <section className="section about" id="sobre" aria-labelledby="about-title">
      <div className={`wrap about-grid${FOUNDER.photo ? ' has-photo' : ''}`}>
        {FOUNDER.photo && (
          <img className="about-photo" src={FOUNDER.photo} alt={FOUNDER.photoAlt} width={480} height={600} loading="lazy" />
        )}
        <div className="about-copy">
          <h2 id="about-title">{ABOUT.title}</h2>
          {ABOUT.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {hasFounder && (
            <div className="about-founder">
              <p className="about-name">{FOUNDER.name}</p>
              {FOUNDER.role && <p className="about-role">{FOUNDER.role}</p>}
              {FOUNDER.credentials.length > 0 && (
                <ul>
                  {FOUNDER.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <ul className="about-principles">
          {ABOUT.principles.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <h2 id="faq-title">{FAQ.title}</h2>
        <div className="faq-list">
          {FAQ.items.map((f) => (
            <details key={f.q}>
              <summary>
                <span>{f.q}</span>
                <Icon name="plus" size={20} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
