# Design — MVP

## Source of Truth

Этот файл определяет только визуальные параметры и component-level правила.

Приоритеты проекта:

1. `sitemap.md` — структура и порядок секций.
2. `texts.md` — тексты, CTA и формулировки.
3. `design.md` — визуальные стили и компоненты.
4. `optimization.md` — SEO, performance, accessibility и технические ограничения.

**Бренд:** Opsfield Systems  
**Статус бренда:** working brand. По ручной проверке владельца от 13 июня 2026 года совпадение в California Secretary of State Business Search не найдено, а предполагаемый домен был свободен на момент проверки. Wordmark остаётся редактируемым до trademark clearance, подтверждения legal operator / DBA и регистрации production domain в аккаунте бизнеса.  
**Стиль:** clean B2B technology advisory + restrained enterprise SaaS + structured consulting methodology  
**Позиционирование:** diagnostic-first, senior-led, vendor-neutral, practical, no AI hype

### Quick lookup — internal

| Задача | Раздел |
|---|---|
| Цвета, typography, spacing, tokens | `Цвета` → `CSS Variable Reference` |
| Hero и diagnostic SVG | `Hero Layout` |
| Cards, comparison, proof, FAQ | `Типы карточек` |
| CTA и формы | `Buttons and CTA` / `Forms` |
| Header, skip link, footer | `Header` / `Footer` |
| Assets, print, launch constraints | `Brand Identity Launch Rules` / `Print` |
| Финальная проверка | `Design Acceptance Criteria` |

---

## Цвета

| Назначение | HEX | CSS Variable |
|---|---|---|
| Основной текст | `#0B1220` | `--text-primary` |
| Второстепенный текст | `#475569` | `--text-secondary` |
| Приглушённый текст: placeholder / disabled | `#94A3B8` | `--text-muted` |
| Текст на акценте | `#FFFFFF` | `--text-on-accent` |
| Фон страницы | `#F8FAFC` | `--bg-page` |
| Поверхности / карточки | `#FFFFFF` | `--bg-surface` |
| Чередование секций / hover card | `#F1F5F9` | `--bg-subtle` |
| Акцентный / CTA | `#1D4ED8` | `--accent` |
| Акцент hover | `#1E40AF` | `--accent-hover` |
| Акцент light: tags / chips | `#DBEAFE` | `--accent-light` |
| Borders | `#CBD5E1` | `--border-default` |
| Border focus | `#1D4ED8` | `--border-focus` |
| Success | `#16A34A` | `--state-success` |
| Error | `#DC2626` | `--state-error` |
| Warning | `#D97706` | `--state-warning` |

### Color Rules

- `#CBD5E1` используется только для borders и decorative elements.
- `#CBD5E1` запрещено использовать для основного или второстепенного текста.
- Blue — action, links, focus, active states.
- Amber — только risk / warning / dependency.
- Green — только validated outcome / success.
- Красный — только errors и critical state.
- Не использовать цвет как единственный способ передать статус.
- Основной интерфейс: 75–85% neutral / white / off-white.
- Accent colors используются дозированно, без декоративных gradients.
- Visited links: `var(--accent-hover)` for text links; or `var(--accent)` if visited/unvisited distinction is not needed (single-page anchor navigation).
- Do not rely on browser default purple.

---

## Типографика

### Font Families

```css
--font-heading: "Inter Tight", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-body: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

- Заголовки: `Inter Tight`
- H4 и основной текст: `Inter`
- Не использовать альтернативный heading font.
- Не использовать декоративные, sci-fi или startup-display fonts.
- Максимум 2 font families.

### Typography Scale

| Уровень | Размер desktop | Размер mobile | Weight | Line-height | Letter-spacing | Шрифт |
|---|---:|---:|---:|---:|---:|---|
| H1 | `52px` | `38px` | `700` | `1.1` | `-0.02em` | Inter Tight |
| H2 | `40px` | `30px` | `700` | `1.2` | `-0.01em` | Inter Tight |
| H3 | `28px` | `22px` | `600` | `1.3` | `0` | Inter Tight |
| H4 | `22px` | `18px` | `600` | `1.3` | `0` | Inter |
| Lead | `18px` | `17px` | `400` | `1.6` | `0` | Inter |
| Body | `16px` | `16px` | `400` | `1.6` | `0` | Inter |
| Small | `14px` | `14px` | `400` | `1.5` | `0` | Inter |
| XSmall | `12px` | `12px` | `400` | `1.4` | `0.01em` | Inter |

### Typography Rules

- Один H1 на страницу.
- H1 должен помещаться максимум в 2 строки на desktop и 3 строки на mobile.
- Subtitle в Hero визуально может выглядеть как lead, но семантически остаётся paragraph.
- Body line length: ориентир 60–78 символов.
- Абзац: максимум 2–4 строки.
- После 4 строк текста использовать list, card, table, visual или новый sub-block.
- Не использовать CAPS для длинных сообщений.
- Bold — только для problem, risk, deliverable, metric и CTA.
- Важный helper text и form microcopy не должен выглядеть бледным или второстепенным.

---

## Spacing Scale — 8px Grid

| Token | Значение | Использование |
|---|---:|---|
| `--space-1` | `8px` | Между icon и label, минимальный gap |
| `--space-2` | `16px` | Между связанными элементами: label → input |
| `--space-3` | `24px` | Default gap внутри блока, формы, bullets |
| `--space-4` | `32px` | Между card groups и paragraphs |
| `--space-5` | `48px` | Между sub-blocks внутри секции |
| `--space-6` | `64px` | Между секциями на mobile |
| `--space-7` | `96px` | Между секциями на desktop |

### Edge Padding

- Desktop: `40px`
- Tablet: `32px`
- Mobile: `20px`
- Card internal padding: `32px` desktop / `24px` mobile
- Panel internal padding: `48px` desktop / `24px` mobile

### Container

- Единый max-width задаётся в `optimization.md`.
- Design-файл не создаёт альтернативное значение container width.
- Максимальная ширина текстовой колонки: `720px`.

### Breakpoints

Breakpoints, responsive implementation и device QA — см. `optimization.md`.

---

## Grid and Layout

- Desktop grid: `12 columns`.
- Hero: split layout на desktop, single column на tablet/mobile.
- Standard content block: 6/6 или 5/7 columns.
- Cards: 3 columns desktop / 2 tablet / 1 mobile.
- Proof cards: одна колонка, stacked.
- Form: одна колонка на mobile; desktop может использовать 2-column layout только для коротких связанных полей.
- Large desktop увеличивает whitespace, а не ширину текста.
- Каждый экран должен выполнять одну задачу: problem, diagnosis, methodology, proof, trust, CTA или form.

### Section background rhythm

Default: all sections use `var(--bg-page)`.
Optional: even-numbered sections may use `var(--bg-subtle)` for visual rhythm when whitespace alone is insufficient.

Exceptions:
- Business & IT Diagnostic (#9): may use `var(--accent-light)` panel or distinct surface to emphasize conversion.
- Final CTA (#11): may use `var(--accent)` background with `var(--text-on-accent)`.
- Footer: dark surface per footer spec.

Once a pattern is chosen, maintain it consistently.

---

## Radii and Borders

| Component | Radius |
|---|---:|
| Input | `4px` (`--radius-sm`) |
| Button | `4px` (`--radius-sm`) |
| Card | `6px` (`--radius-md`) |
| Panel / featured block | `10px` (`--radius-lg`) |

- Structural border (v2): `2px solid var(--border-strong)` (`--ink-900`) on every block — the primary divider.
- Hairline for internal divisions: `1px solid var(--border-hair)` (`--stone-200`).
- Focus border: `var(--focus-ring)`.
- v2 is **border-led and blocky** — near-brutalist tight corners; section dividers use the shared 2px ink rule (this reverses v1, which avoided borders as the main divider).

---

## Тени

| Уровень | CSS | Использование |
|---|---|---|
| `sm` | `0 2px 4px rgba(10,10,15,0.06)` | subtle rest |
| `md` | `0 8px 20px rgba(10,10,15,0.10)` | hover, dropdown |
| `lg` | `0 24px 44px rgba(10,10,15,0.16)` | modal, sticky header |
| `hard` | `8px 8px 0 var(--ink-900)` | **signature** block shadow — headline cards |
| `brand-hard` | `8px 8px 0 var(--blue-500)` | signature block shadow on a brand block |

### Shadow Rules (v2)

- The signature elevation is the **hard 8px ink offset** (no blur, no spread) — block-print. Reserve for headline cards (hero panel, How-it-works columns, form, scenario report).
- Interactive block cards translate **−3/−3px** on hover, extending the hard shadow (the signature press). No scale-down.
- Soft ambient shadows (`md`/`lg`) are secondary — hovers only; on paper prefer **2px border + hard shadow** to atmospheric depth.

---

## Transitions

| Token | Значение | Использование |
|---|---|---|
| `--dur-fast` / `--transition-fast` | `100–150ms var(--ease-out)` | Hover, focus, button states |
| `--dur-med` / `--transition-normal` | `180–200ms var(--ease-out)` | Accordion, tooltip, dropdown |
| `--dur-slow` / `--transition-slow` | `320ms var(--ease-in-out)` | Mobile menu, modal |

Easing: `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)` (no bounce, no spring, no infinite loops).

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Motion помогает ориентации, а не развлекает.
- Запрещены scroll-jacking, parallax на mobile, autoplay animations и looping decorative motion.

---

## CSS Variable Reference

```css
:root {
  /* Text */
  --text-primary: #0B1220;
  --text-secondary: #475569;
  --text-muted: #94A3B8;
  --text-on-accent: #FFFFFF;

  /* Backgrounds */
  --bg-page: #F8FAFC;
  --bg-surface: #FFFFFF;
  --bg-subtle: #F1F5F9;

  /* Accent */
  --accent: #1D4ED8;
  --accent-hover: #1E40AF;
  --accent-light: #DBEAFE;

  /* Borders */
  --border-default: #CBD5E1;
  --border-focus: #1D4ED8;

  /* States */
  --state-success: #16A34A;
  --state-error: #DC2626;
  --state-warning: #D97706;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(11, 18, 32, 0.06);
  --shadow-md: 0 4px 12px rgba(11, 18, 32, 0.08);
  --shadow-lg: 0 8px 24px rgba(11, 18, 32, 0.12);

  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-out;
  --transition-slow: 300ms ease-in-out;

  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 64px;
  --space-7: 96px;

  /* Typography */
  --font-heading: "Inter Tight", "Inter", system-ui,
    -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: "Inter", system-ui,
    -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

**Note:** This block is the single source of truth for all design tokens in CSS. If a value changes in the color, spacing, or shadow tables above, this block must be updated to match.

---

## Визуальный стиль

### Must Feel Like

- Executive clarity
- Technical credibility
- Diagnostic structure
- Calm confidence
- Senior-led boutique advisory
- Practical roadmap thinking
- Vendor-neutral decision support
- Safe first step before implementation

### Must Not Feel Like

- Outsourcing vendor
- Staff augmentation marketplace
- SaaS product
- Generic corporate brochure
- Creative agency
- AI-hype startup
- Immigration-service website
- Big 4 clone with abstract messaging

"Immigration-service website" means:
- No flag imagery, passport or visa stamp visuals
- No globe-with-arrows graphics
- No patriotic color schemes (red/white/blue prominence)
- No "your dream" or "new beginning" emotional framing
- No stock photos of diverse professionals at border/airport

### Approved Visual Types

- Diagnostic system map
- Process flow
- CRM/data-flow diagram
- Bottleneck map
- Priority matrix
- Automation opportunity map
- AI readiness scorecard
- Roadmap timeline
- Before / approach / outcome proof card
- Architecture / integration diagram

### Prohibited Visual Types

- Stock handshake
- Generic meeting-room photos
- Developers typing code as hero
- AI robot
- Glowing brain
- Neon sci-fi gradients
- Abstract 3D blobs
- Decorative dashboards without business meaning
- Fake client logos or awards

---

## Hero Layout

### Desktop

- Split: left `55%` / right `45%`.
- Left order:
  1. Eyebrow / category label
  2. H1
  3. Subtitle
  4. Supporting text
  5. Primary and secondary CTA
  6. Trust line
- Right: diagnostic visual, system map SVG or process diagram.
- Vertical alignment: center.
- Min-height: `540px`.
- Primary CTA remains the strongest visual action.

### Tablet

- Single column.
- Order: H1 + subtitle + CTA → trust line → visual.
- Visual: full-width simplified diagram.
- Visual max-height: `300px`.

### Mobile

- Single column.
- Order: H1 + subtitle + primary CTA + secondary CTA → trust line.
- Primary CTA: full width.
- Secondary CTA: text link or outlined button.
- Complex hero visual: hide or replace with compact diagnostic map.
- CTA must appear before any large visual.

### Hero Visual

Recommended structure:

```text
Processes → CRM / RevOps → Data → Automation → IT Systems
                         ↓
               Bottlenecks / Gaps / Risks
                         ↓
             Diagnostic → Roadmap → Implementation
```

The visual must explain the service, not decorate the page.

### Hero Diagnostic Map — visual specification

Type: node-and-connection SVG diagram
Layout: horizontal flow desktop, vertical mobile

Nodes (5):
- Processes (GitBranch icon)
- CRM / RevOps (Database icon)
- Data (BarChart3 icon)
- Automation (Workflow icon)
- IT Systems (Layers icon)

Node style:
- Background: `var(--bg-surface)`
- Border: `1px solid var(--border-default)`
- Border-radius: `12px`
- Padding: `12px 16px`
- Icon: `20px`, `var(--accent)`
- Label: Small (`14px`), `var(--text-primary)`

Connections:
- `1px solid var(--border-default)` between nodes
- Direction arrows optional

Center callout:
- Text: `Bottlenecks · Gaps · Risks`
- Background: `var(--accent-light)`
- Border: `1px solid var(--accent)`
- Text color: `var(--accent-hover)`, Small weight `600`

Bottom flow:
- `Diagnostic → Roadmap → Implementation`
- Arrow sequence, Small, `var(--text-secondary)`

Sizes:
- Desktop: max `480px` wide × `360px` tall
- Tablet: max `100%` × `300px`
- Mobile: max `100%` × `240px` (simplified: nodes stacked vertically, center callout below)

---

## Типы карточек

### Service Card

Used in:

- What We Diagnose
- AI & Process Automation

Structure:

1. Lucide icon, `24px`
2. H4 title
3. Description, maximum 2–3 lines
4. Output or deliverable
5. Contextual CTA when provided in `texts.md`

Rules:

- Padding: `24px`
- No fixed min-height
- Grid: 3 desktop / 2 tablet / 1 mobile
- Icon is supporting, never the only label
- No technology logo as primary visual

### Step Card

Used in:

- How the Diagnostic Works
- What Happens After You Submit the Request sub-block inside Business & IT Diagnostic

Structure:

1. Step number
2. H4 title
3. Short description
4. Output or decision

Rules:

- Step number: accent color, visually prominent
- Padding: `24px`
- Horizontal sequence on desktop
- Vertical stepper on mobile
- Use connecting lines only when they clarify sequence

### Scenario / Proof Card

Used in:

- Diagnostic Scenarios

Structure:

1. Client type
2. Problem
3. Approach
4. Outcome or operational change
5. Timeline, only if confirmed
6. Anonymized note where required

Rules:

- Padding: `32px`
- Border-left: `4px solid var(--accent)`
- One-column stacked layout
- Do not invent names, logos or testimonials.
- A real anonymized case must be supported by an internal source record and approval.
- An illustrative composite must be labeled exactly as illustrative, must not use `client`, `delivered`, or `adopted` as factual proof language, and must not be styled as a verified metric tile.
- Unverified figures may explain a hypothetical diagnostic pattern only; they must never be presented as actual Opsfield performance or a guaranteed outcome.

### Comparison Card / Table

Used in:

- Why Opsfield Systems

Structure:

- What others do first
- What Opsfield does first

Rules:

- Use side-by-side table on desktop
- Stack each comparison pair into a card on mobile
- Opsfield column receives subtle `--accent-light` background
- Do not make competitors look deceptive; compare operating approaches

### Mobile comparison layout

Each table row becomes a paired card:
- Top half: competitor approach
  - Background: `var(--bg-subtle)`
  - Padding: `16px`
  - Label: `Others` in XSmall, `var(--text-muted)`
- Bottom half: Opsfield approach
  - Background: `var(--accent-light)`
  - Padding: `16px`
  - Label: `Opsfield` in XSmall, `var(--accent-hover)`
- Divider: `1px solid var(--border-default)`
- Card radius: `12px`
- Gap between cards: `var(--space-3)`

Do not split into two separate lists.
The paired contrast is the core message.

### Delivery Role Card

Used in:

- Delivery Model

Structure:

1. Role
2. Scope of responsibility
3. Relevant systems or expertise
4. Confirmed credentials only

Rules:

- Maximum 2 cards for MVP
- Do not present unverified real clients, real metrics, certifications, awards, logos, reviews, names, years, or Fortune 500 claims.
- Illustrative composite figures are allowed only when explicitly labeled as anonymized composites.
- No stock or fictional portrait placeholders presented as real people; use a semantic role icon when no approved portrait exists.

### ICP Qualifier

Used in:

- Hero trust / qualifier line
- FAQ company-fit answer

Content:

- `Best fit: B2B companies with 50–250 employees`

Rules:

- Present as supporting text or a compact neutral chip, never as the H1 or dominant badge.
- Use `--bg-subtle`, `--text-secondary`, and a standard border; do not style as a warning, eligibility gate, or exclusive-membership badge.
- Keep the qualifier visible on mobile without placing it above the primary value proposition.
- Do not repeat the employee range across multiple cards or sections.
- Companies outside the range are not visually marked as unqualified.

### Fit / Not Fit Answer Pattern

Used in:

- FAQ qualification answers

Structure:

1. Question: `Who do you work with best?`
2. Four concise fit criteria
3. Question: `When are you not the right fit?`
4. Four concise not-fit criteria
5. Neutral no-fit outcome statement

Rules:

- Use semantic bullet lists, not a dense paragraph on mobile.
- `CheckCircle2` and `XCircle` may support labels, but text must carry the meaning.
- Fit and not-fit states must not rely on green / red alone.
- Do not use arrogant wording, budget shaming, or an automatic company-size rejection.
- Automation and AI uncertainty belong in Fit; tool-first execution without problem definition belongs in Not Fit.

### Diagnostic Offer Card

Used in:

- Business & IT Diagnostic

Structure:

1. Badge: `First safe step`
2. Offer title
3. Complimentary 30–45 minute fit review
4. What the visitor receives
5. What is not included
6. Primary CTA
7. Low-risk microcopy

Rules:

- Featured panel, not pricing card
- Background: `--accent-light` or white with accent border
- CTA: `Request a Business & IT Diagnostic`
- Must not promise a free full audit, roadmap or ROI calculation

### Risk-Reduction Panel

Used in:

- Before You Commit sub-block inside Business & IT Diagnostic

Structure:

1. H2 or H3
2. Review assets
3. Access / NDA rule
4. Privacy notice
5. Optional link to Privacy Policy

Rules:

- Calm, low-friction styling
- Use Shield / FileText icons only as support
- Avoid warning-red treatment
- Place close to the form

### FAQ Item

Structure:

1. Question, H4
2. Chevron indicator
3. Collapsible answer

Rules:

- Divider: `1px solid var(--border-default)`
- Padding: `20px 0`
- Full question is a button
- Entire trigger has minimum `44px` touch height
- Open state must not rely only on icon rotation
- Only one item may be open by default
- First item may be open on initial load

---

## Buttons and CTA

Buttons are blocky (v2): Mulish `700`, `15px`, near-square corners, `2px` borders.

### Primary Button

- Background: `var(--accent)`; Text: `var(--accent-on)`; Border: `2px solid var(--accent)`
- Hover: `var(--accent-hover)` (fill + border)
- Radius: `4px` (`--radius-sm`); Minimum height: `44px`; Padding: `14px 22px`
- Optional trailing icon: ArrowRight, `20px`

### Secondary Button (outline)

- Background: transparent; Text: `var(--ink-900)`; Border: `2px solid var(--ink-900)`
- Hover: **invert to filled ink** — background `var(--ink-900)`, text `var(--paper)`
- Radius: `4px`; Minimum height: `44px`

### Additional variants (v2)

- `dark` (solid ink), `on-brand` (paper fill for use inside blue blocks), `on-brand-outline` (paper border on blue).

### Text Link

- Color: `var(--accent)`
- Underline on hover and focus
- Arrow icon optional
- Never use muted gray for primary navigation or important action

### CTA Hierarchy

- Maximum one primary CTA per section.
- Maximum one secondary CTA beside it.
- Primary action across the page: diagnostic request.
- Contextual CTAs must use exact wording from `texts.md`.
- Generic `Contact Us`, `Learn More`, `Submit` are prohibited as primary CTA.
- All CTA destinations are defined in `sitemap.md`.

---

## Forms

### Visual Structure

- Visible labels above inputs.
- Placeholder never replaces label.
- Required status communicated by text, not only an asterisk.
- Input minimum height: `44px`.
- Textarea minimum height: `144px`.
- Gap label → input: `8px`.
- Gap field → next field: `24px`.
- Error message directly below field.
- Submit button visible without ambiguity.
- Privacy notice directly before or after submit control.

### States

| State | Visual rule |
|---|---|
| Default | White background, default border |
| Hover | Slightly darker border |
| Focus | `2–3px` visible focus ring using `--border-focus` |
| Error | Error border + text explanation |
| Success | Success icon + confirmation text |
| Disabled | Muted surface and text, reason must remain clear |
| Loading | Button keeps width, shows loading label / spinner |

### Submission State

On submit click:
- Button: text changes to `Submitting...`, spinner appears, width preserved, `pointer-events: none`
- Fields: opacity `0.6`, `pointer-events: none`
- No overlay, no modal, no redirect until confirmed
- If >3 seconds without response: show `Still processing...` below button in `var(--text-secondary)`, Small
- Prevent duplicate submission via disabled button state

### Form Panel

- Form panel radius: `24px`.
- Padding: `32px` desktop / `24px` mobile.
- Show the 4 required fields first: Name, Work Email, Company, Main Challenge.
- Place an accessible disclosure control after the required fields: `Add more context (optional)`.
- Keep Company Website, Role, Company Size, Timeline, and Request Type collapsed by default.
- Company Size is qualification context only: do not preselect 51–100 / 101–250, visually highlight those options, or show rejection messaging for other ranges.
- Expanded optional fields remain visually subordinate but fully readable and editable.
- Disclosure control must show open / closed state with text plus icon; do not rely on icon or color alone.
- Place “What happens next” near the form.
- Place “Four required fields. Additional context is optional.” and “No full system access is required” near submit.
- No multi-step wizard, full-screen form modal, or forced optional step on MVP.
- No hidden consent language.

Field list, routing and technical validation rules live in `optimization.md`.

### Progressive Disclosure Control

Element: `<button>` with `aria-expanded` or `<details><summary>`
Appearance: text link style (not full-width button, no background)
Text closed: `Add more context (optional)`
Text open: `Hide optional fields`
Icon: ChevronDown (closed) → ChevronUp (open), `16px`, right of text
Color: `var(--accent)`
Hover: underline
Touch target: minimum `44px` height
Transition: `var(--transition-normal)` on content reveal
Gap from last required field: `var(--space-4)` (`32px`)
Gap to first optional field: `var(--space-3)` (`24px`)

---

## Cookie Consent

- Compact bottom bar or small non-blocking panel.
- Message remains readable on mobile.
- Actions:
  - Accept
  - Decline
  - Privacy Policy
- Accept and Decline must be visually accessible.
- Do not preselect optional analytics consent.
- Do not use a full-screen blocking modal.
- Do not use dark patterns.
- Cookie and tracking behavior is defined in `optimization.md`.

---

## Header

### Skip Link

First focusable element on the page.
Visually hidden by default. Visible on `:focus`.
Text: `Skip to main content`
Target: id on `<main>` element

Style on `:focus`:
- `position: fixed`
- `top: var(--space-1)`
- `left: var(--space-1)`
- `background: var(--accent)`
- `color: var(--text-on-accent)`
- `padding: 8px 16px`
- `border-radius: 8px`
- `z-index`: above sticky header
- font: Body weight `600`

### Desktop

- Logo left.
- Navigation center/right:
  - Services
  - How It Works
  - Results
  - FAQ
- Primary CTA right: `Request Diagnostic`.
- Sticky state may use `shadow-lg`.
- Header height: `72–80px`.

### Mobile

- Logo left.
- Menu trigger right.
- Drawer contains the same links as desktop.
- Primary CTA appears near the top and bottom of drawer.
- Touch targets: minimum `44px`.
- No mega menu.

---

## Footer

- Dark navy or deep slate surface is allowed.
- Three groups:
  - Company
  - Get Started
  - Legal
- Include:
  - Privacy Policy
  - Terms of Use
  - Cookie Policy
- Footer CTA panel appears above footer links.
- Do not create a large link directory.
- Social icons are secondary, not dominant.

### Footer dark surface (if used)

| Element | Color | Contrast on #0B1220 |
|---|---|---|
| Background | #0B1220 or #1E293B | — |
| Body text | #F8FAFC | ~16:1 ✓ |
| Links | #93C5FD (blue-300) | ~8.5:1 ✓ |
| Links hover | #BFDBFE (blue-200) | ~11:1 ✓ |
| Muted text | #94A3B8 | ~5.8:1 ✓ |
| Divider | rgba(248,250,252,0.12) | — |

If footer uses dark surface, these colors override the default light-surface palette within footer only.

---

## Icon Inventory

**Library:** Lucide  
**Style:** line  
**Stroke:** `1.5px`  
**Use:** functional and semantic only

### Navigation

- Menu
- X
- ChevronDown
- ChevronRight
- ArrowRight
- ArrowUpRight
- ExternalLink

### CTA / Actions

- ArrowRight
- Calendar
- FileText
- Send
- Download

### Services

- GitBranch — processes
- Database — data
- BarChart3 — analytics
- Cpu — automation / AI
- Shield — risk
- Layers — systems
- Workflow — automation
- Bot — AI agents

### Status

- CheckCircle2 — fit / success
- XCircle — not fit
- AlertTriangle — warning / risk
- Clock — timeline
- Info — information

### Contact

- Mail
- Phone
- MapPin
- Linkedin
- ExternalLink

### Sizes

- In text / buttons: `20px`
- In cards: `24px`
- Decorative / hero: `32px`
- Minimum touch target around icon: `44px`

### Icon Rules

- Do not mix icon libraries.
- Do not use icons without text for unfamiliar actions.
- Do not use decorative icons as substitutes for proof.
- Bot icon may appear only inside AI & Process Automation, never in Hero.

---

## Section-Level Visual Map

The order follows `sitemap.md` and `texts.md`.

| Section | Recommended visual treatment |
|---|---|
| Hero | Split text + diagnostic system map |
| Problem Section | 3–5 symptom / root-cause cards |
| What We Diagnose | Service cards with outputs |
| AI & Process Automation | Process-to-automation flow, restrained accent |
| How the Diagnostic Works | 3-step numbered sequence |
| Diagnostic Scenarios | Full-width anonymized scenario / proof cards |
| Why Opsfield Systems | Comparison table / paired cards |
| Delivery Model | Two senior delivery-role cards |
| Business & IT Diagnostic | One composite panel: offer → risk reduction → post-submit steps → form |
| FAQ | Accessible accordion; Fit / Not Fit answers use semantic lists |
| Final CTA | Strong CTA panel with primary + secondary action |

---

## Top-Level Section Grouping

- The landing page has exactly 11 top-level visual sections from `sitemap.md`.
- Business & IT Diagnostic is one composite conversion section, not four visually disconnected full-width sections.
- Inside that section, use clear sub-block hierarchy for the offer, `Before You Commit`, post-submit steps, and form.
- Sub-blocks may use cards or panels, but they share one section background, one H2 context, and one conversion narrative.
- Do not create separate navigation anchors for the risk-reduction and post-submit sub-blocks.
- Keep `#diagnostic-request-form` as the nested form target for CTA routing.

---

## Visual Fallbacks

If an approved asset is missing, use a semantic placeholder.

```html
<!-- VISUAL: diagnostic system map showing interconnected nodes:
Processes, CRM / RevOps, Data, Automation and IT Systems -->
```

Placeholder styling:

```css
.visual-placeholder {
  background: var(--bg-subtle);
  border: 1px dashed var(--border-default);
  border-radius: 16px;
  color: var(--text-secondary);
  min-height: 240px;
  padding: 24px;
}
```

Rules:

- Placeholder text must explain what asset belongs there.
- Do not use lorem ipsum.
- Do not use random stock images as fallback.
- Do not present placeholders as completed proof.
- Placeholder comments must be removed or replaced before production launch.

---

## Правила текста в Layout

- Тексты и CTA берутся только из `texts.md`.
- Разрешено сокращать текст для fit-to-layout без изменения смысла.
- Разрешено объединять два соседних предложения.
- Для mobile разрешены shorter heading variants, если смысл сохранён.
- Не менять рабочий язык сайта с English.
- Использовать Opsfield Systems как рабочий бренд; не переименовывать без owner approval.
- Не создавать новые offers, pages, cases, metrics, logos, certifications или reviews.
- Не использовать lorem ipsum.
- Не переписывать diagnostic-first positioning.

---


## Brand Identity Launch Rules

- Использовать `Opsfield Systems` как рабочее название во всех макетах.
- Не добавлять `LLC`, `Inc.`, `Corp.`, `®` или другой legal / registration marker без подтверждённого статуса.
- Wordmark и logo lockup должны оставаться редактируемыми до завершения clearance; не переводить название в необратимые image assets.
- Не размещать неподтверждённый production domain, email или social handle внутри макетов.
- Social cards, favicon, legal footer и exported assets обновляются только после финального owner approval бренда и домена.

### Development placeholders

Favicon: simple `O` lettermark in `var(--accent)` on transparent, sizes `32×32` and `180×180` (Apple touch icon).

OG image: `1200×630`, `var(--bg-page)` background, `Opsfield Systems` centered in `var(--text-primary)`, subtitle below in `var(--text-secondary)`.

Both must be replaced with approved brand assets before production deployment.
Do not include placeholder assets in production launch.

---

## Print

`@media print`:
- Remove sticky header, footer CTA panel, cookie banner
- Show simplified header: logo text + site URL
- All backgrounds → white
- All text → `var(--text-primary)` or `#000`
- Show link URLs: `a::after { content: " (" attr(href) ")"; }`
- Hide hero visual, decorative SVG, icons
- Form section → `Visit [domain] to request a diagnostic`
- `page-break-before`: FAQ, Final CTA
- Body font: `11pt`; H2: `14pt`; H1: `18pt`
- Remove all transitions and animations

## Design Acceptance Criteria

- Используется рабочий бренд Opsfield Systems; предварительная California name search и проверка доступности домена отмечены как owner-reported, но logo и wordmark остаются редактируемыми до trademark clearance и регистрации домена.
- В логотипе и footer отсутствуют неподтверждённые `LLC`, `Inc.` и `®`.
- Заголовки используют только Inter Tight.
- Body использует Inter.
- Цвета используют утверждённые CSS variables.
- `#CBD5E1` не используется как текстовый цвет.
- Spacing построен на 8px grid.
- Breakpoints не дублируются и берутся из `optimization.md`.
- Hero соответствует 55/45 desktop layout.
- Primary CTA видим без скролла.
- Все секции из `sitemap.md` имеют визуальное решение.
- AI section не выглядит как AI-hype.
- O-1 Readiness Support присутствует только как вторичная карточка в What We Diagnose, один FAQ и один form request type; отсутствует в Hero, H1, header nav, primary CTA, meta и primary JSON-LD Service.
- Cards сканируются за 5–8 секунд.
- FAQ имеет доступный accordion pattern.
- Form содержит visible labels, clear states и privacy notice.
- Нет fake logos, fake metrics, fake testimonials или fake awards.
- Нет stock handshake, meeting-room cliché, robots или neon gradients.
- Motion отключается при `prefers-reduced-motion`.
- Все кликабельные элементы имеют minimum 44px touch target.
- Design не создаёт новые страницы или секции вне `sitemap.md`.
