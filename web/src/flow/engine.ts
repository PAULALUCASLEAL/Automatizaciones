/**
 * Coreografía de los diagramas. Interpreta un guion de operaciones sobre
 * el SVG y su ficha de detalle con la Web Animations API: React no se
 * vuelve a renderizar por fotograma. Las esperas también son animaciones,
 * así que pausar = pausar el conjunto.
 */

export type NodeState = 'idle' | 'next' | 'active' | 'done' | 'held' | 'review' | 'reviewed'

export type Op =
  | { t: 'src'; i: number; on: boolean }
  | { t: 'node'; id: string; state: NodeState; text?: string }
  | { t: 'flow'; segs: string[] }
  | { t: 'wait'; ms: number }
  | { t: 'gate'; closed: boolean }
  | { t: 'show'; p: string; on: boolean }
  | { t: 'text'; p: string; text: string }
  | { t: 'stage'; p: string; stage: number }

/** Un escenario se reproduce como una o varias pasadas separadas por un reposo. */
export type Script = Op[][]

export const STATUS_TEXT: Record<NodeState, string> = {
  idle: 'En espera',
  next: 'Siguiente',
  active: 'En curso',
  done: 'Hecho',
  held: 'Apartado',
  review: 'Revisando',
  reviewed: 'Revisado',
}

const EASE = 'cubic-bezier(0.45, 0, 0.25, 1)'

export class FlowEngine {
  private anims = new Set<Animation>()
  private water: Animation[] = []
  private pauseReasons = new Set<string>()
  private run = 0
  private root: HTMLElement
  private svg: SVGSVGElement
  private clock: SVGElement
  private script: Script
  private onStatus: (s: 'running' | 'done') => void

  constructor(root: HTMLElement, script: Script, onStatus: (s: 'running' | 'done') => void) {
    this.root = root
    this.svg = root.querySelector('svg') as SVGSVGElement
    this.clock = root.querySelector('[data-clock]') as SVGElement
    this.script = script
    this.onStatus = onStatus
  }

  get paused() {
    return this.pauseReasons.size > 0
  }

  setPaused(reason: string, on: boolean) {
    if (on) this.pauseReasons.add(reason)
    else this.pauseReasons.delete(reason)
    for (const a of this.anims) {
      if (this.paused) a.pause()
      else a.play()
    }
  }

  start(entrance = false) {
    this.stop()
    const id = ++this.run
    this.onStatus('running')
    this.play(id, entrance).then(
      () => id === this.run && this.onStatus('done'),
      () => {
        /* cancelado: otro escenario, repetir o desmontaje */
      },
    )
  }

  stop() {
    this.run++
    for (const a of this.anims) a.cancel()
    this.anims.clear()
    this.reset()
  }

  /** Estado final sin movimiento: la primera pasada completa más los extras. */
  applyStatic(extra: Op[]) {
    this.reset()
    for (const op of [...this.script[0], ...extra]) this.applyInstant(op)
  }

  // ---------------------------------------------------------------------

  private alive(id: number) {
    if (id !== this.run) throw new Error('cancelled')
  }

  private track(a: Animation) {
    this.anims.add(a)
    if (this.paused) a.pause()
    const done = () => this.anims.delete(a)
    a.finished.then(done, done)
    return a.finished
  }

  private wait(ms: number) {
    return this.track(this.clock.animate([{ opacity: 0 }, { opacity: 0 }], { duration: ms }))
  }

  private $<T extends Element>(sel: string) {
    return this.root.querySelector(sel) as T | null
  }

  private setNode(id: string, state: NodeState, text?: string) {
    const g = this.$<SVGGElement>(`[data-node="${id}"]`)
    if (!g) return
    g.dataset.state = state
    const status = g.querySelector('[data-status]')
    if (status) status.textContent = text ?? STATUS_TEXT[state]
  }

  private remember(el: HTMLElement) {
    if (el.dataset.init === undefined) el.dataset.init = el.textContent ?? ''
  }

  private applyInstant(op: Op) {
    switch (op.t) {
      case 'node':
        return this.setNode(op.id, op.state, op.text)
      case 'flow':
        for (const s of op.segs) {
          const w = this.$<SVGPathElement>(`[data-water="${s}"]`)
          if (w) w.style.strokeDasharray = 'none'
        }
        return
      case 'gate': {
        const g = this.$<SVGElement>('[data-gate]')
        if (g) g.dataset.closed = String(op.closed)
        return
      }
      case 'show':
        this.root.querySelectorAll<HTMLElement>(`[data-p="${op.p}"]`).forEach((el) => (el.dataset.on = String(op.on)))
        return
      case 'text':
        this.root.querySelectorAll<HTMLElement>(`[data-t="${op.p}"]`).forEach((el) => {
          this.remember(el)
          el.textContent = op.text
        })
        return
      case 'stage':
        this.root.querySelectorAll<HTMLElement>(`[data-p="${op.p}"]`).forEach((el) => el.style.setProperty('--stage', String(op.stage)))
        return
      case 'src': {
        const s = this.$<SVGGElement>(`[data-source="${op.i}"]`)
        if (s) s.dataset.active = String(op.on)
        return
      }
    }
  }

  private async flowSeg(seg: string) {
    const water = this.$<SVGPathElement>(`[data-water="${seg}"]`)
    const pulse = this.$<SVGPathElement>(`[data-pulse="${seg}"]`)
    if (!water || !pulse) return
    const len = water.getTotalLength()
    const duration = Math.max(420, len / 0.17)
    water.style.strokeDasharray = `${len} ${len}`
    pulse.style.strokeDasharray = `14 ${len + 28}`
    const w = water.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration, easing: EASE, fill: 'forwards' })
    this.water.push(w)
    this.track(w)
    await this.track(
      pulse.animate(
        [
          { strokeDashoffset: 14, opacity: 0 },
          { opacity: 1, offset: 0.12 },
          { opacity: 1, offset: 0.88 },
          { strokeDashoffset: -len, opacity: 0 },
        ],
        { duration, easing: EASE },
      ),
    )
  }

  private async exec(op: Op, id: number) {
    this.alive(id)
    if (op.t === 'wait') await this.wait(op.ms)
    else if (op.t === 'flow') await Promise.all(op.segs.map((s) => this.flowSeg(s)))
    else this.applyInstant(op)
    this.alive(id)
  }

  private reset() {
    for (const w of this.water) w.cancel()
    this.water = []
    this.$('[data-water-layer]')
      ?.getAnimations()
      .forEach((a) => a.cancel())
    this.root.querySelectorAll<SVGPathElement>('[data-water]').forEach((p) => (p.style.strokeDasharray = '0 9999'))
    this.root.querySelectorAll<SVGGElement>('[data-node]').forEach((g) => this.setNode(g.dataset.node!, 'idle'))
    this.root.querySelectorAll<SVGGElement>('[data-source]').forEach((g) => (g.dataset.active = 'false'))
    const gate = this.$<SVGElement>('[data-gate]')
    if (gate) gate.dataset.closed = 'false'
    this.root.querySelectorAll<HTMLElement>('[data-p]').forEach((el) => {
      el.dataset.on = 'false'
      el.style.removeProperty('--stage')
    })
    this.root.querySelectorAll<HTMLElement>('[data-t]').forEach((el) => {
      if (el.dataset.init !== undefined) el.textContent = el.dataset.init
    })
  }

  private async play(id: number, entrance: boolean) {
    // Entrada breve: el diagrama ya es visible, solo se asienta.
    await this.track(
      this.svg.animate(
        [
          { opacity: entrance ? 0.4 : 0.7, transform: entrance ? 'translateY(6px)' : 'none' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: entrance ? 700 : 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      ),
    )
    await this.wait(entrance ? 500 : 250)

    for (let r = 0; r < this.script.length; r++) {
      for (const op of this.script[r]) await this.exec(op, id)
      if (r === this.script.length - 1) break
      // Reposo visible entre pasadas, después se vacían los canales.
      await this.wait(2600)
      this.alive(id)
      const layer = this.$<SVGGElement>('[data-water-layer]')!
      const f = layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: 'ease-out', fill: 'forwards' })
      await this.track(f)
      this.alive(id)
      this.reset()
      f.cancel()
      await this.wait(800)
    }
  }
}
