import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Icon } from '../components/Icon'
import { DEMOS } from '../content/site'
import { FlowEngine, STATUS_TEXT } from './engine'
import { NODE_SIZE, type FlowNode, type Layout } from './geometry'
import { SCENARIOS, type Scenario } from './scenarios'

/** La entrada larga solo se reproduce la primera vez que se ve el diagrama. */
let hasEntered = false

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

function NodeLabel({ node, size }: { node: FlowNode; size: number }) {
  const lh = size + 3
  const h = NODE_SIZE / 2
  const status = STATUS_TEXT.idle
  if (node.anchor === 'above') {
    const n = node.lines.length
    return (
      <g textAnchor="middle">
        {node.lines.map((l, i) => (
          <text key={l} className="fl-label" y={-h - 34 - (n - 1 - i) * lh} fontSize={size}>
            {l}
          </text>
        ))}
        <text className="fl-status" data-status y={-h - 14}>
          {status}
        </text>
      </g>
    )
  }
  if (node.anchor === 'below') {
    return (
      <g textAnchor="middle">
        {node.lines.map((l, i) => (
          <text key={l} className="fl-label" y={h + 20 + i * lh} fontSize={size}>
            {l}
          </text>
        ))}
        <text className="fl-status" data-status y={h + 20 + node.lines.length * lh + 2}>
          {status}
        </text>
      </g>
    )
  }
  if (node.anchor === 'left') {
    // Encima del canal que entra por la izquierda, alineado a la derecha.
    const n = node.lines.length
    return (
      <g textAnchor="end">
        {node.lines.map((l, i) => (
          <text key={l} className="fl-label" x={-h - 12} y={-30 - (n - 1 - i) * lh} fontSize={size}>
            {l}
          </text>
        ))}
        <text className="fl-status" data-status x={-h - 12} y={-12}>
          {status}
        </text>
      </g>
    )
  }
  return (
    <g textAnchor="start">
      <text className="fl-label" x={h + 15} y={-2} fontSize={size}>
        {node.lines.join(' ')}
      </text>
      <text className="fl-status" data-status x={h + 15} y={16}>
        {status}
      </text>
    </g>
  )
}

function Diagram({ layout }: { layout: Layout }) {
  const labelSize = layout.name === 'wide' ? 14 : 15
  const s = NODE_SIZE / 2
  const ids = Object.keys(layout.segs)
  const isBranch = (id: string) => layout.branchSegs.includes(id)
  return (
    <>
      <g className="fl-channels">
        {ids.map((id) => (
          <g key={id} className={isBranch(id) ? 'fl-ch is-branch' : 'fl-ch'}>
            <path className="fl-bed" d={layout.segs[id]} />
            <path className="fl-floor" d={layout.segs[id]} />
          </g>
        ))}
      </g>
      <g data-water-layer>
        {ids.map((id) => (
          <path key={id} className="fl-water" data-water={id} d={layout.segs[id]} style={{ strokeDasharray: '0 9999' }} />
        ))}
      </g>
      <g>
        {ids.map((id) => (
          <path key={id} className="fl-pulse" data-pulse={id} d={layout.segs[id]} />
        ))}
      </g>
      {layout.gate && (
        <g className="fl-gate" data-gate data-closed="false" transform={`translate(${layout.gate.x} ${layout.gate.y})${layout.gate.vertical ? ' rotate(90)' : ''}`}>
          <rect className="fl-gate-post" x={-12} y={-3} width={4} height={6} rx={1} />
          <rect className="fl-gate-post" x={8} y={-3} width={4} height={6} rx={1} />
          <rect className="fl-gate-bar" x={-9} y={-2} width={18} height={4} rx={1.5} />
        </g>
      )}

      {layout.sources.map((src, i) => (
        <g key={src.label} className="fl-source" data-source={i} data-active="false" transform={`translate(${src.x} ${src.y})`}>
          <rect x={-src.w / 2} y={-18} width={src.w} height={36} rx={8} />
          {layout.name === 'wide' ? (
            <>
              <g transform={`translate(${-src.w / 2 + 12} -9)`}>
                <Icon name={src.icon} size={18} />
              </g>
              <text x={-src.w / 2 + 37} y={5} className="fl-src-label">
                {src.label}
              </text>
            </>
          ) : (
            <text y={5} textAnchor="middle" className="fl-src-label">
              {src.label}
            </text>
          )}
        </g>
      ))}

      {layout.nodes.map((n) => (
        <g key={n.id} className={n.exception ? 'fl-node is-exception' : 'fl-node'} data-node={n.id} data-state="idle" transform={`translate(${n.x} ${n.y})`}>
          <rect className="fl-shape" x={-s} y={-s} width={NODE_SIZE} height={NODE_SIZE} rx={5} />
          <rect className="fl-dot" x={-4} y={-4} width={8} height={8} rx={1.5} />
          <path className="fl-check" d="M -8 0.5 L -2.5 6 L 8.5 -5.5" />
          <path className="fl-alert" d="M 0 -8 V 2 M 0 7 V 7.2" />
          <NodeLabel node={n} size={labelSize} />
        </g>
      ))}
      <rect data-clock width="0" height="0" fill="none" />
    </>
  )
}

function Stage({ scenario, layout, reduced, userPaused, onStatus, replayKey }: {
  scenario: Scenario
  layout: Layout
  reduced: boolean
  userPaused: boolean
  onStatus: (s: 'running' | 'done') => void
  replayKey: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const engineRef = useRef<FlowEngine | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const engine = new FlowEngine(root, scenario.script, onStatus)
    engineRef.current = engine
    if (reduced) {
      engine.applyStatic(scenario.staticExtra)
      onStatus('done')
      return () => engine.stop()
    }
    const io = new IntersectionObserver(([e]) => engine.setPaused('offscreen', !e.isIntersecting), { threshold: 0.1 })
    io.observe(root)
    const onVis = () => engine.setPaused('hidden', document.hidden)
    document.addEventListener('visibilitychange', onVis)
    onVis()
    engine.start(!hasEntered)
    hasEntered = true
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      engine.stop()
      engineRef.current = null
    }
    // onStatus es estable (setState); replayKey reinicia la secuencia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, layout, reduced, replayKey])

  useEffect(() => {
    engineRef.current?.setPaused('user', userPaused)
  }, [userPaused, scenario, layout, replayKey])

  const { slot } = layout
  const pct = (v: number, of: number) => `${(v / of) * 100}%`
  const panelStyle: CSSProperties = {
    left: pct(slot.x, layout.width),
    top: pct(slot.y, layout.height),
    width: pct(slot.w, layout.width),
    height: pct(slot.h, layout.height),
  }

  return (
    <div ref={ref} className={`flow-stage is-${layout.name}`} style={{ '--vbw': layout.width } as CSSProperties}>
      <svg className="flow-svg" viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-labelledby={`fl-t-${scenario.id} fl-d-${scenario.id}`}>
        <title id={`fl-t-${scenario.id}`}>{scenario.title}</title>
        <desc id={`fl-d-${scenario.id}`}>{scenario.desc}</desc>
        <Diagram layout={layout} />
      </svg>
      <div className={`flow-panel fp-${scenario.id}`} style={panelStyle} aria-hidden="true">
        <scenario.Panel />
      </div>
    </div>
  )
}

export function AcequiaFlow() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = usePrefersReducedMotion()
  const [layoutName, setLayoutName] = useState<'wide' | 'tall'>('wide')
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [status, setStatus] = useState<'running' | 'done'>('running')
  const [replayKey, setReplayKey] = useState(0)
  const scenario = SCENARIOS[index]
  const layout = scenario[layoutName]

  // La composición depende del ancho real disponible, no del viewport.
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setLayoutName(entry.contentRect.width >= 540 ? 'wide' : 'tall'))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const select = (i: number) => {
    if (i === index) return
    setUserPaused(false)
    setIndex(i)
  }

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next: number | null = null
    if (e.key in keys) next = (index + keys[e.key] + SCENARIOS.length) % SCENARIOS.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = SCENARIOS.length - 1
    if (next === null) return
    e.preventDefault()
    select(next)
    tabsRef.current[next]?.focus()
  }

  const replay = () => {
    setUserPaused(false)
    setReplayKey((k) => k + 1)
  }

  return (
    <figure className="flow" ref={wrapRef}>
      <div className="flow-tabs" role="tablist" aria-label="Escenarios de ejemplo" onKeyDown={onKey}>
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabsRef.current[i] = el
            }}
            type="button"
            role="tab"
            id={`flow-tab-${s.id}`}
            aria-selected={i === index}
            aria-controls="flow-panel"
            tabIndex={i === index ? 0 : -1}
            className="flow-tab"
            onClick={() => select(i)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${scenario.id}`}>
        <Stage
          key={`${scenario.id}-${layoutName}`}
          scenario={scenario}
          layout={layout}
          reduced={reduced}
          userPaused={userPaused}
          onStatus={setStatus}
          replayKey={replayKey}
        />
        <figcaption className="flow-caption">
          <p className="flow-support">{scenario.support}</p>
          <div className="flow-meta">
            <span className="flow-label">{DEMOS.label} · datos ficticios</span>
            {!reduced && (
              <span className="flow-controls">
                {status === 'running' && (
                  <button type="button" className="icon-btn" onClick={() => setUserPaused((p) => !p)}>
                    <Icon name={userPaused ? 'play' : 'pause'} size={16} />
                    <span>{userPaused ? 'Reanudar' : 'Pausar'}</span>
                  </button>
                )}
                <button type="button" className="icon-btn" onClick={replay}>
                  <Icon name="replay" size={16} />
                  <span>Repetir animación</span>
                </button>
              </span>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}
