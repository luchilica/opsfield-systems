# Development Plan — Opsfield Systems MVP

## Source of Truth

Этот файл — план реализации. Он описывает **как** строить сайт и в каком порядке. Что строить — определяют четыре основных файла проекта в порядке приоритета:

1. `sitemap.md` — структура, секции, URL, anchors, internal links.
2. `texts.md` — тексты, CTA, metadata, form copy, legal pages.
3. `design.md` — визуальные токены, компоненты, responsive.
4. `optimization.md` — SEO, accessibility, performance, технические правила.

При конфликте между этим планом и основными файлами — приоритет у основных файлов.

---

## Решения владельца проекта

| Вопрос | Решение |
|---|---|
| Кто разрабатывает | Владелец с помощью Claude |
| Хостинг | Vercel (бесплатный тарифный план) |
| Домен | Без покупки; Vercel subdomain (`project.vercel.app`) |
| Фреймворк | Next.js (App Router) |
| Обработка формы | Vercel API Route (серверная функция) |
| Auto-reply | Vercel Serverless Function + Resend (бесплатный тарифный план) |
| Почтовый сервис | Не требуется для учебного проекта; email из `texts.md` вставляется в код as-is |
| DNS | Не требуется (нет домена) |
| Юридические тексты | Draft-тексты из `texts.md`; обновление после counsel review |
| GA4 | Будет создан бесплатно |
| Trademark | В процессе, ожидание 2–3 недели |
| Hero-диаграмма | По спецификации из `design.md` |
| Бюджет | $0 |
| Node.js | v24, установлен в VS Code |

---

## Отклонения от основной документации

Основная документация (`optimization.md`) предусматривает стек Netlify + Cloudflare. Данный проект использует Vercel. Ниже зафиксированы все отличия, чтобы при переходе на production их можно было пересмотреть.

| Компонент | Документация (`optimization.md`) | Этот проект |
|---|---|---|
| Хостинг | Netlify | Vercel (free tier) |
| Форма | Netlify Forms | Vercel API Route |
| Серверные функции | Netlify Functions | Vercel Serverless Functions |
| Auto-reply | Netlify Functions + email service | Vercel Serverless + Resend |
| DNS | Cloudflare | Не требуется |
| Домен | Production domain | Vercel subdomain |
| Email | Google Workspace / Zoho | Не требуется; email из `texts.md` в коде |
| SSL | Автоматический через Netlify | Автоматический через Vercel |
| Деплой | Git → Netlify auto-deploy | Git → Vercel auto-deploy |
| Конфигурация headers | `netlify.toml` или Netlify dashboard | `next.config.js` или `vercel.json` |
| 404 | `/404.html` | `app/not-found.tsx` (Next.js convention) |

**Обоснование Next.js:** `optimization.md` запрещает тяжёлые фреймворки без подтверждённой необходимости. Необходимость подтверждена: (1) Vercel не поддерживает серверные функции для чистого HTML без фреймворка; (2) API Route нужен для обработки формы и auto-reply; (3) Next.js SSG (Static Site Generation) генерирует статический HTML при сборке — основной контент остаётся в исходном HTML; (4) ценность для обучения.

---

## Стек технологий

| Технология | Назначение |
|---|---|
| Next.js 15+ (App Router) | Фреймворк; статическая генерация страниц + API Routes |
| React 19+ | UI-библиотека (часть Next.js) |
| TypeScript | Язык программирования (опционально, рекомендуется) |
| CSS Modules + CSS Custom Properties | Стилизация; переменные из `design.md` |
| `next/font` | Самостоятельное размещение шрифтов Inter и Inter Tight |
| `lucide-react` | Иконки (библиотека Lucide) |
| Resend | Отправка email (auto-reply + уведомление о заявке) |
| Vercel | Хостинг, деплой, серверные функции |
| GitHub | Хранение кода, контроль версий |
| GA4 | Аналитика (после consent) |
| Google Search Console | Мониторинг поисковой выдачи |

---

## Этапы разработки

---

### Этап 0. Подготовка окружения

**Цель:** создать рабочее пространство — репозиторий, проект Next.js, подключение к Vercel.

**Что делать:**

1. Создать аккаунт на GitHub (если нет). Создать новый репозиторий (например, `opsfield-systems`). Репозиторий — это облачная папка с историей всех изменений в коде.

2. Создать аккаунт на Vercel. Подключить GitHub-репозиторий. Vercel автоматически разворачивает сайт при каждом коммите (сохранении изменений) в ветку `main`.

3. Создать проект Next.js локально:

```bash
npx create-next-app@latest opsfield-systems --typescript --app --tailwind=no --eslint --src-dir=no --import-alias="@/*"
```

Флаги:
- `--typescript` — использует TypeScript (строгая типизация, ловит ошибки до запуска).
- `--app` — использует App Router (современная архитектура Next.js).
- `--tailwind=no` — без Tailwind CSS; используем CSS Modules с переменными из `design.md`.
- `--eslint` — включает проверку качества кода.
- `--src-dir=no` — файлы в корне проекта (`app/`), а не в `src/app/`.

4. Установить зависимости:

```bash
npm install lucide-react
npm install resend
```

5. Настроить структуру файлов проекта:

```
opsfield-systems/
├── app/
│   ├── layout.tsx              # Корневой layout: шрифты, header, footer
│   ├── page.tsx                # Главная страница (11 секций)
│   ├── globals.css             # CSS-переменные, базовые стили
│   ├── not-found.tsx           # Страница 404
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms-of-use/
│   │   └── page.tsx
│   ├── cookie-policy/
│   │   └── page.tsx
│   └── api/
│       └── submit/
│           └── route.ts        # API Route: обработка формы + auto-reply
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SkipLink.tsx
│   │   └── CookieConsent.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── WhatWeDiagnose.tsx
│   │   ├── AIProcessAutomation.tsx
│   │   ├── HowDiagnosticWorks.tsx
│   │   ├── DiagnosticScenarios.tsx
│   │   ├── WhyOpsfield.tsx
│   │   ├── DeliveryModel.tsx
│   │   ├── BusinessITDiagnostic.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── DiagnosticForm.tsx
│   │   └── HeroDiagram.tsx     # SVG-диаграмма
│   └── analytics/
│       └── Analytics.tsx       # GA4 (загружается после consent)
├── lib/
│   ├── constants.ts            # Тексты, email, конфигурация
│   └── analytics.ts            # Функции отправки событий
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.js
├── tsconfig.json
└── package.json
```

6. Настроить Git-ветки:
- `main` — автоматический деплой на Vercel (production).
- `staging` — для тестирования перед merge в main.
- `feature/*` — для отдельных задач (каждая секция, форма, и т.д.).

7. Убедиться, что Vercel-поддомен (`project.vercel.app`) имеет `noindex` в `<meta>` и через `X-Robots-Tag` header. Это учебный проект, индексация поисковиками не нужна.

**Материалы из RAG:** `optimization.md` → "Техническая архитектура MVP", "Hosting and Infrastructure"; `design.md` → "Font Families".

**Кто делает:** владелец с помощью Claude.

**Результат:** работающий Next.js проект, подключённый к Vercel. При push в `main` автоматически создаётся live-версия сайта.

**Чек-лист перед переходом к этапу 1:**

- [ ] GitHub-репозиторий создан.
- [ ] Next.js проект запускается локально (`npm run dev` → открывается `http://localhost:3000`).
- [ ] Vercel подключён к репозиторию.
- [ ] Push в `main` создаёт preview на Vercel.
- [ ] `lucide-react` и `resend` установлены.

**Типичные ошибки:**
- Использовать устаревший Pages Router вместо App Router.
- Забыть `--app` при создании проекта.
- Не подключить репозиторий к Vercel.

**Зависит от владельца:** создание аккаунтов GitHub и Vercel.

---

### Этап 1. Дизайн-фундамент

**Цель:** перевести визуальные правила из `design.md` в рабочий CSS.

**Что делать:**

1. Настроить шрифты через `next/font`. Это встроенный механизм Next.js, который автоматически скачивает шрифты из Google Fonts и размещает их на сервере (self-hosting). Внешних запросов к Google не происходит — это полностью соответствует требованию `optimization.md` → "Fonts".

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
// или оба через next/font/google если Inter Tight доступен
```

2. Создать `app/globals.css` с полным набором CSS-переменных из `design.md` → "CSS Variable Reference". Это единственный источник правды для всех визуальных токенов в коде.

3. Настроить типографику: размеры заголовков (desktop и mobile), межстрочные интервалы, font-weight. Таблица размеров — `design.md` → "Typography Scale".

4. Настроить spacing: 8px-сетку (`--space-1` через `--space-7`), edge padding для разных экранов. Значения — `design.md` → "Spacing Scale".

5. Настроить breakpoints: `768px`, `1024px`, `1280px`. Базовый стиль — mobile-first. Определение — `optimization.md` → "Responsive Implementation".

6. Создать базовые UI-компоненты (файлы в `components/ui/`):
   - `Button.tsx` — primary и secondary варианты. Спецификация — `design.md` → "Buttons and CTA".
   - `Card.tsx` — базовая карточка с тенями, радиусами, padding.

7. Добавить `prefers-reduced-motion` правило — отключение всех анимаций. CSS — `design.md` → "Transitions".

8. Настроить `max-width: 1200px` для контейнера. Максимальная ширина текста — `720px`. Значение — `optimization.md` → "Техническая архитектура MVP".

**Материалы из RAG:** `design.md` — целиком (цвета, типографика, spacing, radii, тени, transitions, CSS Variable Reference); `optimization.md` → "Responsive Implementation" (breakpoints), "Техническая архитектура MVP" (max-width).

**Кто делает:** владелец с помощью Claude.

**Результат:** `globals.css` с полной дизайн-системой. Компоненты Button и Card. При открытии сайта видна правильная типографика, цвета, отступы.

**Чек-лист перед переходом к этапу 2:**

- [ ] Все CSS-переменные из `design.md` → "CSS Variable Reference" присутствуют в `globals.css`.
- [ ] Шрифты Inter и Inter Tight загружаются через `next/font` (self-hosted).
- [ ] `font-display: swap` установлен (Next.js делает это автоматически через `next/font`).
- [ ] Breakpoints: 768px, 1024px, 1280px — ровно три, без дублирования.
- [ ] Spacing кратен 8px.
- [ ] Кнопки имеют min-height 44px.
- [ ] `prefers-reduced-motion` отключает анимации.
- [ ] Контейнер: max-width 1200px.
- [ ] `#CBD5E1` не используется как цвет текста.

**Типичные ошибки:**
- Загрузить шрифты через `<link>` из Google Fonts CDN вместо `next/font`.
- Использовать `#CBD5E1` для текста (документация запрещает — только для border).
- Задать breakpoints, отличающиеся от `optimization.md`.
- Забыть `font-display: swap`.

**Зависит от владельца:** нет.

---

### Этап 2. Layout: header, footer, структура секций

**Цель:** создать каркас страницы — навигацию, подвал и пустые контейнеры для 11 секций.

**Что делать:**

1. Создать `components/layout/SkipLink.tsx` — невидимая ссылка «Skip to main content», появляется при нажатии Tab. Спецификация — `design.md` → "Skip Link". Target: `id` на `<main>`.

2. Создать `components/layout/Header.tsx`:
   - Логотип: «Opsfield Systems» → ссылка на `/`.
   - Навигация: Services (`#what-we-diagnose`), How It Works (`#how-the-diagnostic-works`), Results (`#proof-examples`), FAQ (`#faq`).
   - Primary CTA: «Request Diagnostic» → `#diagnostic-request-form`.
   - Desktop: логотип слева, навигация по центру / справа, CTA справа.
   - Mobile: логотип слева, кнопка меню справа. Drawer с теми же ссылками.
   - Sticky: шапка «прилипает» при прокрутке. Высота: 72–80px.
   - Источники: `texts.md` → "Header"; `sitemap.md` → "Header"; `design.md` → "Header".

3. Создать `components/layout/Footer.tsx`:
   - CTA-панель: «Start with clarity before investing in tools or implementation.» → `#diagnostic-request-form`.
   - Позиционирование: одна строка текста.
   - Три группы ссылок: Company (Team, Services, Results, Contact), Get Started (Request Diagnostic, How It Works, FAQ), Legal (Privacy Policy, Terms of Use, Cookie Policy).
   - Копирайт: `© 2026 Opsfield Systems. California, USA.`
   - Dark surface: допускается тёмный фон. Цвета — `design.md` → "Footer dark surface".
   - Источники: `texts.md` → "Footer"; `sitemap.md` → "Footer"; `design.md` → "Footer".

4. Настроить `app/layout.tsx` — корневой layout Next.js. Включает SkipLink, Header, `<main>`, Footer. Подключает шрифты и `globals.css`.

5. В `app/page.tsx` создать 11 пустых `<section>` с ID из `sitemap.md` → "Section IDs":

```
#hero
#problem-section
#what-we-diagnose
#ai-process-automation
#how-the-diagnostic-works
#proof-examples
#why-opsfield-systems
#delivery-model
#business-it-diagnostic (содержит #diagnostic-request-form)
#faq
#final-cta
```

6. Добавить `scroll-margin-top` к каждой секции — компенсация высоты sticky header, чтобы контент не прятался за шапкой при переходе по якорной ссылке. Значение примерно равно высоте header (80px + отступ).

7. Настроить smooth scroll с учётом `prefers-reduced-motion: reduce` — при этой настройке scroll мгновенный. Якорные ссылки — обычные `<a href="#section-id">`, работают без JavaScript.

**Материалы из RAG:** `sitemap.md` → "Section IDs", "Header", "Footer", "Internal Linking Map"; `texts.md` → "Header", "Footer"; `design.md` → "Header", "Footer", "Skip Link"; `optimization.md` → "HTML Structure", "Anchor behavior", "Accessibility → Keyboard".

**Кто делает:** владелец с помощью Claude.

**Результат:** страница с работающей навигацией, sticky header, footer. 11 пустых секций с правильными ID. Мобильное меню открывается/закрывается.

**Чек-лист перед переходом к этапу 3:**

- [ ] Skip link виден при нажатии Tab и переводит фокус на `<main>`.
- [ ] Header содержит: Services / How It Works / Results / FAQ / Request Diagnostic.
- [ ] Все навигационные ссылки ведут к правильным якорям.
- [ ] Логотип ведёт на `/`.
- [ ] Primary CTA в header: «Request Diagnostic» → `#diagnostic-request-form`.
- [ ] Мобильное меню: открывается, закрывается по крестику и Escape, фокус удерживается внутри.
- [ ] Footer содержит три группы ссылок + CTA-панель + копирайт.
- [ ] Footer: Team → `#delivery-model`, Contact → `#diagnostic-request-form`.
- [ ] Legal ссылки: `/privacy-policy`, `/terms-of-use`, `/cookie-policy`.
- [ ] Ровно 11 `<section>` с ID из `sitemap.md`.
- [ ] Один `<h1>` на странице (пока placeholder).
- [ ] `scroll-margin-top` задан на секциях.
- [ ] Smooth scroll отключается при `prefers-reduced-motion`.
- [ ] Sticky header не перекрывает контент при якорной навигации.
- [ ] Нет горизонтального скролла на мобильном (320px, 375px).
- [ ] Touch targets ≥ 44px.
- [ ] Нет `LLC`, `Inc.`, `®` у бренда.

**Типичные ошибки:**
- Создать больше или меньше 11 секций.
- Использовать `<button>` для навигационных ссылок вместо `<a>`.
- Забыть focus trap в мобильном drawer.
- Забыть `scroll-margin-top` — контент прячется за sticky header.
- Footer: ссылка Team ведёт не на `#delivery-model`.

**Зависит от владельца:** нет.

---

### Этап 3. Контентные секции (1–8, 10–11)

**Цель:** заполнить 10 из 11 секций контентом и компонентами. Секция 9 (Business & IT Diagnostic с формой) делается отдельно на этапе 4.

Рекомендуемый порядок — сверху вниз.

**Что делать для каждой секции:**

#### Секция 1 — Hero (`#hero`)

Компонент: `components/sections/Hero.tsx`

Содержание из `texts.md` → "Hero":
- Eyebrow: «B2B IT & Operations Advisory».
- H1: «Diagnostic-First IT & Business Consulting».
- Subtitle: «For B2B companies blocked by process, data, and system gaps — we diagnose before you build.»
- Text: одна строка описания.
- Primary CTA: «Request a Business & IT Diagnostic» → `#diagnostic-request-form` (data-request-type="Business & IT Diagnostic").
- Secondary CTA: «See How the Diagnostic Works» → `#how-the-diagnostic-works`.
- ICP qualifier: «Best fit: B2B companies with 50–250 employees.» — chip-стиль, не H1 и не badge.
- Trust line: «Boutique advisory since 2021. Senior-led. Vendor-neutral. 4–6 active clients at a time.»

Layout из `design.md` → "Hero Layout":
- Desktop: split 55% текст / 45% визуал. Min-height 540px.
- Tablet: single column; текст → CTA → trust → визуал (max-height 300px).
- Mobile: single column; текст → primary CTA (full-width) → secondary CTA (text link) → trust. Визуал упрощён или скрыт.

Hero Visual: `components/ui/HeroDiagram.tsx` — SVG-диаграмма по спецификации `design.md` → "Hero Diagnostic Map — visual specification". 5 узлов (Processes, CRM/RevOps, Data, Automation, IT Systems) с Lucide-иконками, центральный callout «Bottlenecks · Gaps · Risks», нижний flow «Diagnostic → Roadmap → Implementation».

#### Секция 2 — Problem Section (`#problem-section`)

Компонент: `components/sections/ProblemSection.tsx`

Содержание из `texts.md` → "Problem Section":
- H2: «Your business may not have a technology problem first.»
- Text + proof-строка.
- CTA: «Diagnose the Operating Bottleneck» → `#diagnostic-request-form` (data-request-type="Business & IT Diagnostic").

#### Секция 3 — What We Diagnose (`#what-we-diagnose`)

Компонент: `components/sections/WhatWeDiagnose.tsx`

Содержание из `texts.md` → "What We Diagnose". Service cards по типу из `design.md` → "Service Card":
- Lucide icon (24px), H4 title, описание (2–3 строки), output.
- Grid: 3 desktop / 2 tablet / 1 mobile.
- CTA (text link): «See How the Diagnostic Works» → `#how-the-diagnostic-works`.

#### Секция 4 — AI & Process Automation (`#ai-process-automation`)

Компонент: `components/sections/AIProcessAutomation.tsx`

Содержание из `texts.md` → "AI & Process Automation". Та же структура service cards.
- CTA: «Assess Automation Opportunities» → `#diagnostic-request-form` (data-request-type="AI & Process Automation Review").
- Не должна выглядеть как AI-hype. Нет роботов, neon, glowing brain.

#### Секция 5 — How the Diagnostic Works (`#how-the-diagnostic-works`)

Компонент: `components/sections/HowDiagnosticWorks.tsx`

Содержание из `texts.md` → "How the Diagnostic Works". Step cards по типу из `design.md` → "Step Card":
- 3 шага с номерами.
- Горизонтальная последовательность на desktop, вертикальный stepper на mobile.
- CTA: «Start With a Diagnostic» → `#diagnostic-request-form` (generic, без data-request-type).

#### Секция 6 — Diagnostic Scenarios (`#proof-examples`)

Компонент: `components/sections/DiagnosticScenarios.tsx`

Содержание из `texts.md` → "Diagnostic Scenarios". Proof cards по типу из `design.md` → "Scenario / Proof Card":
- 3 анонимизированных сценария.
- Каждый: тип клиента, ситуация, что нашла диагностика, что доставлено.
- Border-left: `4px solid var(--accent)`.
- One-column stacked layout.
- Примечание внизу: «Scenarios are anonymized...»
- CTA (text link): «Request a Diagnostic for Your Team» → `#diagnostic-request-form` (generic).

Правила: не изобретать имена, логотипы, метрики. Сценарии — illustrative composites, не подтверждённые кейсы. Не стилизовать как verified metric tile.

#### Секция 7 — Why Opsfield Systems (`#why-opsfield-systems`)

Компонент: `components/sections/WhyOpsfield.tsx`

Содержание из `texts.md` → "Why Opsfield Systems". Comparison table / cards по типу из `design.md` → "Comparison Card / Table":
- Desktop: side-by-side таблица. Opsfield-колонка: `--accent-light` фон.
- Mobile: парные карточки по спецификации `design.md` → "Mobile comparison layout".
- CTA: «Validate the Decision Before You Implement» → `#diagnostic-request-form` (data-request-type="Business & IT Diagnostic").

#### Секция 8 — Delivery Model (`#delivery-model`)

Компонент: `components/sections/DeliveryModel.tsx`

Содержание из `texts.md` → "Delivery Model". Delivery role cards по типу из `design.md` → "Delivery Role Card":
- 2 карточки: Managing Partner, Solution Architect.
- Без stock-фото. Без выдуманных имён и биографий.
- Relevant environments: HubSpot, Salesforce и т.д. — текстом, не логотипами.
- CTA (text link): «Work With Senior Advisors» → `#diagnostic-request-form` (generic).

#### Секция 10 — FAQ (`#faq`)

Компонент: `components/sections/FAQ.tsx`

Содержание из `texts.md` → "FAQ". Accessible accordion по спецификации `design.md` → "FAQ Item":
- Каждый вопрос: `<button aria-expanded>` с chevron.
- Ответы в HTML (не подгружаются динамически).
- Divider: `1px solid var(--border-default)`.
- Padding: `20px 0`.
- Touch target: min 44px.
- Первый вопрос может быть открыт по умолчанию.
- Вопросы «Who do you work with best?» и «When are you not the right fit?» — с семантическими списками (`<ul>`, `<li>`).
- Fit: CheckCircle2 icon + текст. Not Fit: XCircle icon + текст. Оба: текст несёт смысл, не только цвет/иконка.

Источник ответов: `optimization.md` → "Fit / Not Fit implementation".

#### Секция 11 — Final CTA (`#final-cta`)

Компонент: `components/sections/FinalCTA.tsx`

Содержание из `texts.md` → "Final CTA":
- H2: «Turn operational uncertainty into a scoped next step.»
- Text.
- Primary CTA: «Request a Business & IT Diagnostic» → `#diagnostic-request-form`.
- Secondary CTA: «See How the Diagnostic Works» → `#how-the-diagnostic-works`.
- Допускается `var(--accent)` фон с `var(--text-on-accent)` текстом.

**Материалы из RAG:** `texts.md` — тексты каждой секции; `design.md` — типы карточек, Hero Layout, Section Visual Map, Icon Inventory, Mobile comparison layout; `sitemap.md` → Internal Linking Map, CTA → Request Type Routing; `optimization.md` → Accessibility.

**Кто делает:** владелец с помощью Claude.

**Результат:** 10 секций с контентом, отформатированные, адаптивные.

**Чек-лист перед переходом к этапу 4:**

- [ ] Тексты совпадают с `texts.md` (дословно или допустимо сокращены для layout).
- [ ] Каждый CTA ведёт на правильный якорь из Internal Linking Map (`sitemap.md`).
- [ ] CTA-ссылки к форме содержат `data-request-type` согласно таблице в `sitemap.md` → "CTA → Request Type Routing".
- [ ] Hero: 55/45 split на desktop, single column на mobile.
- [ ] Hero visual: SVG-диаграмма отображается на desktop и tablet; упрощена/скрыта на mobile.
- [ ] Primary CTA виден без скролла на desktop и mobile.
- [ ] ICP qualifier: chip-стиль, не H1, не badge.
- [ ] Cards: 3 desktop / 2 tablet / 1 mobile.
- [ ] Comparison table: парные карточки на mobile.
- [ ] FAQ: accessible accordion, ответы в HTML, ARIA-атрибуты.
- [ ] FAQ: Fit/Not Fit — семантические списки, не только цвет.
- [ ] Proof cards: illustrative, не styled как verified metrics.
- [ ] Нет fake logos, metrics, testimonials, awards.
- [ ] Нет AI-hype: роботов, neon, glowing brain.
- [ ] Bot icon: только в секции AI & Process Automation, никогда в Hero.
- [ ] Один H1 на странице.
- [ ] Heading hierarchy: h1 → h2 → h3 → h4 без пропусков.
- [ ] Touch targets ≥ 44px.
- [ ] Нет горизонтального скролла на 320px и 375px.

**Типичные ошибки:**
- Скопировать текст не из `texts.md`.
- Использовать стоковые фото.
- Подать scenarios как подтверждённые кейсы.
- Забыть парный формат comparison cards на mobile.
- Использовать `<div>` для FAQ trigger вместо `<button>`.
- FAQ-ответы подгружаются JavaScript вместо присутствия в HTML.
- Повторить позиционирование Hero в других секциях.

**Зависит от владельца:** визуальное утверждение Hero-диаграммы (после реализации).

---

### Этап 4. Business & IT Diagnostic + форма

**Цель:** реализовать секцию 9 — единый conversion cluster с формой.

**Что делать:**

1. Создать `components/sections/BusinessITDiagnostic.tsx` с четырьмя вложенными подблоками в строгом порядке (`sitemap.md` → "Business & IT Diagnostic — sub-block order"):

   **Подблок 1 — Offer:**
   - H2: «A structured first step before another tool, hire, or implementation project.»
   - Текст: complimentary 30–45 minute fit review.
   - Output: problem summary, root-cause hypotheses, fit/no-fit decision, path forward.
   - Primary CTA: «Request a Business & IT Diagnostic» → `#diagnostic-request-form`.
   - Стиль: Diagnostic Offer Card из `design.md`.

   **Подблок 2 — Before You Commit:**
   - Review assets, risk control, privacy note.
   - Стиль: Risk-Reduction Panel из `design.md`. Calm, low-friction.

   **Подблок 3 — What Happens After You Submit:**
   - 3 step cards: review → diagnostic → proposal.
   - Стиль: Step Card из `design.md`.

   **Подблок 4 — Diagnostic Request Form (`#diagnostic-request-form`):**
   - Отдельный компонент `components/ui/DiagnosticForm.tsx`.

2. Создать форму `DiagnosticForm.tsx`:

   **4 обязательных поля** (`optimization.md` → "Forms and Conversion → Required fields"):
   - Name — text input.
   - Work Email — email input (`type="email"`).
   - Company — text input.
   - What's your biggest operational challenge right now? — textarea, max 500 символов.

   **Progressive disclosure** (`design.md` → "Progressive Disclosure Control"):
   - Control: `<button>` или `<details><summary>` с текстом «Add more context (optional)» / «Hide optional fields».
   - Иконка: ChevronDown / ChevronUp, 16px.
   - Цвет: `var(--accent)`.
   - Закрыт по умолчанию.
   - Открытие/закрытие не очищает введённые данные.

   **Опциональные поля** (внутри progressive disclosure):
   - Company Website — url input.
   - Role — text input.
   - Company Size — select: 1–25, 26–50, 51–100, 101–250, 251–500, 500+.
   - Timeline — select: ASAP, This month, 1–3 months, 3–6 months, Researching.
   - Request Type — select: 8 значений из `texts.md` → "Request type options".

   **Request Type routing** (`sitemap.md` → "CTA → Request Type Routing"):
   - При нажатии CTA с `data-request-type` — JavaScript читает значение и заполняет select.
   - Request Type — один `<select>`, может быть prefilled и остаётся editable.
   - Не создавать два поля request_type (hidden + visible).
   - Если optional-блок закрыт и request_type prefilled — значение хранится в state и передаётся при submit.

   **Скрытые поля:** page_url, page_section, cta_text, referrer, utm параметры, timestamp.

   **Honeypot:** одно скрытое поле для защиты от спама. Если заполнено — submission отклоняется.

   **Visible labels:** каждое поле имеет `<label>`. Placeholder не заменяет label. `required` и `aria-required="true"` только на обязательных полях.

   **Валидация:**
   - Client-side: email format, textarea max length, required fields.
   - Ошибки привязаны через `aria-describedby`.
   - При ошибке — фокус на первое неверное поле.
   - Данные сохраняются после ошибки.

   **Состояния формы** (`design.md` → "Forms → Submission State"):
   - Default → Loading (кнопка: «Submitting...», spinner, width preserved, fields: opacity 0.6) → Success → Error.
   - Если > 3 секунд: «Still processing...»
   - Duplicate submit prevention: кнопка disabled.

   **Button:** «Submit Diagnostic Request» (не generic «Submit»).

   **Microcopy:** «Four required fields. Additional context is optional. No full system access is required for the first fit review.»

   **Privacy notice:** «By submitting this form, you acknowledge our Privacy Policy. We use your information to evaluate fit and contact you about your diagnostic request.» Ссылка Privacy Policy → `/privacy-policy`.

   **Success state** (`optimization.md` → "Forms and Conversion → Success state"):
   - Подтверждение получения.
   - Следующий шаг: senior review.
   - Ссылка обратно на `#how-the-diagnostic-works`.

   **Error state:**
   - Объяснение ошибки.
   - Сохранение данных.
   - Retry.
   - Fallback email: `general@opsfieldsystems.com` (из `texts.md`).

3. Вся секция — один визуальный блок с общим фоном. Подблоки — не отдельные full-width секции. Sub-blocks не имеют отдельных navigation anchors (кроме `#diagnostic-request-form`).

**Материалы из RAG:** `texts.md` → "Business & IT Diagnostic" (все подблоки), "Diagnostic Request Form"; `design.md` → "Forms", "Progressive Disclosure Control", "Diagnostic Offer Card", "Risk-Reduction Panel", "Step Card", "Form Panel"; `optimization.md` → "Forms and Conversion", "Form Processing", "Progressive disclosure behavior"; `sitemap.md` → "CTA → Request Type Routing", "Diagnostic Request Form", "Business & IT Diagnostic — sub-block order".

**Кто делает:** владелец с помощью Claude.

**Результат:** полностью функциональная секция 9 с формой. Отправка формы вызывает API Route (который будет создан на этапе 5).

**Чек-лист перед переходом к этапу 5:**

- [ ] Секция содержит 4 подблока в правильном порядке: Offer → Before You Commit → Post-Submit Steps → Form.
- [ ] Подблоки визуально объединены — один фон, одна секция.
- [ ] Форма: ровно 4 обязательных поля.
- [ ] Optional fields скрыты за «Add more context (optional)».
- [ ] Форма отправляется без открытия optional-блока.
- [ ] Progressive disclosure: открытие/закрытие не очищает данные.
- [ ] Request Type: один `<select>`, может быть prefilled из CTA.
- [ ] CTA routing работает: каждый CTA из Internal Linking Map корректно заполняет request_type.
- [ ] Honeypot-поле скрыто, невидимо для пользователя.
- [ ] Company Size: без предвыбранного значения, без визуального выделения 51–100 / 101–250.
- [ ] Validation: email, textarea max 500, required fields.
- [ ] Error → focus на первое неверное поле.
- [ ] Данные сохраняются после ошибки валидации.
- [ ] Loading state: кнопка «Submitting...», fields opacity 0.6, duplicate submit blocked.
- [ ] Success и Error states отображаются.
- [ ] Privacy notice видим рядом с кнопкой.
- [ ] Microcopy: «Four required fields...» видим.
- [ ] Button: «Submit Diagnostic Request», не generic «Submit».
- [ ] Visible labels на каждом поле. Placeholder не заменяет label.
- [ ] `type="email"` на поле Work Email.
- [ ] Input font-size ≥ 16px (избежать zoom на iOS).
- [ ] Optional fields не имеют `required` или `aria-required`.

**Типичные ошибки:**
- Создать два поля request_type (hidden + visible select).
- Сделать optional fields обязательными.
- Забыть `type="email"`.
- Не сохранить данные после ошибки.
- Кнопка «Submit» вместо «Submit Diagnostic Request».
- Разбить секцию на 4 отдельных full-width блока.
- Предвыбрать Company Size.

**Зависит от владельца:** нет.

---

### Этап 5. Backend формы: API Route + Resend

**Цель:** создать серверную функцию, которая обрабатывает данные формы, отправляет уведомление и auto-reply.

**Что делать:**

1. Создать аккаунт на [resend.com](https://resend.com). Получить API-ключ. Бесплатный план: 100 emails/день, 3000/месяц.

2. Добавить API-ключ в Vercel Environment Variables:
   - Имя: `RESEND_API_KEY`
   - Значение: ключ из Resend dashboard.
   - Не хранить API-ключи в коде (файлы `.env.local` для локальной разработки, Vercel dashboard для production).

3. Создать `app/api/submit/route.ts` — API Route в Next.js App Router:

   **Логика:**
   - Принять POST-запрос с данными формы.
   - Проверить honeypot (если заполнен — отклонить молча).
   - Серверная валидация: email формат, обязательные поля, textarea ≤ 500 символов.
   - При ошибке: вернуть JSON с описанием ошибок.
   - При успехе:
     - Отправить notification email на адрес владельца (с данными заявки).
     - Отправить auto-reply на email из формы.
     - Вернуть JSON `{ success: true }`.

   **Auto-reply** (`optimization.md` → "Auto-reply email"):
   - Subject: «Diagnostic request received — Opsfield Systems».
   - Body: шаблон из `optimization.md`.
   - Не включать текст challenge в auto-reply.
   - Не включать другие данные формы.
   - From: Resend-домен (для учебного проекта) или `general@opsfieldsystems.com` (для production).

   **Notification email:**
   - Subject: «New diagnostic request from [Company]».
   - Body: все данные формы (name, email, company, challenge, optional fields если заполнены).
   - To: личный email владельца (для учебного проекта).

4. Обновить `DiagnosticForm.tsx` для отправки данных на `/api/submit` через `fetch`.

5. Настроить rate limiting (базовый): отклонять больше 5 submissions с одного IP за 10 минут. Для бесплатного тарифа Vercel это можно сделать через in-memory counter (достаточно для MVP).

**Что НЕ делать** (`optimization.md` → "Data restrictions"):
- Не запрашивать пароли, API-ключи, SSN, immigration documents.
- Не хранить данные формы в localStorage.
- Не отправлять PII (имена, email, текст challenge) в analytics.

**Материалы из RAG:** `optimization.md` → "Form Processing", "Auto-reply email", "Spam protection", "Data restrictions", "Validation"; `texts.md` → auto-reply шаблон (в `optimization.md`).

**Кто делает:** владелец с помощью Claude.

**Результат:** форма отправляет данные на API Route. Владелец получает email с заявкой. Отправитель получает auto-reply.

**Чек-лист перед переходом к этапу 6:**

- [ ] API Route создан в `app/api/submit/route.ts`.
- [ ] RESEND_API_KEY добавлен в Vercel Environment Variables.
- [ ] Honeypot проверяется на сервере.
- [ ] Серверная валидация: email, required fields, textarea max 500.
- [ ] При успехе: notification email приходит на адрес владельца.
- [ ] При успехе: auto-reply приходит на email из формы.
- [ ] Auto-reply не содержит текст challenge и другие данные формы.
- [ ] При ошибке: JSON с описанием ошибок, HTTP 400.
- [ ] При серверной ошибке: HTTP 500, user видит error state.
- [ ] Форма на frontend корректно обрабатывает success и error.
- [ ] API-ключ не хардкодится в файлах.

**Типичные ошибки:**
- Хранить API-ключ в коде вместо environment variables.
- Забыть серверную валидацию (надеяться только на клиентскую).
- Включить текст challenge в auto-reply.
- Не обработать ошибку Resend API (например, невалидный email).
- Не протестировать на Vercel (локально работает иначе).

**Зависит от владельца:** создание аккаунта Resend, добавление API-ключа в Vercel.

---

### Этап 6. Legal-страницы, 404 и cookie consent

**Цель:** создать юридические страницы, кастомную 404 и баннер согласия на cookies.

**Что делать:**

1. Создать страницы:
   - `app/privacy-policy/page.tsx` — текст из `texts.md` → "Privacy Policy".
   - `app/terms-of-use/page.tsx` — текст из `texts.md` → "Terms of Use".
   - `app/cookie-policy/page.tsx` — текст из `texts.md` → "Cookie Policy".
   - `app/not-found.tsx` — кастомная 404 (Next.js convention).

2. Для каждой legal-страницы:
   - Уникальный `<title>` и `<meta description>` из `texts.md`.
   - `<meta name="robots" content="noindex,follow">`.
   - Тот же header/footer, что и главная.
   - Семантическая разметка: заголовки, абзацы, списки.

3. 404-страница (`optimization.md` → "404 page"):
   - Заголовок, краткое сообщение.
   - Ссылка на главную и на `#diagnostic-request-form`.
   - `noindex`.
   - Тот же header/footer.

4. Email-адреса из `texts.md` (например, `privacy@opsfieldsystems.com`) вставляются в код as-is. Они не будут функциональными в учебном проекте, но код готов к замене на рабочие адреса.

5. Создать `components/layout/CookieConsent.tsx`:
   - Компактная панель внизу экрана (не полноэкранный popup).
   - Три действия: Accept, Decline, Privacy Policy (ссылка на `/privacy-policy`).
   - По умолчанию: аналитика отключена.
   - Accept → сохраняет предпочтение в cookie (до 12 месяцев), включает GA4.
   - Decline → сохраняет предпочтение, GA4 остаётся выключенным.
   - Кнопки Accept и Decline визуально равнозначны (нет dark pattern).
   - Читаема на mobile.
   - Копия: «We use optional analytics cookies to understand how the site is used.»
   - Не предвыбирать галочки.
   - Спецификация: `design.md` → "Cookie Consent"; `optimization.md` → "Privacy and Compliance → Cookie banner".

**Материалы из RAG:** `texts.md` → Privacy Policy, Terms of Use, Cookie Policy (полные тексты); `design.md` → "Cookie Consent"; `optimization.md` → "Privacy and Compliance", "404 page".

**Кто делает:** владелец с помощью Claude.

**Результат:** 3 legal-страницы + 404 + cookie consent banner.

**Чек-лист перед переходом к этапу 7:**

- [ ] Legal-страницы имеют `noindex,follow`.
- [ ] Legal-страницы имеют уникальный title и meta description из `texts.md`.
- [ ] Legal-страницы используют тот же header/footer.
- [ ] 404: заголовок, сообщение, ссылки на `/` и `#diagnostic-request-form`, `noindex`.
- [ ] Cookie banner: Accept / Decline / Privacy Policy.
- [ ] Accept и Decline визуально равнозначны.
- [ ] Cookie banner не блокирует страницу.
- [ ] Cookie banner читаем на mobile.
- [ ] Consent preference сохраняется (banner не показывается повторно).
- [ ] GA4 не загружается до Accept (реализация — этап 9).
- [ ] Email-адреса из `texts.md` вставлены в legal-страницы.

**Типичные ошибки:**
- Забыть `noindex` на legal-страницах.
- Сделать Decline мелким и незаметным (dark pattern).
- Cookie banner перекрывает контент или форму.
- 404-страница не использует общий layout.

**Зависит от владельца:** нет (юридический review — отдельная задача для production).

---

### Этап 7. SEO, structured data и метаданные

**Цель:** настроить техническое SEO.

**Что делать:**

1. Настроить metadata в Next.js (`app/layout.tsx` и каждой странице) через `export const metadata`:
   - Homepage: title и description из `texts.md` → "Meta title", "Meta description".
   - Legal pages: title и description из `texts.md`.

2. Open Graph и Twitter Card metadata из `optimization.md` → "Open Graph and Social Metadata":
   - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`.
   - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
   - URL: Vercel subdomain для учебного проекта.

3. Создать favicon и OG image:
   - Favicon: буква «O» в цвете `#1D4ED8` на прозрачном фоне, 32×32 и 180×180 (Apple Touch Icon). Спецификация — `design.md` → "Brand Identity Launch Rules → Development placeholders".
   - OG image: 1200×630px, `#F8FAFC` фон, «Opsfield Systems» по центру.

4. Canonical URL:
   - Self-referencing canonical на каждой странице.
   - Для учебного проекта: Vercel subdomain URL.
   - В production: заменить на final domain.

5. Structured data (JSON-LD) в `app/layout.tsx` или `app/page.tsx`:
   - `@graph` с 4 сущностями: Organization, WebSite, WebPage, Service.
   - Опционально: FAQPage.
   - Все спецификации — `optimization.md` → "Structured Data".
   - Замечание: `[production-domain]` заменить на Vercel subdomain для учебного проекта.

6. `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://[vercel-subdomain]/sitemap.xml
```

Для учебного проекта можно поставить `Disallow: /` (запрет индексации), так как это не production-сайт.

7. `public/sitemap.xml`:
   - Для MVP: только homepage.
   - Не включать legal-страницы (noindex).

**Материалы из RAG:** `texts.md` → Meta title, Meta description; `optimization.md` → "SEO Metadata", "Canonical", "Robots", "Open Graph", "Structured Data"; `design.md` → "Brand Identity Launch Rules".

**Кто делает:** владелец с помощью Claude.

**Результат:** все мета-теги, structured data, robots.txt, sitemap.xml, favicon, OG image.

**Чек-лист перед переходом к этапу 8:**

- [ ] Meta title и description совпадают с `texts.md`.
- [ ] Canonical URL — self-referencing.
- [ ] OG и Twitter metadata заполнены.
- [ ] OG image: 1200×630px, абсолютный HTTPS URL.
- [ ] Favicon: 32×32 и 180×180.
- [ ] JSON-LD: Organization, WebSite, WebPage, Service — валидны (проверка на Schema.org Validator).
- [ ] robots.txt ссылается на sitemap.xml.
- [ ] sitemap.xml содержит только homepage.
- [ ] Legal-страницы не в sitemap.xml.
- [ ] Нет `[production-domain]` placeholder в deployed-коде.
- [ ] H1 содержит основной коммерческий intent.

**Типичные ошибки:**
- Оставить placeholder `[production-domain]` в JSON-LD.
- Добавить legal-страницы в sitemap.xml.
- Написать свой meta description вместо утверждённого в `texts.md`.
- Забыть `og:image` с абсолютным URL.

**Зависит от владельца:** нет.

---

### Этап 8. Accessibility и performance

**Цель:** убедиться в доступности сайта и скорости загрузки.

**Что делать:**

**Accessibility (WCAG 2.2 AA)** — `optimization.md` → "Accessibility":

1. Keyboard navigation: все interactive elements доступны с клавиатуры. Логичный tab order. Visible focus state (min 2px ring). Mobile drawer: focus trap + Escape.

2. ARIA: FAQ — `<button aria-expanded>`, `aria-controls`. Form — errors через `aria-describedby`, success через `aria-live="polite"`. Decorative SVG — `aria-hidden="true"`, `focusable="false"`.

3. Contrast: основной текст на фоне — min 4.5:1. `#CBD5E1` не как текст. Status не только цветом.

4. Images: информативные — meaningful `alt`. Decorative — `alt=""`. Hero diagram — `alt` описывает вывод, не элементы.

5. Forms: visible `<label>`, `autocomplete`, required status текстом + `required` / `aria-required`.

**Performance** — `optimization.md` → "Performance":

1. Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

2. Next.js оптимизации:
   - Static Generation (SSG): все страницы pre-rendered.
   - `next/font`: шрифты self-hosted с `font-display: swap`.
   - `next/image`: автоматическая оптимизация изображений (если используются растровые).
   - Code splitting: автоматическое в Next.js.

3. Images: SVG для диаграмм и иконок. `loading="lazy"` для below-fold. Width и height / aspect-ratio определены. Hero visual — не lazy (LCP element).

4. CSS: переменные из `design.md`, никаких animation libraries.

5. JavaScript: только для menu, FAQ accordion, form, cookie consent, analytics. Не hydrate всю страницу для мелких взаимодействий.

6. Layout stability: зарезервировать место для cookie banner, form messages, images.

**Материалы из RAG:** `optimization.md` → "Accessibility", "Performance", "Core Web Vitals"; `design.md` → "Transitions".

**Кто делает:** владелец с помощью Claude.

**Результат:** Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.

**Чек-лист перед переходом к этапу 9:**

- [ ] Keyboard-only navigation работает (все элементы доступны).
- [ ] Focus states видимы на light и dark surfaces.
- [ ] FAQ: ARIA states работают.
- [ ] Form: labels и errors программно связаны.
- [ ] Mobile drawer: focus trap работает, Escape закрывает.
- [ ] Contrast: AA для всех текстов.
- [ ] Touch targets ≥ 44px.
- [ ] `prefers-reduced-motion` отключает анимации.
- [ ] Input font-size ≥ 16px на mobile (нет zoom на iOS).
- [ ] LCP ≤ 2.5s.
- [ ] CLS ≤ 0.1.
- [ ] Hero visual не lazy-loaded.
- [ ] Below-fold images: `loading="lazy"`.
- [ ] Fonts: WOFF2 + `font-display: swap` (через `next/font`).
- [ ] Нет render-blocking third-party scripts.
- [ ] Нет горизонтального скролла на 320px.

**Типичные ошибки:**
- Удалить outline без замены.
- Забыть `font-size: 16px` на mobile inputs.
- Не зарезервировать место для cookie banner.
- Hero diagram lazy-loaded (ломает LCP).

**Зависит от владельца:** нет.

---

### Этап 9. Аналитика

**Цель:** подключить GA4 после cookie consent.

**Что делать:**

1. Создать GA4 property в Google Analytics. Получить Measurement ID (формат `G-XXXXXXXXXX`). Аккаунт — на бизнес Google-аккаунте.

2. Добавить Measurement ID в Vercel Environment Variables: `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

3. Создать `components/analytics/Analytics.tsx`:
   - Проверяет consent status.
   - Если consent = accepted → загружает GA4 script.
   - Если consent = declined или не установлен → GA4 не загружается.
   - Analytics не блокирует rendering.
   - Events fail silently при отсутствии consent.

4. Настроить основные events из `optimization.md` → "Analytics":
   - `cta_click` (cta_text, cta_location, target, request_type).
   - `form_submit_success`, `form_submit_error`.
   - `faq_item_open` (question_slug).
   - `scroll_25_percent`, `scroll_50_percent`, `scroll_75_percent`, `scroll_100_percent`.
   - `section_enter` (section_id).
   - `form_start`, `form_field_focus`, `form_field_blur`.

5. Privacy constraints (`optimization.md` → "Analytics → Privacy constraints"):
   - НЕ отправлять: field values, challenge text, email, name, company.
   - `request_type`: отправляется label из select list (non-PII).
   - `last_field_focused`: только имя поля (не содержимое).
   - Naming: `snake_case`.

6. Google Search Console:
   - Подтвердить владение сайтом через Vercel DNS или HTML-файл.
   - Отправить sitemap.xml.

**Материалы из RAG:** `optimization.md` → "Analytics" (полный список events, naming, privacy).

**Кто делает:** владелец с помощью Claude.

**Результат:** GA4 работает после consent. Events отправляются. GSC подключён.

**Чек-лист перед переходом к этапу 10:**

- [ ] GA4 не загружается до Accept.
- [ ] После Decline GA4 отсутствует.
- [ ] Сайт полностью работает без analytics.
- [ ] Events проверены в GA4 DebugView.
- [ ] PII не передаётся (имена, email, текст challenge).
- [ ] Event naming: snake_case.
- [ ] GSC подключён, sitemap.xml отправлен.
- [ ] Analytics не блокирует rendering.

**Типичные ошибки:**
- Загрузить GA4 до consent.
- Передать PII в analytics.
- Забыть проверить events в DebugView.
- Naming: camelCase вместо snake_case.

**Зависит от владельца:** создание GA4 property и GSC account.

---

### Этап 10. Тестирование и QA

**Цель:** комплексная проверка перед деплоем.

**Что делать:**

Пройти полный чеклист из `optimization.md` → "Technical QA Before Launch". Адаптация для учебного проекта (без production domain):

**Контент и структура:**
- [ ] Рабочий бренд Opsfield Systems везде; нет альтернативных названий.
- [ ] Порядок секций совпадает с `sitemap.md` — ровно 11 top-level.
- [ ] Business & IT Diagnostic — один composite section (4 sub-blocks).
- [ ] Hero, Problem, Method, Why, Final CTA не повторяют одно и то же.
- [ ] Тексты и CTA совпадают с `texts.md`.
- [ ] Нет TODO, TBD, lorem ipsum, placeholder copy.
- [ ] Нет fake logos, metrics, testimonials, awards.
- [ ] Illustrative scenarios помечены как illustrative.
- [ ] Нет O-1 упоминаний.
- [ ] Нет `LLC`, `Inc.`, `®`.
- [ ] Каждый CTA из `texts.md` ведёт к правильному якорю.

**SEO:**
- [ ] Один H1.
- [ ] Правильный title и meta description.
- [ ] Self-referencing canonical.
- [ ] robots directives корректны.
- [ ] sitemap.xml содержит только indexable URLs.
- [ ] OG и Twitter metadata заполнены.
- [ ] JSON-LD валиден.
- [ ] FAQ в HTML (не dynamic load).
- [ ] FAQ содержит Fit / Not Fit criteria.
- [ ] Нет broken internal links.

**Форма:**
- [ ] 4 обязательных поля: Name, Work Email, Company, Main Challenge.
- [ ] Optional fields скрыты по умолчанию.
- [ ] Форма отправляется без optional fields.
- [ ] CTA routing prefills request_type (один field, editable).
- [ ] Client-side и server-side validation работают.
- [ ] Success и error states работают.
- [ ] Auto-reply приходит.
- [ ] Notification приходит.
- [ ] Privacy notice видим.
- [ ] Honeypot работает.

**Privacy:**
- [ ] Cookie banner: Accept / Decline / Privacy Policy.
- [ ] GA4 не загружается до Accept.
- [ ] GA4 остаётся выключенным после Decline.
- [ ] Сайт работает без analytics.

**Accessibility:**
- [ ] Keyboard navigation работает.
- [ ] Focus states видимы.
- [ ] Mobile drawer focus trap работает.
- [ ] FAQ ARIA states работают.
- [ ] Form labels и errors связаны.
- [ ] Contrast: AA.
- [ ] Touch targets ≥ 44px.
- [ ] `prefers-reduced-motion` работает.
- [ ] Нет горизонтального скролла.

**Performance:**
- [ ] LCP ≤ 2.5s.
- [ ] INP ≤ 200ms.
- [ ] CLS ≤ 0.1.
- [ ] Hero visual оптимизирован.
- [ ] Images с dimensions.
- [ ] Below-fold images lazy-load.
- [ ] Fonts: WOFF2, swap.
- [ ] Lighthouse targets.

**Cross-browser:**
- [ ] Chrome (desktop + Android).
- [ ] Firefox.
- [ ] Safari (desktop + iOS).
- [ ] Edge.
- [ ] Safari iOS: form zoom, smooth scroll, sticky, autocomplete.

**Адаптивное тестирование:**
- [ ] 320px, 375px, 768px, 1024px, 1280px, 1440px.

**Материалы из RAG:** `optimization.md` → "Technical QA Before Launch" (полный чеклист).

**Кто делает:** владелец с помощью Claude.

**Результат:** все чеклист-пункты пройдены.

**Зависит от владельца:** контентная проверка, визуальная проверка на реальных устройствах.

---

### Этап 11. Деплой

**Цель:** убедиться, что Vercel-версия сайта стабильна и доступна.

**Что делать:**

1. Merge ветки `staging` в `main`. Vercel автоматически деплоит.

2. Проверить live-сайт на Vercel subdomain:
   - Все страницы открываются.
   - Форма отправляется.
   - Auto-reply приходит.
   - Cookie banner работает.
   - GA4 работает после consent (если настроен).
   - 404-страница работает.
   - Legal-страницы доступны.

3. Настроить security headers в `next.config.js` или `vercel.json`:
   - `X-Content-Type-Options: nosniff`.
   - `Referrer-Policy: strict-origin-when-cross-origin`.
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
   - Content Security Policy: начать в report-only mode.
   - HTTPS: автоматически через Vercel.
   - Спецификация: `optimization.md` → "Headers baseline".

4. Для перехода к production (когда domain и legal clearance готовы):
   - Подключить домен к Vercel.
   - Настроить Cloudflare DNS (если решите использовать).
   - Заменить Vercel subdomain на production domain в canonical, sitemap, structured data, OG.
   - Настроить email (Google Workspace / Zoho).
   - Настроить redirect: HTTP → HTTPS, www → без www (или наоборот).
   - Убрать `noindex` с homepage.
   - Зарегистрировать domain в GSC.

**Материалы из RAG:** `optimization.md` → "Hosting and Infrastructure", "Headers baseline", "Deployment pipeline", "DNS and domain".

**Кто делает:** владелец с помощью Claude.

**Результат:** сайт доступен на Vercel subdomain. Все функции работают.

**Зависит от владельца:** визуальная проверка, тестирование формы.

---

## Порядок работы и зависимости

```
Этап 0 → Этап 1 → Этап 2 → Этап 3 → Этап 4 → Этап 5
                                                    ↓
                              Этап 6 (параллельно с 5)
                                                    ↓
                              Этап 7 → Этап 8 → Этап 9 → Этап 10 → Этап 11
```

Этапы 3 и 6 можно вести параллельно. Этап 5 зависит от этапа 4 (форма должна существовать). Этап 9 зависит от этапа 6 (cookie consent нужен для GA4). Всё остальное — последовательно.

---

## Внешние аккаунты и сервисы

| Сервис | Когда нужен | Бесплатный план | Что получить |
|---|---|---|---|
| GitHub | Этап 0 | Да | Репозиторий |
| Vercel | Этап 0 | Да (Hobby) | Хостинг + деплой |
| Resend | Этап 5 | 100 emails/день | API-ключ |
| Google Analytics 4 | Этап 9 | Да | Measurement ID |
| Google Search Console | Этап 9 | Да | Верификация домена |

---

## Критические правила (не нарушать)

Собраны из всех четырёх source-файлов:

1. **Не создавать** страницы, секции, URL, anchors, отсутствующие в `sitemap.md`.
2. **Не менять** тексты и CTA — брать из `texts.md`.
3. **Не выдумывать** клиентов, кейсы, метрики, сертификаты, биографии.
4. **Не добавлять** O-1 Agent Services в любом виде.
5. **Не использовать** `LLC`, `Inc.`, `®` у бренда.
6. **Не использовать** AI-hype визуалы: роботы, neon, glowing brain.
7. **Не использовать** stock photos: handshake, meeting room, developers typing.
8. **Не использовать** generic CTA: «Contact Us», «Learn More», «Submit».
9. **Не загружать** GA4 до cookie consent.
10. **Не передавать** PII (имена, email, текст challenge) в analytics.
11. **Не хранить** form data в localStorage.
12. **Не использовать** jQuery, Bootstrap.
13. **Не создавать** horizontal page scroll.
14. **Не использовать** lorem ipsum.
15. **Не размещать** `#CBD5E1` как цвет текста.
16. **11 секций** — не больше, не меньше.
17. **Business & IT Diagnostic** — одна секция, 4 подблока.
18. **Request Type** — один field, не два (hidden + visible).
19. **Company Size** — без предвыбранного значения.
20. **FAQ** — ответы в HTML, не dynamic load.
