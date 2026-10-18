import type { ReactNode } from 'react'
import { Icon } from '../components/Icon'
import type { NodeState, Op, Script } from './engine'
import { buildTall, buildWide, type Layout, type ScenarioShape } from './geometry'

/* ------------------------------------------------------------------
   Utilidades para escribir guiones
   ------------------------------------------------------------------ */
const node = (id: string, state: NodeState, text?: string): Op => ({ t: 'node', id, state, text })
const wait = (ms: number): Op => ({ t: 'wait', ms })
const flow = (...segs: string[]): Op => ({ t: 'flow', segs })
const show = (p: string, on = true): Op => ({ t: 'show', p, on })
const text = (p: string, t: string): Op => ({ t: 'text', p, text: t })

interface RouteOpts {
  src: number[]
  n: number
  ms?: number[]
  done?: Record<number, string>
  after?: Record<number, Op[]>
  branch?: {
    from: number
    rejoin: boolean
    held: string
    x1: string
    review: string
    reviewed: string
    x1done?: string
    resolved?: string
    onHeld?: Op[]
    onReview?: Op[]
    onReviewed?: Op[]
    afterRejoin?: Op[]
  }
}

/** Recorrido lineal con rama de excepción opcional. */
function route(o: RouteOpts): Op[] {
  const ops: Op[] = []
  o.src.forEach((i) => ops.push({ t: 'src', i, on: true }))
  ops.push(node('n1', 'next'), wait(550), flow(...o.src.map((i) => `f${i}`)))
  o.src.forEach((i) => ops.push({ t: 'src', i, on: false }))
  for (let i = 0; i < o.n; i++) {
    const id = `n${i + 1}`
    const nextId = `n${i + 2}`
    const last = i === o.n - 1
    const br = o.branch && o.branch.from === i ? o.branch : null
    if (!last && !br) ops.push(node(nextId, 'next'))
    ops.push(node(id, 'active'), wait(o.ms?.[i] ?? 700))
    if (br) {
      ops.push(
        node(id, 'held', br.held),
        { t: 'gate', closed: true },
        ...(br.onHeld ?? []),
        node('x1', 'next'),
        flow('b1'),
        node('x1', 'held', br.x1),
        node('x2', 'next'),
        wait(450),
        flow('b2'),
        node('x2', 'review', br.review),
        ...(br.onReview ?? []),
        wait(1900),
        node('x2', 'reviewed', br.reviewed),
        ...(br.onReviewed ?? []),
      )
      if (!br.rejoin) return ops
      ops.push(
        node('x1', 'done', br.x1done ?? 'Completado'),
        { t: 'gate', closed: false },
        node(id, 'done', br.resolved ?? 'Resuelto'),
        ...(br.afterRejoin ?? []),
        node(nextId, 'next'),
        flow('b3'),
      )
      continue
    }
    ops.push(node(id, 'done', o.done?.[i]), ...(o.after?.[i] ?? []))
    if (!last) ops.push(flow(`m${i + 1}`))
  }
  return ops
}

export interface Scenario {
  id: string
  tab: string
  support: string
  title: string
  desc: string
  wide: Layout
  tall: Layout
  script: Script
  staticExtra: Op[]
  Panel: () => ReactNode
}

function Row({ p, k, t, v }: { p: string; k: string; t?: string; v: string }) {
  return (
    <div className="fp-row" data-p={p} data-on="false">
      <dt>{k}</dt>
      <dd data-t={t}>{v}</dd>
    </div>
  )
}

/* ------------------------------------------------------------------
   1 · Pedidos y documentos (escenario original)
   ------------------------------------------------------------------ */
const ordersShape: ScenarioShape = {
  sources: [
    { label: 'Correo', icon: 'mail' },
    { label: 'Pedido web', icon: 'order' },
    { label: 'Factura', icon: 'document' },
    { label: 'Consulta', icon: 'chat' },
  ],
  main: [['Pedido', 'recibido'], ['Datos', 'organizados'], ['Validación'], ['Registro', 'en gestión'], ['Confirmación', 'enviada']],
  branch: { from: 2, rejoin: true, x1: ['Faltan datos'], x2: ['Revisión', 'por el equipo'] },
  wide: { sourceX: [110, 250, 390, 530], sourceW: 118, slot: { x: 14, y: 306, w: 284, h: 188 } },
  tall: { sourceX: [47, 133, 219, 305], sourceW: 82, slotH: 192 },
}

const orders: Scenario = {
  id: 'pedidos',
  tab: 'Pedidos y documentos',
  title: 'Recorrido de un pedido por un proceso conectado',
  support: 'Lo que no cuadra no se pierde: se aparta y lo revisa una persona.',
  desc:
    'Correos, pedidos web, facturas y consultas entran por un mismo canal. Un pedido pasa por cinco puntos: pedido recibido, datos organizados, validación, registro en gestión y confirmación enviada. Si en la validación faltan datos, la compuerta lo aparta, una persona del equipo lo revisa y el pedido vuelve al recorrido.',
  wide: buildWide(ordersShape),
  tall: buildTall(ordersShape),
  script: [
    route({
      src: [1],
      n: 5,
      done: { 2: 'Correcto', 3: 'Registrado', 4: 'Enviada' },
      after: { 0: [show('o1')], 1: [show('o2')], 2: [show('o3')], 3: [show('o4')], 4: [show('o5')] },
    }),
    route({
      src: [0],
      n: 5,
      done: { 3: 'Registrado', 4: 'Enviada' },
      after: { 0: [text('o-src', 'Correo'), show('o1')], 1: [show('o2')], 3: [show('o4')], 4: [show('o5')] },
      branch: {
        from: 2,
        rejoin: true,
        held: 'Con dudas',
        x1: 'Apartado',
        review: 'Revisando',
        reviewed: 'Revisado',
        onHeld: [text('o-val', 'Falta la dirección'), show('o3')],
        onReviewed: [text('o-val', 'Confirmada por el equipo')],
      },
    }),
  ],
  staticExtra: [node('x1', 'held', 'Si falta algo'), node('x2', 'reviewed', 'Decide una persona'), { t: 'gate', closed: true }],
  Panel: () => (
    <div className="fp-card">
      <p className="fp-title">
        <Icon name="document" size={14} />
        Pedido 2318 · Ferretería Ejemplo
      </p>
      <dl>
        <Row p="o1" k="Origen" t="o-src" v="Pedido web" />
        <Row p="o2" k="Líneas" v="3 referencias · 40 uds." />
        <Row p="o3" k="Validación" t="o-val" v="Precios y stock correctos" />
        <Row p="o4" k="Gestión" v="Registrado" />
        <Row p="o5" k="Cliente" v="Confirmación enviada" />
      </dl>
    </div>
  ),
}

/* ------------------------------------------------------------------
   2 · Captación de clientes
   ------------------------------------------------------------------ */
const leadsShape: ScenarioShape = {
  sources: [
    { label: 'Formulario web', icon: 'form' },
    { label: 'Respuesta a campaña', icon: 'mail' },
  ],
  main: [['Nuevo', 'contacto'], ['Validación', 'de datos'], ['Clasificación', 'por interés'], ['Asignación', 'comercial'], ['Propuesta', 'de reunión']],
  branch: { from: 1, rejoin: true, x1: ['Información', 'incompleta'], x2: ['Solicitar', 'datos'] },
  wide: { sourceX: [150, 370], sourceW: 190, slot: { x: 404, y: 298, w: 272, h: 198 } },
  tall: { sourceX: [100, 268], sourceW: 160, slotH: 232 },
}

const leads: Scenario = {
  id: 'captacion',
  tab: 'Captación de clientes',
  title: 'Recorrido de una solicitud de información hasta una propuesta de reunión',
  support: 'Cada oportunidad llega organizada a la persona adecuada.',
  desc:
    'Una persona pide información desde el formulario de la web o respondiendo a una campaña. Se crea el contacto, se validan sus datos, se clasifica por interés, se asigna a una persona del equipo comercial y se le propone una reunión. Si la información está incompleta, se le solicitan los datos que faltan antes de seguir. Solo se trabaja con contactos que han escrito o han dado su permiso.',
  wide: buildWide(leadsShape),
  tall: buildTall(leadsShape),
  script: [
    route({
      src: [0],
      n: 5,
      done: { 0: 'Creado', 1: 'Correctos', 2: 'Pedidos', 3: 'Javier', 4: 'Enviada' },
      after: {
        0: [show('l1'), show('l2')],
        1: [show('l3')],
        2: [show('l4')],
        3: [show('l5')],
        4: [show('l6')],
      },
    }),
    route({
      src: [1],
      n: 5,
      done: { 0: 'Creado', 2: 'Informes', 3: 'Marta', 4: 'Enviada' },
      after: {
        0: [
          text('l-src', 'Campaña · pidió info'),
          text('l-name', 'Pablo Ruiz'),
          text('l-int', 'Informes semanales'),
          text('l-own', 'Marta (comercial)'),
          text('l-next', 'Reunión: jueves 12:00'),
          show('l1'),
          show('l2'),
        ],
        2: [show('l4')],
        3: [show('l5')],
        4: [show('l6')],
      },
      branch: {
        from: 1,
        rejoin: true,
        held: 'Incompletos',
        x1: 'Falta la empresa',
        review: 'Esperando respuesta',
        reviewed: 'Datos recibidos',
        onHeld: [text('l-co', 'Sin indicar'), show('l3')],
        onReview: [text('l-co', 'Pedida por correo')],
        onReviewed: [text('l-co', 'Distribuciones Ejemplo')],
      },
    }),
  ],
  staticExtra: [node('x1', 'held', 'Si falta algo'), node('x2', 'reviewed', 'Se piden por correo'), { t: 'gate', closed: true }],
  Panel: () => (
    <div className="fp-card">
      <p className="fp-title">
        <Icon name="user" size={14} />
        Oportunidad nueva
      </p>
      <dl>
        <Row p="l1" k="Origen" t="l-src" v="Formulario web" />
        <Row p="l2" k="Nombre" t="l-name" v="Lucía Martín" />
        <Row p="l3" k="Empresa" t="l-co" v="Talleres Ejemplo" />
        <Row p="l4" k="Interés" t="l-int" v="Automatizar pedidos" />
        <Row p="l5" k="Asignado a" t="l-own" v="Javier (comercial)" />
        <Row p="l6" k="Siguiente" t="l-next" v="Reunión: martes 10:00" />
      </dl>
    </div>
  ),
}

/* ------------------------------------------------------------------
   3 · CRM y seguimiento
   ------------------------------------------------------------------ */
const crmShape: ScenarioShape = {
  sources: [
    { label: 'Hoja de cálculo', icon: 'sheet' },
    { label: 'Correo', icon: 'mail' },
    { label: 'Formulario', icon: 'form' },
  ],
  main: [['Unificar y', 'eliminar duplicados'], ['Crear o', 'actualizar ficha'], ['Asignar', 'responsable'], ['Programar', 'seguimiento']],
  wide: { sourceX: [140, 320, 500], sourceW: 150, slot: { x: 14, y: 308, w: 652, h: 186 } },
  tall: { sourceX: [98, 204, 310], sourceW: 100, slotH: 284 },
}

const PIPE = ['Nuevo contacto', 'Reunión', 'Propuesta', 'Cliente']

const crm: Scenario = {
  id: 'crm',
  tab: 'CRM y seguimiento',
  title: 'Información dispersa que se convierte en un CRM ordenado',
  support: 'Contactos, conversaciones y próximos pasos, en un mismo lugar.',
  desc:
    'Los datos de una hoja de cálculo, el correo y un formulario se unifican y se eliminan los duplicados. Se crea o actualiza la ficha del contacto, se asigna una persona responsable y se programa el seguimiento. En el embudo comercial, la oportunidad pasa de nuevo contacto a reunión y, tras la reunión, a propuesta, con un recordatorio de seguimiento. Solo pasa a cliente cuando el cliente lo confirma.',
  wide: buildWide(crmShape),
  tall: buildTall(crmShape),
  script: [
    [
      ...route({
        src: [0, 1, 2],
        n: 4,
        ms: [1000, 700, 700, 700],
        done: { 0: '2 duplicados unidos', 1: 'Ficha creada', 2: 'Javier', 3: 'Programado' },
        after: { 1: [show('c-card')] },
      }),
      wait(700),
      text('c-st', 'Reunión el martes'),
      { t: 'stage', p: 'c-card', stage: 1 },
      wait(1500),
      text('c-st', 'Propuesta enviada'),
      { t: 'stage', p: 'c-card', stage: 2 },
      wait(700),
      show('c-rem'),
    ],
  ],
  staticExtra: [text('c-st', 'Propuesta enviada'), { t: 'stage', p: 'c-card', stage: 2 }, show('c-rem')],
  Panel: () => (
    <div className="fp-pipe">
      <ol className="pipe-cols">
        {PIPE.map((s, i) => (
          <li key={s} className={i === 3 ? 'is-gated' : undefined}>
            <span>{s}</span>
            {i === 3 && <small>Solo si el cliente lo confirma</small>}
          </li>
        ))}
      </ol>
      <div className="pipe-lane">
        <div className="pipe-card" data-p="c-card" data-on="false">
          <div>
          <strong>Talleres Ejemplo</strong>
          <span data-t="c-own">Lucía Martín</span>
          <span className="pipe-st" data-t="c-st">
            Ficha creada
          </span>
          </div>
        </div>
      </div>
      <p className="pipe-rem" data-p="c-rem" data-on="false">
        <Icon name="bell" size={14} />
        <span>Recordatorio para Javier · jueves 10:00: llamar para comentar la propuesta</span>
      </p>
    </div>
  ),
}

/* ------------------------------------------------------------------
   4 · Atención al cliente
   ------------------------------------------------------------------ */
const supportShape: ScenarioShape = {
  sources: [{ label: '¿Dónde está mi pedido?', icon: 'chat' }],
  main: [['Recibir', 'consulta'], ['Identificar', 'pedido'], ['Consultar estado', 'del envío'], ['Preparar', 'respuesta'], ['Responder', 'al cliente']],
  branch: {
    from: 2,
    rejoin: false,
    x1: ['Incidencia', 'o información', 'insuficiente'],
    x2: ['Derivar al equipo', 'con el contexto'],
    tallX1: ['Incidencia o información', 'insuficiente'],
    tallX2: ['Derivar al equipo', 'con el contexto'],
  },
  wide: { sourceX: [140], sourceW: 230, slot: { x: 300, y: 6, w: 372, h: 166 } },
  tall: { sourceX: [140], sourceW: 230, slotH: 236 },
}

const service: Scenario = {
  id: 'atencion',
  tab: 'Atención al cliente',
  title: 'Respuesta a una consulta sobre el estado de un pedido',
  support: 'Respuestas más ágiles y un equipo con contexto para resolver lo importante.',
  desc:
    'Una clienta pregunta dónde está su pedido. Se recibe la consulta, se identifica el pedido, se consulta el estado del envío, se prepara la respuesta y se le responde con la fecha de entrega prevista. Si hay una incidencia o falta información, la conversación se deriva a una persona del equipo junto con el historial y los datos del pedido.',
  wide: buildWide(supportShape),
  tall: buildTall(supportShape),
  script: [
    route({
      src: [0],
      n: 5,
      done: { 0: 'Recibida', 1: 'Pedido 10482', 2: 'En reparto', 3: 'Lista', 4: 'Enviada' },
      after: { 0: [show('s-q')], 3: [show('s-a')], 4: [text('s-a-st', 'Enviada · 10:43')] },
    }),
    route({
      src: [0],
      n: 5,
      done: { 0: 'Recibida', 1: 'Pedido 10517' },
      after: { 0: [text('s-qt', '¿Dónde está mi pedido? Debía llegar ayer.'), text('s-who', 'Andrés · 11:05'), show('s-q')] },
      branch: {
        from: 2,
        rejoin: false,
        held: 'Incidencia',
        x1: 'Detectada',
        review: 'Asignando',
        reviewed: 'Laura lo atiende',
        onReview: [show('s-h')],
      },
    }),
  ],
  staticExtra: [node('x1', 'held', 'Si hay incidencia'), node('x2', 'reviewed', 'Con todo el contexto'), { t: 'gate', closed: true }],
  Panel: () => (
    <div className="fp-chat">
      <div className="chat-in" data-p="s-q" data-on="false">
        <span className="chat-who" data-t="s-who">
          Elena · 10:42
        </span>
        <span data-t="s-qt">¿Dónde está mi pedido? Es el 10482.</span>
      </div>
      <div className="chat-slot">
        <div className="chat-out" data-p="s-a" data-on="false">
          <span className="chat-who" data-t="s-a-st">
            Borrador
          </span>
          <span>Hola, Elena: tu pedido 10482 salió ayer y llegará el jueves 23, entre las 9 y las 14 h. Aquí tienes el enlace de seguimiento.</span>
        </div>
        <div className="handoff" data-p="s-h" data-on="false">
          <p className="handoff-to">
            <Icon name="user" size={14} />
            Para Laura · Atención al cliente
          </p>
          <ul>
            <li>Historial: 2 mensajes de Andrés</li>
            <li>Pedido 10517 · enviado el 20/10</li>
            <li>Transportista: incidencia en el reparto</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

export const SCENARIOS: Scenario[] = [orders, leads, crm, service]
