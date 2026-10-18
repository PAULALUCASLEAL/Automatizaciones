# PK Soluciones — web

Web del estudio **PK Soluciones** (nombre provisional): automatización, integraciones, IA y software a medida para pymes.
Hecha con React + TypeScript + Vite. Es una web estática y no necesita servidor propio.

## Cómo ejecutarla

Necesitas Node.js 20 o superior.

```bash
cd web
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # versión final en web/dist
npm run preview    # sirve la versión final para revisarla
npm run lint       # revisión de código
```

Para publicarla, sube la carpeta `web/dist` a cualquier alojamiento estático (Netlify, Vercel, Cloudflare Pages, un hosting tradicional…).

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Nombre de la marca, textos, preguntas frecuentes, datos de contacto y legales | `web/src/content/site.ts` |
| Escenarios del diagrama animado (recorridos, fichas, datos ficticios) | `web/src/flow/scenarios.tsx` |
| Colores, tipografía y estilos | `web/src/index.css` (tokens al principio) |
| Título, descripción e imagen para redes | `web/index.html`, `web/public/og-image.png` |
| Contexto de producto (para futuras sesiones de diseño) | `PRODUCT.md` |

El nombre de la marca está en una sola constante: `BRAND.name`.

## Dirección de diseño

**Acequias de la huerta.** El trabajo se trata como el agua del riego tradicional de Murcia y Elche: llega disperso, se conduce por canales y partidores, y llega a cada campo en orden. Cuando algo no cuadra, una compuerta lo aparta para que lo mire una persona.

- **Fondo claro y calmado**, con la paleta exacta que pasaste. Solo hay dos momentos oscuros: «Cómo trabajamos» y el pie.
- **Tipografía:** Bricolage Grotesque para titulares (grotesca con carácter, sin dureza) y Figtree para el texto. Las dos se sirven desde la propia web, sin depender de Google Fonts.
- **Pieza principal:** el diagrama del hero, con cuatro escenarios que elige el visitante:
  - *Pedidos y documentos*
  - *Captación de clientes*
  - *CRM y seguimiento*, con un embudo en el que la oportunidad avanza a «Propuesta» tras la reunión y solo pasa a «Cliente» con confirmación.
  - *Atención al cliente*, con la derivación a una persona que recibe el historial.

  En los demás escenarios, cada recorrido tiene su rama de excepción y su ficha de detalle con datos ficticios.

### Movimiento

- Pulsos de carbón que recorren los canales y puntos que se activan de uno en uno. El siguiente paso se marca antes de activarse.
- Al completarse, cada punto cambia de forma (de cuadrado a círculo), de icono (✓) y de texto.
- Cada escenario hace una pasada normal, descansa y luego hace la pasada con excepción. Después se queda quieto. No hay bucles infinitos ni carruseles automáticos.
- Hay botones «Pausar» y «Repetir animación». La animación se pausa sola fuera de pantalla o con la pestaña oculta.
- Con «reducir movimiento» activado en el sistema, cada escenario se muestra como un diagrama estático completo.
- Técnica: SVG + Web Animations API. React no se vuelve a pintar en cada fotograma y no hay librerías de animación.
- Interacciones pequeñas en botones (presión), menú, pestañas de las demos, «Antes / Con PK Soluciones», preguntas frecuentes y mensajes del formulario. No hay una misma entrada repetida en todas las secciones.

## Color

Tus colores se usan tal cual como tokens (`--bg`, `--surface`, `--sand`, `--muted`, `--ink`, `--ink-2`, `--line`).
Contrastes medidos (WCAG):

| Texto | Fondo | Contraste |
| --- | --- | --- |
| #242321 | #F7F5F1 | 14,4:1 |
| #746B60 | #F7F5F1 | 4,8:1 (AA) |
| #746B60 | #E8E3DB | **4,1:1, no llega a AA** |
| #F7F5F1 | #242321 | 14,4:1 |
| #E8E3DB | #242321 | 12,3:1 |

Ajustes por accesibilidad:

- `--muted-strong: #6A6156`: texto secundario sobre la superficie #E8E3DB (4,8:1). Solo se usa ahí.
- `--line-strong: #857B6F`: borde de los campos del formulario, para que se distingan (3,8:1 sobre el fondo).
- El arena #CEC5B8 nunca se usa para texto, solo para superficies, canales y detalles.
- No hay rojos para los errores. Se señalan con icono, texto y borde más grueso, dentro de la paleta.

## Skills y herramientas usadas

- **Impeccable:**
  - Contexto de producto (`PRODUCT.md`).
  - Elección de dirección, que hiciste tú entre tres propuestas.
  - Contrato de dirección (`.impeccable/surfaces/`).
  - Detector de patrones genéricos: sin hallazgos.
  - Revisión final independiente con un subagente revisor.
- **animate** (Emil Kowalski): curvas, duraciones, interrupción, movimiento reducido y botones de control.
- **webapp-testing** (Playwright): capturas a 360, 390, 768, 1100, 1180, 1280 y 1440 px, y pruebas de menú, formulario, pestañas, teclado, los cuatro escenarios, ramas, controles y movimiento reducido.
- *frontend-design*, *web-design-guidelines*, *emil-design-eng*, *review-animations* y *animation-performance* están instaladas. Sus criterios coinciden con los aplicados, pero no las he ejecutado por separado en esta versión.
- No se usó Figma: no había un archivo de diseño, solo el enlace al plugin.

## Comprobaciones hechas

- `npm run build` y `npm run lint`: correctos. Queda un aviso menor de recarga en caliente en `scenarios.tsx`, que solo afecta al desarrollo.
- Sin desbordamiento horizontal a 360, 390, 768, 1100, 1180, 1280 y 1440 px. Sin errores en consola.
- Los cuatro escenarios llegan a su rama o embudo y terminan. En ningún ancho hay texto que se salga de las fichas.
- Teclado:
  - El selector de escenarios funciona con flechas, Inicio y Fin.
  - Las pestañas de las demos funcionan con flechas.
  - El menú móvil se cierra con Escape y devuelve el foco al botón.
- Formulario:
  - Muestra errores claros y pone el foco en el primer campo con error.
  - Con datos válidos y sin buzón conectado, avisa de que **no** se ha enviado.

### Limitaciones

- Sin probar en Safari ni en un iPhone real. Las capturas son de Chromium.
- Sin lector de pantalla real. Se revisaron la semántica y los textos alternativos de los diagramas.
- Las fichas del diagrama usan unidades de contenedor (`cqw`), que requieren Safari 16 o superior.

## Antes de publicar (lista de comprobación)

1. **Nombre:** comprobar que «PK Soluciones» está libre (dominio, OEPM/EUIPO, redes) y cambiar `BRAND.name` si hace falta.
2. **Dominio:** comprarlo cuando decidas y configurar HTTPS.
3. **Formulario:** conectar un servicio de recepción (Formspree, Getform, una función propia…) y poner su URL en `CONTACT.formEndpoint`. Probar un envío real y la respuesta de error.
4. **Protección de datos:** añadir la información básica de privacidad bajo el formulario y el texto de consentimiento que corresponda. Conviene revisarlo con un profesional.
5. **Páginas legales:** aviso legal (LSSI: titular, NIF, domicilio, contacto), privacidad y cookies. Poner sus URL en `CONTACT.legal`. Mientras no estén, el pie lo indica.
6. **Correo de contacto:** rellenar `CONTACT.email`. Solo se muestra si existe.
7. **Fundador/a:** nombre, foto (en `web/public/`), formación y experiencia verificadas en `FOUNDER`. La sección se adapta sola.
8. **Cookies y analítica:** ahora la web no usa ninguna. Si añades analítica, pon un banner que permita rechazar.
9. **Imagen para redes:** `og-image.png` es una captura del hero. Sustitúyela si tienes una pieza de marca, y pon la URL absoluta del dominio en `og:image`.
10. **Probar en móviles reales:** iPhone (Safari) y Android (Chrome), con y sin «reducir movimiento».
11. **Contenido:** revisar textos y ejemplos ficticios. No añadir clientes, cifras ni testimonios sin permiso y sin datos reales.
