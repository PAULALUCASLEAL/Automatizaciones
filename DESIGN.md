---
name: PK Soluciones
description: Soluciones y automatización para pymes. Work routed like water through a huerta's channels.
colors:
  limestone: "#F7F5F1"
  whitewash: "#E8E3DB"
  channel-sand: "#CEC5B8"
  weathered-earth: "#746B60"
  weathered-earth-strong: "#6A6156"
  charcoal-water: "#242321"
  wet-stone: "#514B44"
  stone-line: "#D8D1C7"
  stone-line-strong: "#857B6F"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Figtree Variable', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 3.6vw, 4.75rem)"
    fontWeight: 540
    lineHeight: 1
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Figtree Variable', system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.4vw, 3.4rem)"
    fontWeight: 560
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Figtree Variable', system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)"
    fontWeight: 560
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "'Bricolage Grotesque Variable', 'Figtree Variable', system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 1.1vw, 2rem)"
    fontWeight: 460
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "'Figtree Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Figtree Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Figtree Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sheet: "2px"
  node: "8px"
  control: "10px"
  track: "12px"
  card: "20px"
  done: "22px"
  frame: "24px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(88px, 11vw, 160px)"
  container: "1240px"
  target: "44px"
components:
  button-primary:
    backgroundColor: "{colors.charcoal-water}"
    textColor: "{colors.limestone}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.wet-stone}"
    textColor: "{colors.limestone}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-water}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.whitewash}"
  input-field:
    backgroundColor: "{colors.limestone}"
    textColor: "{colors.charcoal-water}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "50px"
  tab-selected:
    backgroundColor: "{colors.charcoal-water}"
    textColor: "{colors.limestone}"
    rounded: "9px"
    height: "44px"
  tab-track:
    backgroundColor: "{colors.limestone}"
    rounded: "{rounded.track}"
    padding: "4px"
  partidor-node:
    backgroundColor: "{colors.limestone}"
    rounded: "{rounded.node}"
    size: "44px"
  partidor-node-active:
    backgroundColor: "{colors.charcoal-water}"
    textColor: "{colors.limestone}"
    rounded: "{rounded.node}"
    size: "44px"
  partidor-node-done:
    backgroundColor: "{colors.limestone}"
    textColor: "{colors.charcoal-water}"
    rounded: "{rounded.done}"
    size: "44px"
  flow-frame:
    backgroundColor: "{colors.whitewash}"
    rounded: "{rounded.frame}"
  content-card:
    backgroundColor: "{colors.limestone}"
    rounded: "{rounded.card}"
    padding: "clamp(20px, 3.4vw, 40px)"
---

# Design System: PK Soluciones

## Overview

**Creative North Star: "The Huerta Acequia"**

Work is water in a Murcian huerta: it arrives scattered, is led along channels and through partidores, and reaches each field in order; a gate holds it for a person when something is missing. Every surface is limestone ground and whitewashed wall, and the only "colour" that moves is charcoal, read as water and as ink. The system is calm, warm and architectural: generous section breathing, hairline stone dividers instead of boxes, and one recurring instrument (the channel with its square nodes) that explains process wherever process is shown.

Density is low and deliberate. Sections are separated by large vertical rhythm and tonal shifts (limestone to whitewash to one charcoal band), never by drop shadows or decorative gradients. The interface is predominantly light, with exactly two intentional dark moments: the "Cómo trabajamos" process band and the footer.

State is always legible without colour alone: a node changes shape (square to rounded), gains an icon (check, alert), changes its line style (solid, dashed) and its label. Work is shown being routed and reviewed, never vanishing.

**Key Characteristics:**
- Owner-pinned seven-colour warm-neutral palette plus two accessibility variants; no hue accent.
- Bricolage Grotesque display with tight negative tracking over Figtree body.
- The acequia channel language: sand bed, stone floor, charcoal pulse, square partidor nodes.
- Dashed borders mean "pending, exception or a person must look"; solid charcoal means "done or in progress".
- Flat, tonal depth; hairline dividers; no elevation shadows.
- Two dark charcoal moments per page, no more.

## Colors

A warm mineral range from limestone to charcoal, with no saturated hue anywhere; hierarchy comes from value, not colour.

### Primary
- **Charcoal Water** (charcoal-water): primary text, primary buttons, selected tabs, the moving pulse in channels, active nodes, the dark process band and footer, focus outlines. It is the only element that "flows".
- **Wet Stone** (wet-stone): primary-button hover, secondary text on light ground, the at-rest water in channels (at 0.34 opacity), dashed "next" and exception borders, gate posts, the rail lines in the dark process band.

### Neutral
- **Limestone** (limestone): page ground; also the "paper" fill of nodes, documents, inputs and detail cards (the `--paper` alias points here). Text colour on charcoal.
- **Whitewash** (whitewash): surface tone for the flow frame, demo stages, the Servicios and Contacto bands, hover fills; secondary text on the charcoal band.
- **Channel Sand** (channel-sand): channel beds, node strokes at rest, the dividing rules inside whitewash bands, selection highlight, scrollbar thumb. Decoration and structure only.
- **Stone Line** (stone-line): hairline dividers on limestone, channel floor inside the sand bed, list and table rules.
- **Weathered Earth** (weathered-earth): secondary and lead text on limestone.
- **Weathered Earth Strong** (weathered-earth-strong): secondary text on whitewash and inside the diagram (status labels, card keys), where plain Weathered Earth falls short of AA.
- **Stone Line Strong** (stone-line-strong): input and ghost-button borders, the dashed outline of "before" nodes; meets 3:1 non-text contrast on both grounds.

### Named Rules
**The Pinned Palette Rule.** The seven brand hexes are owner-pinned and binding. New needs are solved with the two accessibility variants or by changing value role, never by adding a hue. No purple, blue, neon, metallic gold or decorative gradients.

**The Sand Is Never Text Rule.** Channel Sand never carries text or icons of any size. It is a bed, a rule or a stroke.

**The Surface-Aware Secondary Rule.** Secondary text uses Weathered Earth on limestone and Weathered Earth Strong on whitewash or inside the diagram. Check the ground before choosing the grey.

## Typography

**Display Font:** Bricolage Grotesque Variable (with Figtree Variable, system-ui)
**Body Font:** Figtree Variable (with system-ui, -apple-system, Segoe UI)

Both self-hosted through @fontsource-variable; no CDN.

**Character:** A grotesk with architectural calm, set at medium variable weights (460 to 620) and tight negative tracking, over a warm, open humanist sans that stays readable at small diagram sizes.

### Hierarchy
- **Display** (540, clamp 2.6rem to 4.75rem, line-height 1, -0.038em): the hero H1 only. The contact H2 uses a near sibling (clamp 2.25rem to 4rem, 1.02, -0.035em).
- **Headline** (560, clamp 2rem to 3.4rem, 1.08, -0.03em): section H2s, balanced wrapping.
- **Title** (560, clamp 1.375rem to 1.75rem, 1.25, -0.02em): service rows, demo heads, process steps. Plain H3 is 1.25rem.
- **Statement** (460 to 520 display, 1.125rem to 2rem): recognition list items, FAQ summaries, principles, the flow caption, estimator numbers, report figures. Display face used for content that should be read as a sentence, not a heading.
- **Lead** (400, clamp 1.0625rem to 1.25rem, 1.55): section intros, capped at 38em, in secondary grey.
- **Body** (400, 1.0625rem, 1.6): running text, pretty wrapping, measures 32 to 38em.
- **Label** (600 to 650, 0.8125rem to 0.875rem, sentence case): tab labels, demo disclosure tag, field labels, card keys. Never uppercase, never letterspaced.

### Named Rules
**The Variable Weight Rule.** Weights are set as variable values (460, 520, 540, 560, 620, 650), not stepped 400/700. Headings never go bold; emphasis inside UI goes to 600 to 650.

**The Tabular Figures Rule.** Any number that is compared or totalled (estimator, tables, report rows, mail lines) uses tabular numerals.

## Layout

A single centred container (1240px plus gutters of clamp 16px to 48px). Sections breathe at clamp 88px to 160px vertical padding; section heads cap at 46rem with clamp 48px to 80px below.

Desktop compositions are asymmetric two-column splits rather than card grids: 0.8fr / 1.2fr in the hero from 1180px, and 5fr / 7fr for recognition, process, FAQ and contact from 960 to 1000px, where the left heading column becomes sticky at 120px. Service rows are 4fr / 8fr with a three-up definition list inside. The about block runs 7fr / 5fr, or 4fr / 5fr / 3fr with a photo.

Mobile collapses everything to one column with copy and CTA first, the diagram recomposed vertically (max 420px wide) beneath. Hero buttons go full width below 480px. Navigation switches to a menu panel below 900px. Interactive targets stay at 44px minimum (buttons 52px, inputs 46 to 50px).

The flow diagram is sized in its own units: the stage is an inline-size container and `--u` equals one viewBox unit (`100cqw / viewBox width`), so detail cards, chat bubbles and pipeline lanes scale exactly with the SVG at any width. The scenario selector is a container query on the flow frame and becomes a 2x2 grid under 600px of frame width.

## Elevation & Depth

Flat. Depth is tonal: limestone ground, whitewash bands and frames, limestone "paper" cards set back onto whitewash, and one charcoal band. Divisions are 1px stone or sand hairlines. The only box-shadows are functional rings: a 1px charcoal ring doubling the border on focused inputs, and a 3px limestone halo that knocks the demo rail out of its ground.

### Named Rules
**The No-Lift Rule.** Nothing floats. Cards, menus and diagrams sit on the plane; hierarchy comes from value contrast and hairlines, never from drop shadows.

## Shapes

Gently rounded rectangles with a clear size ladder: document sheets almost square (2px), nodes and small controls (8px), buttons and inputs (10px), tab tracks (12px, inner pills 9px), cards and stages (20px), the flow frame (24px). Squares are the native form of "work waiting"; the 22px radius on a 44px node (a near-circle) is reserved for "done".

Channels are drawn with round caps and joins. Branch channels are dotted beds (2 / 7 dash). Exception and pending outlines are 1.5px dashed (4 / 3 in SVG). Small square markers (bullets 18x6px bars, 9px squares) stand in for list dots.

## Components

### Buttons
Quiet and solid; a confident charcoal slab and a hairline ghost.
- **Shape:** 10px radius, 52px tall (44px small variant), 600 weight Figtree at 1rem.
- **Primary:** charcoal fill, limestone text, trailing arrow icon.
- **Hover / Focus:** primary lightens to Wet Stone and the arrow nudges 3px right; ghost fills with whitewash and its border darkens to Wet Stone. Press scales to 0.97. Focus is a 2px charcoal outline at 3px offset.
- **Ghost:** transparent, Stone Line Strong border, charcoal text.
- **Icon button:** borderless, 44px, Wet Stone text, limestone fill on hover; used for pause/replay under the diagram.

### Tabs and segmented controls
- **Scenario selector:** a 4px-padded limestone track (12px) on the whitewash frame holding four equal pills (9px); selected pill is charcoal with limestone text, unselected is Wet Stone text with whitewash hover.
- **Segmented "Antes / Con":** same track in whitewash with a sliding charcoal thumb (0.38s ease-out).
- **Demo stepper:** three 44px square nodes on a 6px stone rail; the selected node fills charcoal; a node holding a check rounds to 22px.

### Cards / Containers
- **Corner Style:** 20px for stages, estimator and contact form; 24px for the flow frame; 2px for document sheets.
- **Background:** whitewash frames hold limestone paper; the estimator sits on limestone with a stone hairline border.
- **Shadow Strategy:** none (see Elevation).
- **Internal Padding:** clamp 20px to 40px.

### Inputs / Fields
- **Style:** limestone fill, 1px Stone Line Strong border, 10px radius, 50px min height, 400 1rem Figtree. Labels sit above at 650.
- **Focus:** border goes charcoal plus a 1px charcoal ring; no glow.
- **Error:** 2px charcoal border with an alert icon and a 600 charcoal message; error is never signalled by colour alone.
- **Preview / unavailable notice:** 1.5px dashed Wet Stone panel with an icon.

### Navigation
Sticky limestone header, 76px tall, gaining a stone hairline once scrolled. Wordmark in Bricolage 620. Links are 500 Wet Stone, 44px tall, 8px radius, whitewash hover. Below 900px a 48px bordered menu button opens a full-width panel of 60px rows in display type with a full-width primary CTA. Footer navigation is limestone on charcoal with underline on hover.

### The Acequia Channel (signature)
The hero diagram and every process illustration speak this language.
- **Channel:** a 13px Channel Sand bed with a 6px Stone Line floor inside it (the double line); at-rest water is Wet Stone at 0.34 opacity; the moving pulse is solid charcoal. Branch channels are a dotted sand bed with a limestone floor.
- **Feeders:** limestone pills (8px) with sand stroke and an icon; they stroke charcoal when they send.
- **Partidor nodes:** 44px squares (5px corner in SVG) in limestone with a sand stroke and a small sand square at centre. States: `next` is a dashed Wet Stone outline, marked before it activates; `active` and `review` fill charcoal with a limestone dot; `done` rounds to 22px, strokes charcoal and draws a check; `held` keeps a near-square 5px corner, dashed charcoal, with an alert glyph. Exception nodes are dashed at rest.
- **Gate:** two small Wet Stone posts and a charcoal bar that slides closed across an exception branch when work is held for a person.
- **Detail card:** a limestone card overlaid on the diagram and sized entirely in viewBox units, with keyed rows that reveal one at a time. Variants per scenario: field card, sales pipeline (four sand-ruled lanes with a sliding charcoal-bordered deal card), chat (sand-bordered incoming bubble, charcoal outgoing bubble, dashed charcoal handoff).
- **Caption:** below a sand rule, a display-face sentence describing the current step, the disclosure label "Demostración ilustrativa · datos ficticios", and pause/replay.
- **Motion:** ease-out cubic-bezier(0.16, 1, 0.3, 1) for reveals and node changes; ease-in-out for the pipeline slide. Under reduced motion, transitions collapse and the diagram must stay meaningful as a static state.

### Route list (Antes / Con, Cómo trabajamos)
The same node language applied to steps. "Antes": dashed square nodes, slightly scattered and rotated, joined by a dashed sand rail. "Con": aligned solid charcoal nodes rounded to 22px on a solid stone rail, one filled to mark the human step. On charcoal, numbered 48px square nodes outlined in sand descend a double Wet Stone rail.

## Do's and Don'ts

### Do:
- **Do** explain any process with the acequia language: sand bed plus stone floor, square nodes, charcoal pulse.
- **Do** mark the next node with a dashed outline before it activates, and signal completion with shape (square to 22px round), a check icon and a label change together.
- **Do** give exception and human-review paths dashed borders and, in channels, a gate bar.
- **Do** size anything overlaid on the diagram in `--u` (viewBox) units so it scales with the SVG.
- **Do** use Weathered Earth Strong for secondary text on whitewash and in diagrams.
- **Do** label every demonstration "Demostración ilustrativa" with fictional data.
- **Do** keep touch targets at 44px or more and focus visible as a 2px charcoal outline.

### Don't:
- **Don't** set any text or icon in Channel Sand (#CEC5B8).
- **Don't** add purple, blue, neon, metallic gold or decorative gradients; don't introduce a hue accent.
- **Don't** use drop shadows to separate surfaces.
- **Don't** add more than the two dark charcoal moments (process band and footer) to a page.
- **Don't** let a node complete by colour change alone, or show work disappearing instead of being routed.
- **Don't** reproduce n8n-style node graphs; keep the channel-and-partidor language.
- **Don't** uppercase or letterspace labels; labels are sentence case at 600 to 650.
