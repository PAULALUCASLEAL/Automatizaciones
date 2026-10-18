/**
 * Todo el contenido editable de la web vive aquí: marca, textos,
 * datos de contacto y datos de las demostraciones.
 * Cambiar el nombre de la marca = cambiar BRAND.name.
 */

export const BRAND = {
  name: 'PK Soluciones',
  descriptor: 'Soluciones y automatización para pymes.',
  purpose: 'Devolver a las empresas el tiempo y la capacidad de construir su futuro.',
}

/**
 * Datos de contacto y legales. Mientras estén a null, la web NO muestra
 * enlaces ni datos inventados. Rellénalos antes de publicar.
 */
export const CONTACT = {
  /** URL que recibe el formulario por POST (JSON). null = no conectado. */
  formEndpoint: null as string | null,
  email: null as string | null,
  /** Enlaces legales; solo se muestran los que tengan URL. */
  legal: [
    { label: 'Aviso legal', href: null as string | null },
    { label: 'Política de privacidad', href: null as string | null },
    { label: 'Cookies', href: null as string | null },
  ],
}

/** Datos de la fundadora o el fundador. null = la sección se adapta sin ellos. */
export const FOUNDER = {
  name: null as string | null,
  role: null as string | null,
  photo: null as string | null, // ruta en /public, p. ej. '/fundador.jpg'
  photoAlt: '',
  /** Formación y experiencia verificada, una línea por elemento. */
  credentials: [] as string[],
}

export const NAV = [
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#como-trabajamos', label: 'Cómo trabajamos' },
  { href: '#sobre', label: `Sobre ${BRAND.name}` },
  { href: '#contacto', label: 'Contacto' },
]

export const HERO = {
  title: 'Que lo urgente deje espacio a lo importante.',
  body: 'Creamos soluciones y automatizaciones para que tu pyme dedique menos tiempo a tareas repetitivas y más a sus clientes, su equipo y su futuro.',
  primary: { label: 'Cuéntanos qué quieres mejorar', href: '#contacto' },
  secondary: { label: 'Ver cómo funciona', href: '#demostraciones' },
}

export const RECOGNITION = {
  title: 'Hay trabajo que ocupa más de lo que debería.',
  intro:
    'Las empresas se construyen con esfuerzo, ideas y compromiso. Pero cuando el negocio crece, la administración del día a día se va quedando con la atención que haría falta para mejorarlo.',
  items: [
    'Copiar los mismos datos entre programas.',
    'Revisar pedidos y documentos a mano.',
    'Responder una y otra vez a las mismas consultas.',
    'Reunir archivos para preparar cada informe.',
    'Dejar mejoras pendientes porque nunca llega el momento.',
  ],
  close:
    'Nada de esto es falta de ganas ni de capacidad. Es trabajo que se ha ido acumulando entre herramientas que no se hablan.',
}

export const SERVICES = {
  title: 'Lo que resolvemos',
  intro:
    'Trabajamos sobre cuatro áreas. En todas podemos conectar los programas que ya usáis o construir una herramienta a medida cuando no existe la adecuada.',
  areas: [
    {
      id: 'administracion',
      name: 'Administración, documentos y pedidos',
      trigger: 'Llega un pedido por correo, una factura en PDF o un albarán escaneado.',
      does: 'Se leen los datos, se comprueban y se registran en vuestro programa de gestión. Lo que no cuadra queda apartado para que alguien lo mire.',
      benefit: 'Menos tecleo repetido y menos errores de transcripción.',
    },
    {
      id: 'atencion',
      name: 'Atención al cliente y seguimiento',
      trigger: 'Un cliente pregunta por el estado de su pedido o escribe con una incidencia.',
      does: 'Se consulta la información autorizada, se prepara la respuesta y se envía o se deja lista para revisar. Las incidencias pasan a la persona responsable.',
      benefit: 'Respuestas más constantes y nada que se quede sin contestar.',
    },
    {
      id: 'crm',
      name: 'CRM y procesos comerciales',
      trigger: 'Entra una oportunidad por la web, una feria o una llamada.',
      does: 'Se crea en el CRM con sus datos, se asigna a un responsable y se programan los recordatorios de seguimiento.',
      benefit: 'Menos oportunidades olvidadas y un historial ordenado.',
    },
    {
      id: 'informes',
      name: 'Informes y control del negocio',
      trigger: 'Cada semana alguien reúne datos de la tienda, la facturación y varias hojas de cálculo.',
      does: 'Las fuentes se reúnen solas, el informe se actualiza y se avisa cuando un indicador necesita atención.',
      benefit: 'La información, a mano y al día, sin perseguirla.',
    },
  ],
}

export const DEMOS = {
  title: 'Así se ve en la práctica',
  intro: 'Dos ejemplos con datos ficticios para enseñar cómo circula la información. No son casos de clientes.',
  label: 'Demostración ilustrativa',
}

export const BEFORE_AFTER = {
  title: 'El mismo proceso, otra forma de recorrerlo',
  intro: 'Un pedido de un cliente habitual, paso a paso. Cambia cómo se mueve la información, no lo que decide vuestro equipo.',
  steps: [
    {
      step: 'Llega el pedido',
      before: 'Llega al correo de alguien y se queda ahí hasta que lo ve.',
      after: 'Entra por un único punto y queda registrado al momento.',
    },
    {
      step: 'Se pasan los datos',
      before: 'Se copian a mano en la hoja de pedidos y otra vez en el programa de gestión.',
      after: 'Se leen una sola vez y llegan ordenados a donde hacen falta.',
    },
    {
      step: 'Se comprueba',
      before: 'Se revisa línea a línea contra precios y stock en otra pantalla.',
      after: 'Se comprueba solo; lo que no cuadra se aparta con el motivo indicado.',
    },
    {
      step: 'Se decide',
      before: 'Las dudas se resuelven por teléfono, cuando hay un hueco.',
      after: 'El equipo revisa solo las excepciones, con toda la información delante.',
    },
    {
      step: 'Se confirma al cliente',
      before: 'Alguien recuerda escribir la confirmación… o no.',
      after: 'La confirmación sale cuando el pedido queda registrado.',
    },
  ],
}

export const VALUE = {
  title: 'Lo que cambia en el día a día',
  items: [
    { title: 'Menos datos repetidos', text: 'La información se introduce una vez y viaja sola entre programas.' },
    { title: 'Menos seguimientos olvidados', text: 'Cada tarea tiene responsable y recordatorio.' },
    { title: 'Información fácil de encontrar', text: 'Un sitio claro para cada cosa, con su historial.' },
    { title: 'Tiempos de respuesta más constantes', text: 'Los clientes reciben respuesta aunque sea una semana complicada.' },
    { title: 'Más capacidad', text: 'El mismo equipo puede atender más actividad sin vivir con prisa.' },
  ],
  estimator: {
    title: 'Haz una estimación',
    text: 'Calcula cuánto tiempo podría quedar libre en una tarea concreta. Cambia los valores para que se parezcan a vuestro caso.',
    note: 'Es una estimación orientativa de tiempo, no un ahorro de dinero garantizado. Ese tiempo puede convertirse en más capacidad, menos horas extra o mejor atención; no resta licencias, supervisión ni mantenimiento.',
  },
}

export const PROCESS = {
  title: 'Primero entendemos. Después construimos.',
  intro: 'Cada proyecto avanza por partes pequeñas y medibles. Si algo no compensa, lo decimos antes de construirlo.',
  steps: [
    {
      title: 'Entender el proceso',
      text: 'Hablamos con quien hace el trabajo y vemos dónde se atasca: frecuencia, volumen, herramientas y consecuencias de un retraso.',
    },
    {
      title: 'Priorizar una mejora',
      text: 'Elegimos un primer proceso, acordamos cómo medir el cambio y dejamos por escrito qué incluye y qué no.',
    },
    {
      title: 'Construir, probar y poner en marcha',
      text: 'Probamos con casos normales y con excepciones antes de usarlo de verdad. Documentamos y formamos al equipo.',
    },
    {
      title: 'Acompañar y revisar',
      text: 'Revisamos los resultados con los mismos criterios del principio y ajustamos según el plan de soporte acordado.',
    },
  ],
}

export const ABOUT = {
  title: 'Un estudio pequeño, a propósito',
  paragraphs: [
    `${BRAND.name} es un estudio independiente. Quien te escucha en la primera conversación es quien diseña, construye y mantiene la solución.`,
    'Preferimos resolver bien un problema concreto antes que prometer una transformación completa. Por eso trabajamos con pocos proyectos a la vez y dejamos cada solución documentada, para que sea vuestra.',
  ],
  principles: ['Una persona de contacto, de principio a fin.', 'Documentación y accesos a vuestro nombre.', 'Revisiones humanas donde importan.'],
}

export const FAQ = {
  title: 'Preguntas frecuentes',
  items: [
    {
      q: '¿Tengo que cambiar mis programas?',
      a: 'Normalmente no. Primero intentamos conectar lo que ya usáis. Si un programa no permite una integración razonable, os lo explicamos y valoramos alternativas antes de empezar.',
    },
    {
      q: '¿Qué se puede automatizar?',
      a: 'Las tareas repetitivas con reglas claras: pasar datos entre programas, revisar documentos, avisos, seguimientos e informes. Las decisiones delicadas siguen en manos de vuestro equipo.',
    },
    {
      q: '¿Cómo sabemos si merece la pena?',
      a: 'Medimos antes de empezar: cuánto tiempo lleva hoy la tarea, cuántas veces se repite y cuántos errores aparecen. Después medimos igual y comparamos.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Depende del alcance: cuántos procesos, qué programas y qué excepciones hay que tratar. Tras la primera conversación preparamos una propuesta cerrada, con lo que incluye y lo que no.',
    },
    {
      q: '¿Qué pasa si algo necesita revisión?',
      a: 'Cada solución aparta lo que no cuadra y avisa a la persona responsable con el motivo. Nada se da por bueno sin cumplir las reglas que acordamos.',
    },
    {
      q: '¿Podéis mantener la solución?',
      a: 'Sí, con un plan de acompañamiento acordado: qué incluye, en qué horario y con qué tiempos de respuesta. Y si preferís llevarla vosotros, os la entregamos documentada.',
    },
  ],
}

export const CONTACT_COPY = {
  title: 'Hagamos espacio para lo que viene.',
  body: 'Cuéntanos qué tarea os está quitando tiempo. Empezaremos por entender cómo trabajáis y valorar qué merece la pena mejorar.',
  fields: {
    name: 'Nombre',
    company: 'Empresa',
    email: 'Correo',
    message: '¿Qué os gustaría mejorar?',
  },
  messageHint: 'Por ejemplo: «Cada lunes pasamos a mano los pedidos del fin de semana».',
  submit: 'Enviar',
  previewNotice:
    'Vista previa: el formulario todavía no está conectado a ningún buzón y falta la información de protección de datos. Puedes probarlo, pero no se enviará ningún mensaje.',
  previewResult:
    'Todo está correcto, pero el mensaje no se ha enviado: falta conectar el formulario antes de publicar la web.',
  success: 'Gracias. Hemos recibido tu mensaje y te responderemos lo antes posible.',
  failure: 'No hemos podido enviar el mensaje. Revisa tu conexión e inténtalo de nuevo en unos minutos.',
}
