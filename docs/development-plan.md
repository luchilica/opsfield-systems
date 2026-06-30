# Development Plan — Opsfield Systems MVP

## Status

**Architecture decision:** сохранить существующую реализацию на **Next.js App Router + React + TypeScript + Vercel Preview + Resend**. Миграция на Astro отменена.

**Причина:** четыре первых этапа предыдущего Next.js-плана уже выполнены. Переписывание рабочего frontend на Astro не создаёт сопоставимой бизнес-ценности, но увеличивает срок запуска, риск регрессий и расход Claude Code.

**Режим проекта:** zero-budget pre-launch.

**Разработка:** владелец проекта с помощью Claude Code. Других разработчиков, AI-сервисов и платных инструментов нет.

### Подтверждённо выполнено

Выполнены ровно четыре первых этапа предыдущего Next.js-плана:

| Этап | Статус | Что считается готовым |
|---:|---|---|
| 0 | Completed | Локальное окружение, GitHub repository, Next.js project, Vercel connection |
| 1 | Completed | Design foundation: CSS Custom Properties, typography, spacing, Button/Card, fonts |
| 2 | Completed | Layout shell: SkipLink, Header, Footer, mobile navigation, 11 section containers |
| 3 | Completed | Контентные секции 1–8, 10–11 |

### Не считать выполненным

Следующие части не выполнены, даже если в repository существуют частичные файлы или placeholders:

- Business & IT Diagnostic conversion section;
- Diagnostic Request Form;
- server-side form processing;
- Resend owner notification и visitor auto-reply;
- legal pages и privacy behavior;
- cookie consent;
- production metadata, canonical, structured data, sitemap и robots logic;
- accessibility/performance release audit;
- contract/E2E tests и CI;
- GA4;
- production deployment и monitoring.

**Текущий следующий этап:** этап 4 — синхронизация документации и Claude Code governance. После него этап 5 проверяет готовые этапы 0–3 без переписывания.

---

## Business Decision

### Почему сохраняется Next.js

- Уже созданный код является активом проекта.
- Для MVP главный риск — не framework, а оффер, доверие, форма, lead routing, legal readiness и качество первого трафика.
- Next.js позволяет закончить MVP без смены языка, component model и repository structure.
- Миграция сейчас не улучшит конверсию пропорционально затраченному времени.
- При необходимости hosting можно сменить без переписывания frontend.

### Принятый технический долг

Next.js тяжелее Astro для статической landing page. Vercel также создаёт platform coupling для Route Handler и deployment. Этот долг принимается до появления одного из триггеров:

- hosting cost становится экономически невыгодной;
- platform restriction блокирует production;
- performance не проходит release thresholds после нормальной оптимизации;
- появляются несколько языков, регулярный content publishing или значительно больше страниц;
- form backend становится ненадёжным;
- отдельный ADR доказывает положительный ROI миграции.

Framework preference без измеримой проблемы не является основанием для миграции.

---

## Hosting and Funding Decision

### Development / preview

- Vercel Hobby используется только для development, Deploy Preview и закрытого pre-launch review.
- Preview всегда `noindex,nofollow`.
- Preview не используется как публичный коммерческий B2B lead-generation сайт.
- Claude Code не выполняет production deploy.

### Commercial production при бюджете $0

**Основной zero-budget production path:** сохранить Next.js codebase и развернуть тот же проект на Netlify Free через поддерживаемый Next.js adapter.

Это не Astro migration и не переписывание framework. Меняются только deployment configuration, environment variables и platform-specific проверки.

### Commercial production после появления бюджета

Альтернатива — Vercel Pro без смены hosting architecture.

### Минимальный неизбежный расход

Полноценный production launch остаётся заблокирован до регистрации собственного домена и подтверждения legal operator / DBA. Без собственного домена:

- нет стабильного production canonical;
- невозможно нормально подтвердить branded sender в Resend;
- visitor auto-reply нельзя считать production-ready;
- доверие к B2B consulting site существенно ниже.

До появления бюджета проект доводится до полностью готового pre-launch состояния.

---

## Source of Truth

Активные файлы проекта:

1. `sitemap.md` — страницы, секции, URL, anchors, internal links.
2. `texts.md` — approved copy, CTA, metadata, form copy, legal drafts.
3. `design.md` — visual tokens, component rules, responsive behavior.
4. `optimization.md` — SEO, accessibility, performance, analytics, privacy.
5. `vibe-coding-stack.md` — текущий stack и Claude Code workflow после синхронизации.
6. `multilingual.md` — deferred multilingual strategy и launch criteria.
7. `development-plan.md` — порядок реализации и статусы.

### Priority hierarchy

При конфликте content/structure:

```text
sitemap.md → texts.md → design.md → optimization.md
```

При конфликте implementation:

```text
development-plan.md → актуальный vibe-coding-stack.md
```

Для multilingual scope:

```text
multilingual.md
```

Но multilingual-файл не может автоматически запускать framework migration или создание localized routes в English-only MVP.

### Read-only rule

Файлы в `docs/source-of-truth/` read-only для обычных code tasks. Их изменение выполняется только отдельной documentation task по прямому решению владельца.

---

## Decisions of the Owner

| Вопрос | Решение |
|---|---|
| Кто разрабатывает | Владелец с помощью Claude Code |
| Бюджет до production readiness | $0 |
| Framework | Существующий Next.js App Router |
| React | Существующая совместимая версия; без необязательного major upgrade |
| TypeScript | Strict |
| Styling | Существующие CSS Modules / CSS Custom Properties |
| Icons | `lucide-react`, только если уже установлен и используется единообразно |
| Development hosting | Vercel Hobby Preview |
| Zero-budget commercial production | Netlify Free с тем же Next.js codebase |
| Paid production alternative | Vercel Pro |
| Form UI | Native semantic HTML, enhanced by React |
| Form backend | Next.js Route Handler / API Route |
| Email | Resend; test mode до verified domain |
| CMS | Нет |
| Database | Нет |
| Authentication | Нет |
| Analytics | GA4 только после consent и production activation |
| Search Console | После production domain |
| Uptime service | Не добавлять до launch; использовать platform monitoring и ручные проверки |
| Git branches | `main` + short-lived `feature/*` |
| Staging branch | Не использовать |
| CI | Lightweight GitHub Actions + release checks locally |
| Languages MVP | Только English (`en-US`) |
| i18n routes | Не создавать до выполнения business launch criteria |
| Production actions | Только вручную владельцем |

---

## Zero-Budget Rules

### Разрешено

- Claude Code;
- private GitHub repository;
- Vercel Deploy Previews;
- Netlify Free для будущего commercial production;
- Resend test mode;
- GitHub Actions в пределах бесплатного лимита;
- Playwright, axe-core и Lighthouse локально;
- GA4 account и tracking code preparation без загрузки до consent;
- open-source dependencies после dependency review.

### Не добавлять сейчас

- Astro migration;
- Postmark;
- paid CMS;
- database;
- paid form provider;
- Better Stack или другой paid monitoring;
- GTM;
- session replay;
- heatmaps;
- ad pixels;
- translation SaaS;
- paid UI kit;
- permanent staging branch;
- новые сервисы «на будущее»;
- full browser matrix в каждом PR, если это расходует бесплатные CI minutes без необходимости.

### Dependency gate

Перед установкой package Claude Code обязан указать:

1. какую конкретную проблему решает package;
2. почему native Next.js / React / browser API недостаточны;
3. runtime и bundle impact;
4. security и maintenance risk;
5. license;
6. можно ли отложить dependency.

Без отдельного одобрения package не устанавливается.

---

## Target Repository Boundary

Не перестраивать repository только ради соответствия схеме. Существующие пути сохраняются, если они не создают defect.

```text
/
├── CLAUDE.md
├── CLAUDE.local.md                       # gitignored
├── .claude/
│   ├── settings.json
│   ├── settings.local.json               # gitignored
│   ├── rules/
│   │   ├── architecture.md
│   │   ├── content-protection.md
│   │   ├── accessibility-seo.md
│   │   └── forms-testing.md
│   └── hooks/
│       ├── protect-source-files.sh
│       └── block-destructive-command.sh
├── .github/
│   └── workflows/quality.yml
├── docs/
│   ├── source-of-truth/
│   │   ├── sitemap.md
│   │   ├── texts.md
│   │   ├── design.md
│   │   ├── optimization.md
│   │   ├── vibe-coding-stack.md
│   │   ├── multilingual.md
│   │   └── development-plan.md
│   ├── architecture-decisions/
│   │   └── ADR-001-keep-nextjs.md
│   ├── audits/
│   │   └── current-codebase-audit.md
│   └── component-registry.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-of-use/page.tsx
│   ├── cookie-policy/page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── api/submit/route.ts
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   ├── forms/
│   └── analytics/
├── lib/
│   ├── constants.ts
│   ├── validation.ts
│   ├── analytics.ts
│   └── site-config.ts
├── public/
├── tests/
│   ├── contracts/
│   ├── e2e/
│   └── accessibility/
├── next.config.ts
├── playwright.config.ts
├── package.json
└── package-lock.json
```

### Architecture rules

- Server Components используются по умолчанию.
- `"use client"` добавляется только для реального browser interaction.
- Main copy, navigation, FAQ answers и legal content присутствуют в rendered HTML.
- Не превращать landing page в SPA.
- Не добавлять global state manager.
- Не добавлять database, authentication или CMS.
- Не заменять стабильный Route Handler на Server Actions без business reason.
- Не переносить copy в YAML/JSON только ради имитации отменённой Astro-архитектуры.
- Hardcoded approved copy защищается contract tests и minimal diff.
- Working behavior важнее архитектурной косметики.

---

## Claude Code Governance

### `CLAUDE.md`

Максимум 200 строк. Содержит:

- Opsfield Systems project summary;
- Next.js App Router stack;
- список source-of-truth files;
- priority hierarchy;
- exact 11-section rule;
- запрет invented content и copy rewrite;
- запрет framework migration;
- запрет production deploy;
- ссылки на `.claude/rules/`.

### Rule files

#### `.claude/rules/architecture.md`

- сохранять Next.js App Router;
- не добавлять Astro, Remix, Vue, Svelte, CMS или database;
- не выполнять broad folder restructure;
- не обновлять major framework внутри feature task;
- не создавать route, отсутствующий в `sitemap.md`;
- не устанавливать dependency без owner approval.

#### `.claude/rules/content-protection.md`

- `texts.md` immutable;
- не сокращать, не объединять, не улучшать и не переводить approved copy;
- не создавать отдельный mobile copy;
- не добавлять fake metrics, testimonials, logos, awards или credentials;
- не добавлять old brand и O-1 scope.

#### `.claude/rules/accessibility-seo.md`

- semantic HTML;
- один H1;
- stable section IDs;
- WCAG 2.2 AA target;
- keyboard access;
- FAQ content в initial HTML;
- preview всегда noindex;
- metadata/canonical только из approved sources.

#### `.claude/rules/forms-testing.md`

- exact form schema;
- server-side validation;
- honeypot;
- no PII in analytics/logs;
- duplicate-submit protection;
- no visitor auto-reply до verified domain;
- failed/skipped tests всегда раскрываются.

### Baseline settings

Синтаксис проверяется через `/permissions` в установленной версии Claude Code.

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "autoMemoryEnabled": false,
  "disableBypassPermissionsMode": "disable",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npm test *)",
      "Bash(npx playwright *)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Edit(./docs/source-of-truth/**)",
      "Bash(git push *)",
      "Bash(git reset --hard *)",
      "Bash(git clean *)",
      "Bash(vercel *)",
      "Bash(netlify deploy *)",
      "Bash(npm publish *)",
      "Bash(rm -rf *)"
    ]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "autoAllowBashIfSandboxed": false,
    "allowUnsandboxedCommands": false,
    "filesystem": {
      "denyRead": ["./.env", "./.env.*", "./secrets"],
      "denyWrite": ["./docs/source-of-truth"]
    },
    "network": {
      "allowedDomains": ["registry.npmjs.org", "github.com"]
    }
  }
}
```

### Working workflow

```text
feature/task-name
→ Claude Code Plan Mode
→ owner approves plan
→ minimal implementation
→ local checks
→ owner reviews diff
→ owner commits/pushes
→ Deploy Preview
→ owner performs browser review
→ owner merges
```

Claude Code не выполняет:

- `git push`;
- production deploy;
- DNS changes;
- billing actions;
- external account changes;
- secret rotation;
- source-of-truth edits внутри code task;
- destructive Git/filesystem commands.

---

# Этапы реализации

---

## Этап 0. Окружение и repository

**Статус:** Completed — не переделывать.

### Уже выполнено

- создан Next.js App Router project;
- подключён TypeScript;
- создан GitHub repository;
- Vercel подключён для preview;
- локальный development server запускается;
- Node/npm environment работает.

### Контроль при аудите

- проверить актуальные версии из `package.json` и lockfile;
- не считать указанную в старом плане версию фактической без проверки;
- не обновлять major автоматически.

---

## Этап 1. Design foundation

**Статус:** Completed — не переделывать.

### Уже выполнено

- CSS Custom Properties;
- typography и spacing;
- fonts;
- Button/Card primitives;
- responsive breakpoints;
- reduced-motion baseline.

### Контроль при аудите

- сверить tokens с `design.md`;
- найти literal colors/spacing при наличии token;
- проверить `#CBD5E1` только как border/decorative color;
- проверить 44px touch targets;
- не переносить стили в новую систему без defect.

---

## Этап 2. Layout shell

**Статус:** Completed — не переделывать.

### Уже выполнено

- SkipLink;
- Header;
- Footer;
- mobile drawer;
- 11 top-level sections;
- anchor navigation;
- sticky header;
- 404 baseline.

### Контроль при аудите

- focus trap;
- Escape и возврат фокуса;
- `scroll-margin-top`;
- корректные footer links;
- отсутствие horizontal scroll.

---

## Этап 3. Контентные секции 1–8, 10–11

**Статус:** Completed — не переделывать.

### Уже выполнено

- Hero;
- Problem Section;
- What We Diagnose;
- AI & Process Automation;
- How the Diagnostic Works;
- Diagnostic Scenarios;
- Why Opsfield Systems;
- Delivery Model;
- FAQ;
- Final CTA.

### Контроль при аудите

- exact approved copy;
- CTA targets и `data-request-type`;
- Hero mobile order;
- comparison paired cards mobile;
- scenario disclaimer;
- FAQ semantics;
- no fake proof;
- no old brand;
- no O-1.

---

## Этап 4. Синхронизация документации и Claude Code governance

**Статус:** Next.

**Цель:** устранить конфликт Astro/Next.js до продолжения разработки.

### Действия

1. Сохранить этот файл как `docs/source-of-truth/development-plan.md`.
2. Создать `docs/architecture-decisions/ADR-001-keep-nextjs.md`.
3. Обновить `vibe-coding-stack.md`:
   - текущий stack — Next.js;
   - Vercel только preview;
   - zero-budget production — Netlify Free без framework rewrite;
   - Resend вместо Postmark;
   - сохранить Claude Code governance и tests.
4. Обновить `optimization.md`:
   - убрать Astro-specific implementation;
   - убрать Netlify Forms как обязательный form backend;
   - указать Next.js Route Handler;
   - разделить preview и production SEO behavior;
   - provider list формировать по фактически активному production stack.
5. Обновить `multilingual.md`:
   - English-only MVP;
   - Next.js-compatible future locale routing;
   - не создавать routes/directories сейчас.
6. Обновить `sitemap.md` → Project File Map.
7. Пометить Astro plan как `superseded — do not use`.
8. Пометить старый Next.js plan как historical, если он содержит устаревшие решения.
9. Архивировать Clearpath и multi-page документы.
10. Создать `CLAUDE.md`, rule files, settings и hooks.
11. Проверить `/permissions`.
12. Создать `docs/component-registry.md`.

### Repository search

Найти и классифицировать:

```text
Astro
Netlify Forms
Postmark
Clearpath
Formspree
staging branch
Vercel Hobby production
```

### Acceptance criteria

- [ ] В active documentation один stack.
- [ ] Next.js не помечен как superseded.
- [ ] Astro migration нигде не обязательна.
- [ ] Source-of-truth защищён от code tasks.
- [ ] Secrets недоступны Claude Code.
- [ ] Production commands заблокированы.
- [ ] `development-plan.md`, `vibe-coding-stack.md`, `optimization.md` не противоречат друг другу.

### Зона риска

Без этого этапа Claude Code будет смешивать `.astro`, React components, Netlify Forms, Route Handlers, Postmark и Resend в одном repository.

---

## Этап 5. Audit выполненных этапов 0–3

**Цель:** подтвердить реальное состояние frontend, не переписывая его.

### Запрещено

- broad refactor;
- redesign;
- framework migration;
- major dependency update;
- новая content architecture;
- исправление всех findings одним diff.

### Действия

1. Проверить clean working tree.
2. Запустить:

```bash
node --version
npm --version
npm ci
npm run lint
npx tsc --noEmit
npm run build
npm audit --omit=dev
```

3. Создать inventory:
   - Next.js/React/TypeScript versions;
   - routes;
   - Server/Client Components;
   - dependencies;
   - external requests;
   - analytics scripts;
   - существующие form/backend files, даже если incomplete.
4. Проверить rendered frontend:
   - 11 sections;
   - order и IDs;
   - один H1;
   - CTA targets;
   - Header/Footer;
   - mobile drawer;
   - FAQ;
   - 404;
   - responsive widths 320/375/768/1024/1280/1440.
5. Сравнить copy с `texts.md`.
6. Сравнить visual behavior с `design.md`.
7. Проверить отсутствие:
   - old brand;
   - O-1;
   - fake proof;
   - TODO/TBD/lorem ipsum;
   - secrets;
   - production claims/placeholders в visible UI.
8. Создать `docs/audits/current-codebase-audit.md`.

### Severity model

| Severity | Значение | Действие |
|---|---|---|
| Blocker | build/security/PII/critical broken navigation | исправить до этапа 6 |
| High | wrong copy, broken CTA, inaccessible drawer, structural mismatch | отдельная task до этапа 6 |
| Medium | responsive/performance/maintainability issue | исправить до release QA |
| Low | cosmetic issue без conversion/accessibility impact | defer |

### Acceptance criteria

- [ ] Build проходит или blocker документирован.
- [ ] Audit report создан.
- [ ] Каждый finding имеет severity, evidence и affected files.
- [ ] Никакой скрытый refactor не выполнен.
- [ ] Этапы 4+ не помечены выполненными по наличию placeholder-файлов.

---

## Этап 6. Business & IT Diagnostic + Diagnostic Request Form

**Статус:** Not started.

**Цель:** реализовать секцию 9 и frontend формы.

### Section structure

`#business-it-diagnostic` остаётся одной top-level section с четырьмя sub-blocks:

1. Offer;
2. Before You Commit;
3. What Happens After You Submit;
4. Diagnostic Request Form — `#diagnostic-request-form`.

Не разбивать sub-blocks на отдельные full-width sections.

### Form fields

#### Required — ровно 4

1. Name — text.
2. Work Email — `type="email"`.
3. Company — text.
4. Main Challenge — textarea, max 500.

#### Optional — progressive disclosure

Control:

```text
Add more context (optional)
Hide optional fields
```

Fields:

- Company Website;
- Role;
- Company Size;
- Timeline;
- Request Type.

### Company Size options

- 1–25;
- 26–50;
- 51–100;
- 101–250;
- 251–500;
- 500+.

Ни один вариант не preselected и не выделяется визуально.

### Timeline options

- ASAP;
- This month;
- 1–3 months;
- 3–6 months;
- Researching.

### Request Type options

- Business & IT Diagnostic;
- AI & Process Automation Review;
- Business Process Audit;
- CRM / RevOps Audit;
- IT Stack Assessment;
- AI Readiness Assessment;
- 90-Day Roadmap;
- Not sure yet.

### CTA routing

- CTA с `data-request-type` prefills единственный Request Type select.
- Значение остаётся editable.
- Generic CTA оставляет field empty.
- Не создавать hidden + visible duplicate `request_type`.

### Hidden context fields

- page_url;
- page_section;
- cta_text;
- referrer;
- utm_source;
- utm_medium;
- utm_campaign;
- utm_content;
- utm_term;
- timestamp.

### UX and accessibility

- visible `<label>` для каждого field;
- placeholder не заменяет label;
- optional fields не `required`;
- input font-size минимум 16px mobile;
- error связан через `aria-describedby`;
- focus на first invalid field;
- multiple errors могут иметь focusable summary;
- values сохраняются после validation error;
- disclosure не очищает values;
- form работает без открытия optional block;
- submit button: `Submit Diagnostic Request`;
- loading: `Submitting...`;
- duplicate click blocked;
- success/error через `aria-live`;
- privacy notice ведёт на `/privacy-policy`.

### Acceptance criteria

- [ ] Section содержит 4 sub-blocks в фиксированном порядке.
- [ ] Ровно 4 required fields.
- [ ] Optional block закрыт по умолчанию.
- [ ] Form submittable без optional fields.
- [ ] Один editable Request Type field.
- [ ] CTA routing работает.
- [ ] Company Size не preselected.
- [ ] Validation соответствует schema.
- [ ] User input сохраняется после ошибки.
- [ ] Loading/success/error states доступны.
- [ ] Copy дословно соответствует `texts.md`.
- [ ] Нет backend/email claim до этапа 7.

### Типичные ошибки

- Client Component на всю страницу вместо локальной form boundary.
- Два request type fields.
- Optional fields становятся required.
- Success показывается до подтверждения server response.
- Generic `Submit` вместо approved button text.

---

## Этап 7. Route Handler + Resend preview mode

**Статус:** Not started.

**Цель:** реализовать безопасную server-side обработку без ложного production email behavior.

### Configuration

Server-only variables:

```text
SITE_MODE=preview | production
RESEND_API_KEY
RESEND_FROM_EMAIL
OWNER_NOTIFICATION_EMAIL
SITE_URL
```

`SITE_MODE` и secrets не должны иметь prefix `NEXT_PUBLIC_`.

### Route Handler

`app/api/submit/route.ts`:

1. принимает только POST;
2. проверяет content type и body size;
3. нормализует fields;
4. allowlists known fields;
5. отбрасывает unknown fields;
6. проверяет honeypot;
7. выполняет server-side validation;
8. sanitizes email template output;
9. не логирует raw PII/challenge;
10. возвращает generic client errors;
11. подробные internal errors не уходят в browser.

### Validation

- Name required;
- Work Email required и normalized;
- Company required;
- Main Challenge required, max 500;
- optional select values только из approved enums;
- request body size ограничен;
- malformed input rejected.

### Preview mode

- тестовые submissions только владельцу или approved Resend test addresses;
- visitor auto-reply произвольным адресатам выключен;
- owner notification может тестироваться на email владельца;
- success UI не утверждает, что письмо посетителю отправлено;
- no production lead collection promise.

### Production mode

Требует:

- verified owned domain;
- SPF/DKIM;
- production sender;
- monitored Reply-To;
- real owner notification;
- visitor auto-reply;
- bounce/failure path test.

### Auto-reply

Subject:

```text
Diagnostic request received — Opsfield Systems
```

Body:

```text
Thank you for your diagnostic request.
A senior advisor will review your submission
and respond within 2 business days.

If you have additional context to share,
you can reply to this email.

— Opsfield Systems
```

Не включать challenge, company и другие form values.

### Rate limiting

In-memory counter не считать надёжным serverless rate limiter.

Preview baseline:

- honeypot;
- strict validation;
- body limit;
- duplicate-submit protection;
- platform logs без PII.

Production anti-abuse control выбирается после окончательного hosting decision.

### Acceptance criteria

- [ ] Invalid submissions rejected server-side.
- [ ] Unknown fields discarded.
- [ ] Secrets отсутствуют в client bundle.
- [ ] Preview не auto-reply произвольным visitors.
- [ ] No raw PII logging.
- [ ] No challenge text in auto-reply.
- [ ] Email failure не маскируется как email success.
- [ ] Form data не отправляется в analytics.
- [ ] Test cases: valid, invalid email, oversize challenge, honeypot, duplicate click, Resend failure.

---

## Этап 8. Legal pages, privacy behavior и consent foundation

**Статус:** Not started.

### Pages

- `/privacy-policy`;
- `/terms-of-use`;
- `/cookie-policy`.

### Requirements

- content из `texts.md` без самовольной юридической редакции;
- `noindex,follow` на production legal pages;
- preview host — `noindex,nofollow` для всех routes;
- unique title/description;
- visible back-to-home navigation;
- form notice ссылается на Privacy Policy;
- legal drafts не называются counsel-approved.

### Provider accuracy

Preview drafts могут описывать фактически активные test providers, но production legal pages перечисляют только production providers:

- production hosting provider;
- Resend, если email active;
- GA4 только после consent-controlled activation;
- DNS/registrar provider только в той роли, которую он реально выполняет.

Не перечислять unused providers.

### Consent foundation

До GA4:

- optional analytics не загружать;
- не создавать сложный CMP без cookies/analytics;
- подготовить component boundary и preference storage;
- full banner активировать вместе с GA4.

Required actions после GA4 activation:

- Accept;
- Decline;
- Privacy Policy;
- возможность изменить preference.

### Acceptance criteria

- [ ] Три legal routes работают.
- [ ] Provider list соответствует deployment mode.
- [ ] Нет fake legal entity/inbox/domain.
- [ ] Legal draft status понятен.
- [ ] GA4 отсутствует до consent.
- [ ] Form privacy notice работает.

---

## Этап 9. SEO, metadata и preview isolation

**Статус:** Not started.

### Preview rules

Для Vercel и Netlify previews:

- `robots: noindex,nofollow`;
- `X-Robots-Tag: noindex, nofollow`;
- preview host не становится production canonical;
- sitemap не отправляется в Search Console;
- structured data не содержит placeholder production identity.

### Production implementation

- metadata из `texts.md`;
- unique legal metadata;
- canonical helper из `SITE_URL`;
- `app/robots.ts`;
- `app/sitemap.ts`;
- Open Graph;
- X/Twitter metadata;
- Organization/WebSite/WebPage/Service JSON-LD;
- FAQPage только при exact visible match;
- 404 noindex;
- legal noindex;
- only homepage в indexable sitemap MVP.

### Environment gate

```text
SITE_MODE
SITE_URL
```

Production build/deploy должен быть заблокирован, если:

- `SITE_URL` отсутствует;
- host placeholder;
- host является preview domain;
- brand/legal launch gate не выполнен.

### Acceptance criteria

- [ ] Preview не индексируется.
- [ ] Production metadata совпадает с `texts.md`.
- [ ] Canonical self-referencing.
- [ ] Legal routes noindex.
- [ ] FAQ в initial HTML.
- [ ] JSON-LD соответствует visible content.
- [ ] Нет old brand, O-1 и placeholder domain.

---

## Этап 10. Accessibility and Performance

**Статус:** Not started.

### Accessibility

- keyboard-only navigation;
- logical tab order;
- visible `:focus-visible`;
- SkipLink;
- drawer focus trap;
- Escape + focus return;
- FAQ `<button aria-expanded>`;
- labels и autocomplete;
- error association;
- error summary;
- success `aria-live="polite"`;
- AA contrast;
- status not color-only;
- touch targets ≥44px;
- 200% и 400% zoom;
- reduced motion;
- VoiceOver/NVDA smoke.

### Performance

- minimize Client Components;
- no page-wide hydration;
- Hero/LCP asset not lazy;
- below-fold images lazy;
- image dimensions specified;
- `next/font` или existing local setup;
- no heavy animation library;
- no duplicate icon bundles;
- no optional third-party scripts before consent;
- review production build output.

### Release targets

- Lighthouse Performance ≥90 desktop and ≥85 mobile;
- Accessibility ≥95;
- Best Practices ≥95;
- SEO ≥95 on production-like build;
- no serious/critical axe violations;
- no horizontal scroll at QA widths.

Targets — release gates, не публичные promises.

### Acceptance criteria

- [ ] Keyboard flow complete.
- [ ] Drawer/FAQ/form accessible.
- [ ] Reduced motion respected.
- [ ] Zoom tests pass.
- [ ] No serious/critical axe issue.
- [ ] No horizontal scroll 320–1440px.
- [ ] Performance work основана на measured defects.

---

## Этап 11. Minimal CI, contract tests и E2E

**Статус:** Not started.

### Mandatory local checks

```text
npm ci
npm run lint
npx tsc --noEmit
npm run build
contract tests
Playwright Chromium smoke
axe smoke
```

### `package.json`

Добавить единый script:

```json
{
  "scripts": {
    "check": "npm run lint && npx tsc --noEmit && npm run build"
  }
}
```

### GitHub Actions

Lightweight Pull Request workflow:

```yaml
name: Quality
on: [pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
      - run: npm run test:contracts
```

Full Playwright matrix и Lighthouse запускаются locally перед milestone/release, если CI minutes ограничены.

### Contract tests

Проверяют:

- route list;
- exactly 11 top-level sections;
- section order/IDs;
- one H1;
- CTA targets;
- critical approved copy;
- form fields/options;
- request type routing;
- legal robots;
- preview noindex;
- no old brand;
- no O-1;
- no public TODO/TBD/lorem ipsum;
- no production placeholders in production mode;
- FAQ content in HTML;
- GA4 absent without consent.

### E2E smoke

- navigation anchors;
- mobile drawer;
- FAQ;
- progressive form disclosure;
- validation;
- CTA prefill;
- form success/error mocked paths;
- preview robots.

### Acceptance criteria

- [ ] `npm run check` passes.
- [ ] CI runs on PR.
- [ ] Contract tests protect structure/copy.
- [ ] Failed/skipped checks disclosed.
- [ ] Full browser matrix remains release gate.

---

## Этап 12. Analytics preparation

**Статус:** Not started.

### До production

- создать analytics abstraction;
- events are no-op без consent;
- не загружать `gtag.js`;
- не добавлять Measurement ID в public preview;
- не использовать Vercel/Netlify analytics как незаявленную замену tracking plan.

### Production activation

- GA4 Basic Consent Mode;
- default analytics denied;
- Accept загружает GA4;
- Decline оставляет GA4 absent;
- preference можно изменить;
- no PII;
- no form values;
- no challenge text;
- no full query strings;
- validate в GA4 DebugView.

### MVP events

- `cta_click`;
- `nav_anchor_click`;
- `faq_item_open`;
- `form_start`;
- `form_submit_attempt`;
- `form_submit_success`;
- `form_submit_error`.

Field-level analytics, abandonment и complex visibility events отложены до реального traffic volume.

### Acceptance criteria

- [ ] Preview не отправляет analytics.
- [ ] GA4 не загружается до Accept.
- [ ] Event payloads не содержат PII.
- [ ] Events связаны с conversion decisions.

---

## Этап 13. Pre-Launch Preview и Production Activation

**Статус:** Not started.

### Part A — zero-budget pre-launch

Checklist:

- [ ] Все этапы 4–12 завершены.
- [ ] Vercel preview `noindex,nofollow`.
- [ ] Form работает в preview/test mode.
- [ ] Нет visitor auto-reply arbitrary recipients.
- [ ] Нет GA4.
- [ ] Нет fake production domain/entity/email.
- [ ] Все 11 sections complete.
- [ ] Legal drafts доступны.
- [ ] 320/375/768/1024/1280/1440 QA.
- [ ] Chromium/Firefox/WebKit smoke.
- [ ] iOS Safari smoke по возможности.
- [ ] Keyboard, zoom, reduced motion.
- [ ] Build, contract tests, axe pass.
- [ ] Owner manually reviews every CTA and visible copy.

**Результат:** готовый pre-launch asset для внутренней проверки и демонстрации, не commercial production.

### Part B — production gates

#### Business/legal

- [ ] Trademark/common-law review завершён.
- [ ] Legal operator / DBA подтверждён.
- [ ] Production domain зарегистрирован в business-controlled account.
- [ ] General/privacy inboxes созданы.
- [ ] Legal drafts обновлены под фактического operator/providers.

#### Hosting — выбрать одно

**A. Netlify Free — основной zero-budget path**

- [ ] Existing Next.js project подключён без framework rewrite.
- [ ] App Router routes работают.
- [ ] Route Handler работает через platform adapter.
- [ ] Environment variables разделены preview/production.
- [ ] Headers, redirects, 404 проверены.
- [ ] Function usage/credits monitored.

**B. Vercel Pro — paid alternative**

- [ ] Pro plan активирован.
- [ ] Spending controls reviewed.
- [ ] Production domain connected.
- [ ] Environment variables separated.

#### Email

- [ ] Domain verified в Resend.
- [ ] SPF/DKIM pass.
- [ ] Sender uses verified domain.
- [ ] Reply-To monitored.
- [ ] Owner notification delivered.
- [ ] Visitor auto-reply delivered.
- [ ] Failure/bounce path tested.

#### SEO/analytics/release

- [ ] Production canonical.
- [ ] Production robots.
- [ ] sitemap.xml.
- [ ] Search Console verification.
- [ ] GA4 consent behavior.
- [ ] Real production form submission.
- [ ] Security headers.
- [ ] Cross-browser matrix.
- [ ] Accessibility manual checks.
- [ ] Lighthouse thresholds.
- [ ] No placeholders/preview messaging.

### Activation rule

Indexing, analytics и real lead collection не включаются частично. Production switches только после прохождения обязательных gates.

---

## Этап 14. Post-Launch Maintenance

**Статус:** Deferred until production.

### Weekly — first month

- review submissions;
- review spam/abuse;
- verify email delivery;
- inspect function errors;
- check broken links;
- assess qualified lead quality.

### Monthly

- security/dependency review;
- form end-to-end test;
- analytics validation;
- Search Console review;
- performance review;
- environment inventory backup;
- provider usage/credit review.

### Quarterly

- legal/provider list review;
- data-retention cleanup;
- accessibility smoke;
- conversion review;
- multilingual launch criteria review;
- hosting economics review.

### Migration reconsideration

Astro или другая architecture рассматривается только при measurable need и отдельном ADR.

---

## Dependencies and Execution Order

```text
Completed: 0 → 1 → 2 → 3
                         ↓
Next: 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13
                                                        ↓
                                              14 after launch
```

Rules:

- этап 4 обязателен до любых новых code changes;
- этап 5 audit-only;
- Blocker/High findings из этапа 5 исправляются отдельными tasks до этапа 6;
- этап 6 frontend form до этапа 7 backend;
- этап 8 legal foundation до analytics activation;
- этапы 9–12 могут частично выполняться параллельно только после стабильной формы;
- этап 13 production blocked до business/domain/email gates;
- этап 14 только после launch.

---

## What Is Explicitly Cancelled

- Next.js → Astro rewrite;
- forced Netlify Forms migration;
- Postmark integration;
- Astro Content Layer;
- mandatory YAML/JSON content migration;
- locale directories/routes в MVP;
- Language Switcher;
- Better Stack;
- permanent staging branch;
- full Playwright matrix on every PR;
- Lighthouse CI on every PR;
- CMS;
- database;
- authentication;
- GTM;
- heatmaps;
- session replay;
- paid monitoring;
- paid form tools;
- automated AI translation;
- local/open-source LLM workflow — доступен только Claude Code.

---

## Alternative and Gray Options

### Допустимый fallback

**Netlify Free + existing Next.js** — допустимый коммерческий zero-budget hosting path. Обязателен end-to-end adapter/function test.

### Временный деградированный вариант

Форма может отправлять только owner notification без visitor auto-reply до verified domain. Success message не должен обещать письмо пользователю.

### Не рекомендованный вариант

Публично использовать Vercel Hobby для commercial lead generation. Это создаёт platform-compliance risk и не входит в approved plan.

### Серые варианты, которые запрещены

- shared/cracked Claude accounts;
- stolen API keys;
- unofficial API proxies;
- обход Claude Code permissions;
- подмена production identity бесплатными фиктивными inbox/domain;
- скрытый запуск GA4 без consent;
- отправка email через чужой verified domain;
- маскировка коммерческого production как personal project.

Экономия от этих вариантов ниже риска account suspension, data leakage и потери leads.

---

## Critical Risks

| Risk | Business impact | Control |
|---|---|---|
| Документация всё ещё описывает Astro | Claude создаёт несовместимый code | Этап 4 до coding |
| Ошочно считать form/backend готовыми | Launch без работающей conversion path | Этапы 6–7 marked not started |
| Vercel Hobby commercial restriction | Platform compliance / suspension risk | Preview only; Netlify Free or Vercel Pro production |
| Нет domain | Low trust, no canonical, no verified sender | Domain mandatory production gate |
| Resend test domain | Нет arbitrary visitor auto-reply | Preview owner-only; verify domain before production |
| Claude broad refactor | Потеря готового frontend | Plan Mode, minimal diff, branch isolation |
| Hardcoded copy drift | Claims/CTA расходятся с source | Contract tests + read-only source |
| Serverless anti-abuse weakness | Spam/function usage | Honeypot, validation, body limit; production control later |
| PII in logs/analytics | Privacy/legal risk | No raw logs, no values in analytics |
| Legal drafts list unused providers | Misleading disclosure | Launch-time provider audit |
| No second developer | Review blind spots | Tests, small diffs, owner QA |
| Netlify adapter/function mismatch | Production form failure | Dedicated production preview and real submission test |

---

## Definition of Done for Every Claude Code Task

Claude Code может заявить `complete` только если сообщает:

1. task scope;
2. source-of-truth sections used;
3. files inspected;
4. files changed;
5. exact behavior changed;
6. commands run;
7. command results;
8. tests added/updated;
9. tests not run and reason;
10. browser/screenshots evidence where relevant;
11. remaining manual QA;
12. known risks;
13. confirmation that source-of-truth was not modified.

Code appearance не является доказательством completion.

---

## Standard Claude Code Task Prompt

```text
Read CLAUDE.md and all applicable files in .claude/rules/.
Read the relevant source-of-truth files in docs/source-of-truth/ as read-only.

Work in Plan Mode first.
Do not edit any file yet.

For this task:
1. Restate the exact goal.
2. List the source-of-truth sections that apply.
3. List the existing files/components you inspected.
4. List the minimum files that must change.
5. Identify risks to currently working behavior.
6. Propose the smallest implementation plan.
7. List commands and tests you will run.
8. State and justify any dependency you want to add.

Constraints:
- Keep the existing Next.js App Router architecture.
- Do not migrate to Astro or another framework.
- Do not rewrite approved copy.
- Do not invent content, routes, services, metrics or form fields.
- Do not modify docs/source-of-truth/ in a code task.
- Do not read .env files or secrets.
- Do not run git push, vercel deploy, netlify deploy, destructive Git commands or production actions.
- Do not perform unrelated refactoring.
- Preserve all working behavior outside the stated scope.
- Report every failed, skipped or unavailable test.

Wait for owner approval of the plan before editing code.
```

---

## Immediate Next Action

Выполнить **только этап 4**.

После синхронизации documentation/governance выполнить этап 5 как audit-only task. Не начинать форму и backend до audit report и закрытия Blocker/High findings.
