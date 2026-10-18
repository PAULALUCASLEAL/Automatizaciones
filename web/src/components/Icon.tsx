/** Iconos propios: trazo de 1.6, extremos redondeados, cuadrícula de 24. */
export type IconName =
  | 'mail'
  | 'order'
  | 'document'
  | 'chat'
  | 'check'
  | 'pause'
  | 'play'
  | 'replay'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'alert'
  | 'sheet'
  | 'shop'
  | 'chart'
  | 'plus'
  | 'form'
  | 'user'
  | 'bell'

const paths: Record<IconName, string> = {
  mail: 'M4 6.5h16v11H4z M4.5 7l7.5 6 7.5-6',
  order: 'M5 5h2l1.6 9h9l1.6-6.5H8 M10 18.5a1 1 0 1 0 0 .01 M17 18.5a1 1 0 1 0 0 .01',
  document: 'M7 3.5h7l4 4v13H7z M14 3.5v4h4 M9.5 12h6 M9.5 15.5h6',
  chat: 'M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z M8 9.5h8 M8 12.5h5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pause: 'M9 6v12 M15 6v12',
  play: 'M8 5.5v13l10-6.5z',
  replay: 'M5 12a7 7 0 1 0 2.1-5 M5 4.5V8h3.5',
  arrow: 'M5 12h14 M13.5 6.5L19 12l-5.5 5.5',
  menu: 'M4 7.5h16 M4 12h16 M4 16.5h16',
  close: 'M6 6l12 12 M18 6L6 18',
  alert: 'M12 4l9 15.5H3z M12 10v4 M12 16.8v.2',
  sheet: 'M4.5 5h15v14h-15z M4.5 9.5h15 M4.5 14h15 M10 5v14',
  shop: 'M4.5 9.5l1.5-4.5h12l1.5 4.5 M4.5 9.5h15v10h-15z M10 19.5v-5h4v5',
  chart: 'M5 19.5V4.5 M5 19.5h14.5 M8.5 16v-4 M12.5 16V8 M16.5 16v-6',
  plus: 'M12 5v14 M5 12h14',
  form: 'M5 4.5h14v15H5z M8 8.5h8 M8 12h8 M8 15.5h4.5',
  user: 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M5 19.5c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5',
  bell: 'M6.5 16.5h11L16 14.5v-4a4 4 0 0 0-8 0v4z M10.5 19.2h3',
}

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}

/** Marca: un partidor visto en planta, el canal que entra y se reparte. */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="24" height="24" rx="6" fill="currentColor" />
      <path
        d="M5 13h7 M12 13l5-5h4 M12 13l5 5h4"
        fill="none"
        stroke="var(--mark-fg, var(--bg))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10" y="11" width="4" height="4" rx="1" fill="var(--mark-fg, var(--bg))" />
    </svg>
  )
}
