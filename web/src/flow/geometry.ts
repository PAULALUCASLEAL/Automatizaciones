/**
 * Geometría genérica de los diagramas de acequias.
 * Cada escenario describe fuentes, puntos (partidores) y, si la tiene,
 * una rama de excepción; aquí se calculan las dos composiciones:
 * horizontal ('wide', 680×500) y vertical ('tall', 360×alto variable).
 */

export type LabelAnchor = 'above' | 'below' | 'right' | 'left'
export type IconKey = 'mail' | 'order' | 'document' | 'chat' | 'sheet' | 'form'

export interface FlowNode {
  id: string
  x: number
  y: number
  lines: string[]
  anchor: LabelAnchor
  exception?: boolean
}

export interface Source {
  label: string
  icon: IconKey
  x: number
  y: number
  w: number
}

export interface Slot {
  x: number
  y: number
  w: number
  h: number
}

export interface Layout {
  name: 'wide' | 'tall'
  width: number
  height: number
  sources: Source[]
  nodes: FlowNode[]
  segs: Record<string, string>
  branchSegs: string[]
  /** Compuerta: pequeña barra al inicio de la rama de excepción. */
  gate?: { x: number; y: number; vertical: boolean }
  slot: Slot
}

export interface ScenarioShape {
  sources: { label: string; icon: IconKey }[]
  /** Etiquetas de cada punto principal, en líneas para la versión horizontal. */
  main: string[][]
  branch?: {
    /** Índice del punto principal del que sale la rama. */
    from: number
    /** true: vuelve al cauce en el punto siguiente. false: termina en x2. */
    rejoin: boolean
    x1: string[]
    x2: string[]
    /** Etiquetas en la versión vertical (máx. ~24 caracteres por línea). */
    tallX1?: string[]
    tallX2?: string[]
  }
  wide: { sourceX: number[]; sourceW: number; slot: Slot }
  tall: { sourceX: number[]; sourceW: number; slotH: number }
}

export const NODE_SIZE = 44
const H = NODE_SIZE / 2

const MAIN_X: Record<number, number[]> = {
  4: [112, 278, 444, 610],
  5: [70, 205, 340, 475, 610],
}

export function buildWide(s: ScenarioShape): Layout {
  const y = 262
  const xs = MAIN_X[s.main.length]
  const nodes: FlowNode[] = s.main.map((lines, i) => ({ id: `n${i + 1}`, x: xs[i], y, lines, anchor: 'above' }))
  const segs: Record<string, string> = {}

  s.wide.sourceX.forEach((x, i) => {
    segs[`f${i}`] = `M ${x} 64 V 118 Q ${x} 140 ${x - 22} 140 H 36 Q 14 140 14 162 V ${y - 22} Q 14 ${y} 36 ${y} H ${xs[0] - H}`
  })
  for (let i = 0; i < xs.length - 1; i++) segs[`m${i + 1}`] = `M ${xs[i] + H} ${y} H ${xs[i + 1] - H}`

  const branchSegs: string[] = []
  let gate: Layout['gate']
  if (s.branch) {
    const a = xs[s.branch.from]
    const b = a + 135
    const by = 400
    nodes.push({ id: 'x1', x: a, y: by, lines: s.branch.x1, anchor: 'below', exception: true })
    nodes.push({ id: 'x2', x: b, y: by, lines: s.branch.x2, anchor: 'below', exception: true })
    segs.b1 = `M ${a} ${y + H} V ${by - H}`
    segs.b2 = `M ${a + H} ${by} H ${b - H}`
    branchSegs.push('b1', 'b2')
    if (s.branch.rejoin) {
      segs.b3 = `M ${b} ${by - H} V ${y + H}`
      branchSegs.push('b3')
    }
    gate = { x: a, y: y + H + 16, vertical: false }
  }

  return {
    name: 'wide',
    width: 680,
    height: 500,
    sources: s.sources.map((src, i) => ({ ...src, x: s.wide.sourceX[i], y: 46, w: s.wide.sourceW })),
    nodes,
    segs,
    branchSegs,
    gate,
    slot: s.wide.slot,
  }
}

export function buildTall(s: ScenarioShape): Layout {
  const X = 47
  const STEP = 90
  const ys: number[] = []
  let y = 170
  s.main.forEach((_, i) => {
    ys.push(y)
    y += s.branch && s.branch.from === i ? 260 : STEP
  })
  const nodes: FlowNode[] = s.main.map((lines, i) => ({ id: `n${i + 1}`, x: X, y: ys[i], lines: [lines.join(' ')], anchor: 'right' }))
  const segs: Record<string, string> = {}

  s.tall.sourceX.forEach((x, i) => {
    segs[`f${i}`] =
      Math.abs(x - X) < 4
        ? `M ${X} 58 V ${ys[0] - H}`
        : `M ${x} 58 V 82 Q ${x} 100 ${x - 18} 100 H ${X + 18} Q ${X} 100 ${X} 118 V ${ys[0] - H}`
  })
  for (let i = 0; i < ys.length - 1; i++) segs[`m${i + 1}`] = `M ${X} ${ys[i] + H} V ${ys[i + 1] - H}`

  const branchSegs: string[] = []
  let gate: Layout['gate']
  if (s.branch) {
    const ya = ys[s.branch.from]
    const BX = 300
    const y1 = ya + 95
    const y2 = ya + 180
    const turn = ya + 226
    nodes.push({ id: 'x1', x: BX, y: y1, lines: s.branch.tallX1 ?? [s.branch.x1.join(' ')], anchor: 'left', exception: true })
    nodes.push({ id: 'x2', x: BX, y: y2, lines: s.branch.tallX2 ?? [s.branch.x2.join(' ')], anchor: 'left', exception: true })
    segs.b1 = `M ${X} ${ya + H} V ${y1 - 18} Q ${X} ${y1} ${X + 18} ${y1} H ${BX - H}`
    segs.b2 = `M ${BX} ${y1 + H} V ${y2 - H}`
    branchSegs.push('b1', 'b2')
    if (s.branch.rejoin) {
      segs.b3 = `M ${BX} ${y2 + H} V ${turn - 12} Q ${BX} ${turn} ${BX - 12} ${turn} H ${X + 12} Q ${X} ${turn} ${X} ${turn + 12}`
      branchSegs.push('b3')
    }
    gate = { x: X + 40, y: y1, vertical: true }
  }

  const slotY = ys[ys.length - 1] + 52
  const slot = { x: 6, y: slotY, w: 348, h: s.tall.slotH }
  return {
    name: 'tall',
    width: 360,
    height: slotY + s.tall.slotH + 6,
    sources: s.sources.map((src, i) => ({ ...src, x: s.tall.sourceX[i], y: 40, w: s.tall.sourceW })),
    nodes,
    segs,
    branchSegs,
    gate,
    slot,
  }
}
