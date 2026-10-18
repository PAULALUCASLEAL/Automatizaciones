import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { BEFORE_AFTER, BRAND, DEMOS } from '../content/site'
import { Icon } from './Icon'

interface DemoStep {
  tab: string
  caption: string
  pane: ReactNode
}

/** Pestañas accesibles: flechas para moverse, panel asociado. */
function Demo({ title, summary, steps }: { title: string; summary: string; steps: DemoStep[] }) {
  const [active, setActive] = useState(0)
  const base = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + steps.length) % steps.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <article className="demo">
      <header className="demo-head">
        <h3>{title}</h3>
        <p>{summary}</p>
      </header>
      <div className="demo-tabs" role="tablist" aria-label={`Pasos: ${title}`} onKeyDown={onKey}>
        {steps.map((s, i) => (
          <button
            key={s.tab}
            ref={(el) => {
              tabs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel`}
            tabIndex={active === i ? 0 : -1}
            className="demo-tab"
            onClick={() => setActive(i)}
          >
            <span className="demo-tab-node" aria-hidden="true">
              {i < active ? <Icon name="check" size={14} /> : i + 1}
            </span>
            <span>{s.tab}</span>
          </button>
        ))}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="demo-stage">
        <p className="demo-tag">{DEMOS.label} · datos ficticios</p>
        <div className="demo-track" data-active={active}>
          {steps.map((s, i) => (
            <div key={s.tab} className="demo-pane" data-state={i === active ? 'active' : i < active ? 'past' : 'future'} aria-hidden={i !== active}>
              {s.pane}
            </div>
          ))}
        </div>
        <p className="demo-caption" key={active}>
          {steps[active].caption}
        </p>
      </div>
    </article>
  )
}

function Field({ k, v, flag }: { k: string; v: string; flag?: boolean }) {
  return (
    <div className={flag ? 'rec-field is-flag' : 'rec-field'}>
      <dt>{k}</dt>
      <dd>
        {v}
        {flag && <Icon name="alert" size={15} />}
      </dd>
    </div>
  )
}

const orderSteps: DemoStep[] = [
  {
    tab: 'Llega el correo',
    caption: 'Un cliente habitual envía su pedido de la semana en un correo normal, sin plantilla.',
    pane: (
      <div className="doc doc-mail">
        <div className="doc-bar">
          <Icon name="mail" size={16} />
          <span>Bandeja de pedidos</span>
        </div>
        <dl className="mail-meta">
          <div>
            <dt>De</dt>
            <dd>Compras · Ferretería Ejemplo</dd>
          </div>
          <div>
            <dt>Asunto</dt>
            <dd>Pedido semana 43</dd>
          </div>
        </dl>
        <p>Hola, os pasamos el pedido de esta semana:</p>
        <p className="mail-lines">
          24 × Cinta de embalar 48 mm
          <br />
          10 × Caja de cartón 40×30
          <br />6 × Rollo de film estirable
        </p>
        <p>Entrega en el almacén de siempre. Gracias, Marta.</p>
      </div>
    ),
  },
  {
    tab: 'Se ordenan los datos',
    caption: 'Se leen cliente, referencias y cantidades, y se comprueban contra la ficha del cliente.',
    pane: (
      <div className="doc doc-record">
        <div className="doc-bar">
          <Icon name="document" size={16} />
          <span>Pedido en preparación</span>
        </div>
        <dl className="rec-fields">
          <Field k="Cliente" v="Ferretería Ejemplo" />
          <Field k="Líneas" v="3 referencias · 40 unidades" />
          <Field k="Precios" v="Tarifa del cliente aplicada" />
          <Field k="Entrega" v="«El almacén de siempre»" flag />
        </dl>
      </div>
    ),
  },
  {
    tab: 'Listo para revisar',
    caption: 'El pedido queda registrado como borrador. Solo la dirección necesita que alguien la confirme.',
    pane: (
      <div className="doc doc-review">
        <div className="doc-bar">
          <Icon name="check" size={16} />
          <span>Registro en gestión</span>
        </div>
        <p className="review-status">Borrador creado · pendiente de una revisión</p>
        <div className="review-flag">
          <Icon name="alert" size={18} />
          <p>
            <strong>Confirmar dirección de entrega.</strong> El cliente tiene dos almacenes dados de alta.
          </p>
        </div>
        <p className="review-note">La persona responsable lo revisa, elige el almacén y el pedido sigue su curso.</p>
      </div>
    ),
  },
]

const reportSteps: DemoStep[] = [
  {
    tab: 'Fuentes dispersas',
    caption: 'Cada lunes, los datos están repartidos en tres sitios distintos.',
    pane: (
      <ul className="sources">
        <li>
          <Icon name="shop" size={18} />
          <div>
            <p className="src-name">Tienda online</p>
            <p className="src-val">128 pedidos</p>
          </div>
        </li>
        <li>
          <Icon name="document" size={18} />
          <div>
            <p className="src-name">Facturación</p>
            <p className="src-val">23.480 € facturados</p>
          </div>
        </li>
        <li>
          <Icon name="sheet" size={18} />
          <div>
            <p className="src-name">Hoja de stock</p>
            <p className="src-val">412 referencias</p>
          </div>
        </li>
      </ul>
    ),
  },
  {
    tab: 'Se reúnen y cruzan',
    caption: 'Las tres fuentes se juntan con los mismos criterios cada semana.',
    pane: (
      <div className="doc">
        <div className="doc-bar">
          <Icon name="sheet" size={16} />
          <span>Datos de la semana 43</span>
        </div>
        <table className="mini-table">
          <thead>
            <tr>
              <th scope="col">Indicador</th>
              <th scope="col">Semana 42</th>
              <th scope="col">Semana 43</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Pedidos</th>
              <td>117</td>
              <td>128</td>
            </tr>
            <tr>
              <th scope="row">Facturado</th>
              <td>21.950 €</td>
              <td>23.480 €</td>
            </tr>
            <tr>
              <th scope="row">Pendientes de envío</th>
              <td>6</td>
              <td>14</td>
            </tr>
            <tr>
              <th scope="row">Bajo stock mínimo</th>
              <td>1</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    tab: 'Informe y aviso',
    caption: 'El informe está listo el lunes a primera hora y señala lo que conviene mirar.',
    pane: (
      <div className="doc doc-report">
        <div className="doc-bar">
          <Icon name="chart" size={16} />
          <span>Informe semanal</span>
        </div>
        <dl className="report-rows">
          <div>
            <dt>Pedidos</dt>
            <dd>128</dd>
          </div>
          <div>
            <dt>Facturado</dt>
            <dd>23.480 €</dd>
          </div>
          <div>
            <dt>Pendientes de envío</dt>
            <dd>14</dd>
          </div>
        </dl>
        <div className="review-flag">
          <Icon name="alert" size={18} />
          <p>
            <strong>Requiere atención:</strong> 3 referencias bajo mínimo tienen pedidos pendientes.
          </p>
        </div>
      </div>
    ),
  },
]

export function Demos() {
  return (
    <section className="section demos" id="demostraciones" aria-labelledby="demos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="demos-title">{DEMOS.title}</h2>
          <p className="lead">{DEMOS.intro}</p>
        </div>
        <div className="demo-grid">
          <Demo
            title="Un pedido por correo se convierte en un registro listo para revisar"
            summary="Del texto libre de un correo a un pedido ordenado, con la única duda señalada."
            steps={orderSteps}
          />
          <Demo
            title="La información dispersa se convierte en un informe"
            summary="Tres fuentes, un mismo informe cada semana y un aviso cuando algo lo pide."
            steps={reportSteps}
          />
        </div>
      </div>
    </section>
  )
}

export function BeforeAfter() {
  const [mode, setMode] = useState<'before' | 'after'>('before')
  const after = mode === 'after'
  return (
    <section className="section ba" aria-labelledby="ba-title">
      <div className="wrap">
        <div className="section-head ba-head">
          <div>
            <h2 id="ba-title">{BEFORE_AFTER.title}</h2>
            <p className="lead">{BEFORE_AFTER.intro}</p>
          </div>
          <div className="segmented" role="group" aria-label="Comparar">
            <span className="seg-thumb" data-pos={mode} aria-hidden="true" />
            <button type="button" aria-pressed={!after} onClick={() => setMode('before')}>
              Antes
            </button>
            <button type="button" aria-pressed={after} onClick={() => setMode('after')}>
              Con {BRAND.name}
            </button>
          </div>
        </div>
        <ol className={`ba-route is-${mode}`} aria-live="polite">
          {BEFORE_AFTER.steps.map((s, i) => (
            <li key={s.step}>
              <span className="ba-node" aria-hidden="true">
                {after ? <Icon name="check" size={16} /> : i + 1}
              </span>
              <div>
                <h3>{s.step}</h3>
                <p key={mode} className="ba-text">
                  {after ? s.after : s.before}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
