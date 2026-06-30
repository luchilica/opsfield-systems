# Multilingual Architecture

## Final Decision

**MVP запускается только на English (United States).** Многоязычность не должна увеличивать стоимость и сроки первого запуска, пока не подтверждены спрос, языковая готовность sales/delivery и экономика локализованных лидов.

При этом i18n-архитектура закладывается сразу: locale-aware content model, URL helpers, SEO component, translation statuses, glossary, CRM language fields и contract tests. Это предотвращает переделку компонентов и маршрутов после появления спроса.

Порядок коммерческого запуска:

1. **English (`en-US`)** — основной язык и единственный публичный язык MVP.
2. **Spanish (`es-US`)** — первый дополнительный язык после выполнения launch criteria.
3. **Simplified Chinese (`zh-Hans`)** — следующий рыночный кандидат для США и Калифорнии; приоритет выше русского по размеру потенциального сегмента, но стоимость и требования к native review выше.
4. **Russian (`ru-US`)** — условный нишевой язык. Добавляется не из-за количества носителей, а только при наличии подтвержденного русскоязычного pipeline, sales owner и возможности выполнять consulting delivery на русском.

Русская и китайская версии не создаются как индексируемые страницы «на будущее». До подтверждения спроса допускаются только отдельные **human-reviewed `noindex,nofollow` pilots** с корректной CRM-маркировкой.

Каждый запущенный язык должен локализовать весь пользовательский путь:

- коммерческую landing page;
- navigation, CTA, FAQ и 404;
- form labels, options, validation, consent и system messages;
- metadata, Open Graph и structured data;
- auto-reply и sales follow-up templates;
- legal notices и legal pages после отдельного review.

Запрещены browser-translation widgets, runtime machine translation, proxy-localization без контроля контента и частично переведенные индексируемые страницы.

## Language Priorities

| Язык | Бизнес-основание | Готовность продаж и delivery | Приоритет | Решение |
|---|---|---|---|---|
| English — `en-US` | Основной рынок, ICP, позиционирование, approved copy и operating model ориентированы на США | Подтверждена текущей документацией | P0 | Единственный язык MVP |
| Spanish — `es-US` | Крупнейший неанглоязычный сегмент США; Hispanic owners контролируют более 5 млн компаний. Наиболее вероятный источник дополнительного qualified demand | Не подтверждены bilingual sales owner, delivery reviewer и Spanish proposal workflow | P1 | Полный Phase 2 launch после выполнения критериев |
| Simplified Chinese — `zh-Hans` | Chinese — крупнейшая после Spanish отдельная группа языков, используемых дома в США; Калифорния имеет крупную Asian-owned business base. Это сильный market signal, но не доказательство спроса на конкретную услугу | Native sales/delivery и technical reviewer не подтверждены; localization cost выше Spanish/Russian | P2 | Research и controlled pilot после Spanish; full launch только при native operating capacity |
| Russian — `ru-US` | Возможен доступ к русскоязычным founders и operators в США, но это нишевой сегмент и недостаточное основание для массовой SEO-локализации | Требуется подтвердить русскоязычного sales owner, delivery capability и реальные lead sources | P3 по рынку; может стать P2 по pipeline | `noindex` pilot или referral-led launch; organic version только после доказанной экономики |

**Правило пересмотра:** Russian может быть запущен раньше Simplified Chinese, если фактический qualified pipeline и operational readiness выше. Решение принимается по revenue evidence, а не по демографии.

## Launch Criteria

### Общие обязательные условия

Язык получает статус `published` только при выполнении всех условий:

- назначен человек, способный проводить discovery, qualification и коммерческие переговоры на этом языке;
- назначен bilingual reviewer со знанием IT, CRM, automation, data и business-process terminology;
- компания способна выполнять diagnostic и сопровождать delivery на этом языке либо заранее раскрывает, что delivery проходит на English;
- подготовлены localized email templates, proposal workflow, NDA process и escalation rules;
- переведен и проверен весь пользовательский путь;
- legal content проверен qualified counsel или legal translator;
- CRM routing и response ownership протестированы;
- прогнозируемая 12-месячная gross profit составляет минимум **3×** полной стоимости запуска и годовой поддержки языка;
- переводы могут обновляться не позднее чем через **10 рабочих дней** после изменения approved English source.

### Spanish launch

Необходимо минимум два demand signals:

- не менее **10 qualified Spanish-language inquiries за 90 дней**;
- Spanish preference составляет минимум **10% qualified inbound leads**;
- не менее **3 sales-qualified opportunities** или один closed-won клиент через bilingual outreach/pilot;
- минимум **15 релевантных high-intent search queries** с совокупным U.S. volume от **300 запросов в месяц**;
- после минимум 300 релевантных sessions pilot conversion составляет не менее **70% English baseline**.

### Simplified Chinese launch

Необходимо:

- native или near-native sales owner и отдельный native technical reviewer;
- минимум **8 qualified Chinese-language inquiries за 90 дней** либо **3 sales-qualified opportunities**;
- подтвержденный acquisition channel: partner, community, paid pilot или search demand;
- pilot conversion не ниже **70% English baseline**;
- документированное решение использовать именно Simplified Chinese. Traditional Chinese не генерируется автоматической конвертацией и рассматривается как отдельный locale.

### Russian launch

Необходимо:

- подтвержденный русскоязычный sales/delivery owner;
- минимум **5 qualified Russian-language inquiries за 90 дней** либо **2 sales-qualified opportunities**;
- минимум один воспроизводимый lead source: referral network, community, partner или targeted campaign;
- expected gross profit минимум **3×** annual localization/support cost;
- organic indexing разрешается только после подтверждения search intent. До этого используется `noindex` pilot.

## Technical Architecture

Выбранная архитектура:

**Astro 6 static i18n routing + local typed content + Git-based translation workflow.**

```text
locales:
  - en-US
  - es-US
  - ru-US
  - zh-Hans

defaultLocale: en-US
prefixDefaultLocale: false
```

Критические правила:

- English routes остаются в корне.
- Localized routes создаются только для locale со статусом `published`.
- Основной контент присутствует в generated static HTML.
- Не использовать runtime translation API или client-side подмену основного copy.
- Locale-aware logic централизуется в `BaseLayout`, SEO component, route helpers и content loader.
- Components не содержат пользовательский текст и получают localized content через typed props.
- Content schema требует одинаковый набор обязательных keys для всех published locales.
- Missing, draft или stale translation блокирует production build соответствующего route.
- Provider-specific localization SaaS не добавляется на текущем объеме сайта.

### Отклоненные финалисты

| Вариант | Причина отказа |
|---|---|
| Client-side translation widget | Не дает надежного SEO, quality control и consistent legal/CTA terminology |
| Translation proxy | Vendor lock-in и постоянная стоимость не оправданы текущим объемом |
| Отдельные компоненты для каждого языка | Создают code/content drift и увеличивают стоимость каждого обновления |
| Автоматическая публикация AI-перевода | Высокий риск изменения claims, facts, legal meaning и terminology |

## URL and SEO Rules

### URL structure

| Locale | Homepage | Legal example |
|---|---|---|
| `en-US` | `/` | `/privacy-policy` |
| `es-US` | `/es/` | `/es/privacy-policy` |
| `ru-US` | `/ru/` | `/ru/privacy-policy` |
| `zh-Hans` | `/zh-hans/` | `/zh-hans/privacy-policy` |

Основному языку не создается `/en/`.

### HTML language

- English: `<html lang="en-US">`
- Spanish: `<html lang="es-US">`
- Russian: `<html lang="ru-US">`
- Simplified Chinese: `<html lang="zh-Hans">`

Фрагмент на другом языке получает собственный `lang`. Страница не должна содержать непреднамеренное смешение языков.

### Canonical

- Каждая published page имеет self-referencing canonical на том же языке.
- Localized page не canonicalizes на English.
- Query parameters, UTM и preview hosts не создают отдельные canonical URLs.
- Pilot pages используют `noindex,nofollow` и не входят в canonical language cluster.

### `hreflang`

Published equivalents содержат одинаковый reciprocal set:

```html
<link rel="alternate" hreflang="en-US" href="https://[production-domain]/" />
<link rel="alternate" hreflang="es-US" href="https://[production-domain]/es/" />
<link rel="alternate" hreflang="ru-US" href="https://[production-domain]/ru/" />
<link rel="alternate" hreflang="zh-Hans" href="https://[production-domain]/zh-hans/" />
<link rel="alternate" hreflang="x-default" href="https://[production-domain]/" />
```

Правила:

- alternate добавляется только для реально существующего published equivalent;
- каждая страница указывает на себя;
- все links absolute, HTTPS и bidirectional;
- `x-default` указывает на English root;
- draft, pilot, stale, `noindex` и отсутствующие страницы не входят в cluster;
- запрещен automatic redirect по IP, geolocation или browser language;
- допустим только неблокирующий language suggestion.

### Multilingual sitemap

Использовать один generated `sitemap.xml`, пока число indexable URLs остается небольшим.

- Каждый localized canonical URL имеет отдельный `<url>`.
- Каждый `<url>` содержит полный набор `xhtml:link` для опубликованных equivalents и `x-default`.
- Legal, pilot, thank-you, parameter, preview и другие `noindex` URLs исключаются.
- Sitemap строится из locale manifest, а не редактируется вручную.
- При снятии locale с публикации его URL и alternate links удаляются одной сборкой.

### Metadata and structured data

Отдельно локализуются:

- title и meta description;
- Open Graph и X/Twitter metadata;
- image alt/accessible descriptions;
- FAQ questions and answers;
- `WebPage`, `WebSite` и `Service` name/description.

Structured data:

- `inLanguage` соответствует locale;
- `availableLanguage` указывается только для языков, на которых реально доступны sales и delivery;
- Organization name, brand, IDs, URLs, product names, system names, dates и подтвержденные numbers не переводятся;
- FAQ schema полностью совпадает с видимым localized FAQ;
- noindex legal pages не включаются в sitemap и не используются как SEO landing pages.

## Content and Translation Model

### Storage

```text
src/
├── content/
│   ├── site/
│   │   ├── en-US/
│   │   ├── es-US/
│   │   ├── ru-US/
│   │   └── zh-Hans/
│   └── legal/
│       ├── en-US/
│       ├── es-US/
│       ├── ru-US/
│       └── zh-Hans/
└── i18n/
    ├── locales.yml
    ├── glossary.yml
    ├── do-not-translate.yml
    └── translation-manifest.yml
```

- Landing content хранится в typed JSON/YAML.
- Legal pages хранятся в Markdown с required frontmatter.
- Keys описывают функцию: `hero.title`, `form.email.label`, `faq.roi.answer`.
- English sentences не используются как translation keys.
- Approved English остается semantic source of truth.
- RAG-файлы не парсятся во время runtime/build и не попадают в browser bundle.

### Translation statuses

| Status | Значение | Production |
|---|---|---|
| `source_approved` | Approved English source | Да |
| `ai_draft` | Машинный черновик | Нет |
| `human_reviewed` | Проверен bilingual reviewer | Нет |
| `legal_reviewed` | Проверен legal reviewer | Только legal |
| `published` | Разрешен для production | Да |
| `stale` | Source изменился после перевода | Нет |
| `blocked` | Meaning, terminology или legal conflict | Нет |

### Version control

Каждый translation unit хранит:

```yaml
source_locale: en-US
target_locale: es-US
source_version: 1.0.0
source_checksum: sha256:...
translation_version: 1.0.0
status: published
reviewed_by: reviewer-id
reviewed_at: YYYY-MM-DD
```

- Изменение source checksum переводит dependent translation в `stale`.
- Production build завершается ошибкой при missing/stale required keys.
- Все content changes проходят Pull Request с readable text diff.
- Approved segments формируют project translation memory.
- Glossary и do-not-translate list version-controlled и обязательны для AI и human review.

### Fallback

- В production запрещен скрытый fallback отдельных strings на English.
- Missing required translation вызывает build failure или отсутствие localized route.
- В preview English fallback допустим только с видимой маркировкой `[EN fallback]`.
- Language switcher показывает только published equivalent.
- Отсутствующий localized URL возвращает корректный localized 404, а не silent redirect на English.

## Language Switcher

### Labels

- `English`
- `Español`
- `Русский`
- `简体中文`

### Desktop

- Размещение в header перед primary CTA.
- При двух языках допустимы прямые links.
- При трех и более используется accessible dropdown.
- Текущий язык отмечается `aria-current="page"`.
- Не использовать flags.

### Mobile

- Размещение внутри navigation drawer после основных links и перед CTA.
- Touch target минимум `44×44px`.
- Open/closed state передается текстом и ARIA, не только icon.

### Behavior

- Каждая опция — обычный `<a>` на equivalent URL.
- Выбор можно сохранить в first-party cookie `site_locale` до 12 месяцев.
- Cookie не вызывает автоматический redirect.
- При переключении сохраняется equivalent page и, где возможно, valid anchor.
- Если equivalent отсутствует, locale не показывается либо помечается `Available in English only`.
- Browser-language prompt показывается один раз и не блокирует страницу.

## Forms, CRM and Analytics

### Forms

Локализуются:

- labels и placeholders;
- select labels;
- helper text;
- validation errors;
- loading, success и failure states;
- privacy notice;
- auto-reply и follow-up templates.

CRM получает стабильные codes, а не translated labels:

```text
request_type = business_it_diagnostic
page_locale = ru-US
content_language = ru
preferred_contact_language = ru
translation_version = 1.0.0
lead_language_route = russian_queue
```

Правила:

- не создавать отдельный pipeline для каждого языка без business need;
- qualification и scoring logic остаются едиными;
- language route назначает bilingual owner;
- пользователь до submit должен знать, если consultation или delivery проводится только на English;
- free-form form content не переводится автоматически и не передается AI без approved privacy process;
- analytics не получает form values или translated free-form text.

### CRM fields

Обязательные поля:

- `page_locale`;
- `content_language`;
- `preferred_contact_language`;
- `translation_version`;
- `source_url`;
- `lead_language_route`;
- `language_service_level` — `full`, `sales_only` или `english_delivery`.

### Analytics

Добавить non-PII parameters:

- `content_language`;
- `page_locale`;
- `language_switch`;
- `language_prompt_shown`;
- `language_prompt_accepted`;
- `translation_version`.

Сравнивать:

- session → form start;
- form start → submit;
- qualified-lead rate;
- booked-diagnostic rate;
- proposal rate;
- closed-won rate;
- pipeline value;
- revenue и gross profit;
- cost per qualified lead;
- response time by language.

Browser language не используется вместо фактического page locale. Решения о масштабировании не принимаются до минимальной выборки из Launch Criteria.

## Legal Content

- Localized legal pages являются controlled legal translations, а не marketing copy.
- AI может создавать только внутренний draft.
- Privacy Policy, Terms of Use, Cookie Policy, consent copy и contractual notices требуют human legal review.
- Все language versions имеют одинаковые policy version IDs и synchronized `Last updated`.
- Перевод не может менять liability, warranties, rights, retention, dispute terms или scope.
- English-precedence clause добавляется только после counsel approval.
- Locale и version legal notice сохраняются вместе с form submission.

Для California Civil Code §1632:

- Spanish и Chinese могут создавать дополнительные translation obligations для определенных видов соглашений, если переговоры ведутся преимущественно на соответствующем языке.
- Это не означает, что любой B2B consulting contract автоматически подпадает под §1632.
- До запуска Spanish или Chinese sales process counsel должен определить применимость по типу договора и способу переговоров.
- Russian не следует считать покрытым тем же правилом без отдельного legal basis.
- При изменении English legal source localized version немедленно получает `stale` и снимается с production до review.

## AI Translation Rules

AI разрешено создавать только status `ai_draft`.

AI запрещено:

- менять positioning, ICP или anti-positioning;
- усиливать promises;
- добавлять guarantees или implied ROI;
- менять numbers, dates, timelines, employee ranges и facts;
- придумывать clients, cases, metrics, credentials, awards или evidence;
- добавлять services, deliverables или engagement types;
- менять legal meaning;
- переводить brand, trademarks, approved product/system names и do-not-translate terms;
- использовать разные переводы одного service name или CTA;
- объединять, удалять или создавать content units;
- менять placeholders, URLs, enum codes и analytics IDs;
- публиковать перевод или присваивать `published`;
- переводить user submissions без отдельного approved process.

Обязательный процесс:

1. Source segment получает immutable ID и checksum.
2. AI получает target locale, approved glossary, do-not-translate list и forbidden transformations.
3. AI возвращает translation map с теми же IDs.
4. Automated checks сравнивают numbers, dates, URLs, placeholders, CTA IDs и enum values.
5. Bilingual reviewer проверяет meaning, terminology, tone и commercial accuracy.
6. Legal content проходит отдельный legal review.
7. Reviewer фиксирует status, identity и date.
8. Production публикует только `published` translations.

## QA Checklist

- [ ] Published locales перечислены в одном locale manifest.
- [ ] Каждый localized URL возвращает ожидаемый `200` или корректный `404`.
- [ ] `<html lang>` соответствует языку страницы.
- [ ] Нет непреднамеренного смешения языков.
- [ ] Canonical self-referencing и same-language.
- [ ] `hreflang` absolute, reciprocal и содержит self-reference.
- [ ] `x-default` указывает на English root.
- [ ] Sitemap содержит только published canonical indexable URLs.
- [ ] Metadata, Open Graph и structured data локализованы.
- [ ] `inLanguage` соответствует locale.
- [ ] Language switcher работает без JavaScript, keyboard и screen reader.
- [ ] Нет IP/browser-language redirect.
- [ ] CTA ведут на equivalent localized targets.
- [ ] Form labels, options, validation, success и failure локализованы.
- [ ] CRM получает locale, language route и service level.
- [ ] Analytics не получает PII и free-form text.
- [ ] Email templates соответствуют preferred language.
- [ ] Numbers, facts, service names и CTA совпадают с source.
- [ ] Нет `ai_draft`, `stale`, missing keys или hidden English fallback.
- [ ] Legal translations имеют review и synchronized version.
- [ ] Chinese проверен на line breaking, punctuation и font coverage.
- [ ] Russian проверен на text expansion и переносы длинных слов.
- [ ] Проверены 320, 375, 768, 1024, 1280 и 1440 px.
- [ ] Проверены keyboard, focus, zoom, screen reader и form autofill.
- [ ] Locale contract tests и production build проходят без ошибок.

## Required Project Changes

| File | Required change |
|---|---|
| `sitemap.md` | Добавить `multilingual.md` в Project File Map. Не добавлять localized routes до выполнения Launch Criteria. |
| `optimization.md` | Добавить locale-aware canonical, `hreflang`, multilingual sitemap, `html lang`, localized metadata/schema, no-auto-redirect и language analytics rules. |
| `design.md` | Добавить Language Switcher component, desktop/mobile states, Chinese font fallback и QA для Spanish/Russian text expansion. |
| `texts.md` | Не переписывая copy, присвоить content units stable IDs, source version и checksum. Localized copy хранить отдельно. |
| `vibe-coding-stack.md` | Добавить locale folders, locale manifest, translation schema, stale detection и multilingual contract tests в Astro architecture. |
| `development-plan.md` | Пометить Next.js/Vercel architecture как superseded или синхронизировать с выбранным Astro/Netlify stack. Multilingual implementation следует `vibe-coding-stack.md`. |
| `.claude/rules/content-protection.md` | Добавить AI Translation Rules и запрет изменения translation status без human approval. |
| `src/content/` | Разделить content по locale directories и добавить schema parity validation. |
| `src/i18n/` | Создать `locales.yml`, `glossary.yml`, `do-not-translate.yml` и `translation-manifest.yml`. |
| SEO component | Генерировать canonical, `hreflang`, `x-default`, `lang`, localized metadata и `inLanguage` из locale manifest. |
| Form/CRM integration | Добавить locale, preferred language, translation version, service level и language routing. |
| Analytics tracking plan | Добавить locale dimensions и funnel comparison без PII. |
| Test suite | Добавить route parity, missing-key, stale-translation, canonical, `hreflang`, sitemap, mixed-language и localized-form tests. |

## Sources

Официальные источники проверены **30 June 2026**:

- [Google Search Central — Managing Multi-Regional and Multilingual Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google Search Central — Localized Versions, hreflang and multilingual sitemaps](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Search Central — Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Search Central — Locale-Adaptive Pages](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages)
- [Astro Documentation — Internationalization Routing](https://docs.astro.build/en/guides/internationalization/)
- [Astro Documentation — i18n API Reference](https://docs.astro.build/en/reference/modules/astro-i18n/)
- [W3C Internationalization — Language Tags in HTML and XML](https://www.w3.org/International/articles/language-tags/index.en.html)
- [W3C Internationalization — Declaring Language in HTML](https://www.w3.org/International/questions/qa-html-language-declarations.html)
- [Schema.org — inLanguage](https://schema.org/inLanguage)
- [Schema.org — availableLanguage](https://schema.org/availableLanguage)
- [U.S. Census Bureau — Language Spoken at Home, 2018–2022 ACS](https://www.census.gov/newsroom/press-releases/2023/language-at-home-acs-5-year.html)
- [U.S. Census Bureau — Detailed Languages Spoken at Home, 2017–2021](https://www.census.gov/newsroom/press-releases/2025/2017-2021-acs-language-use-tables.html)
- [SBA Office of Advocacy — Hispanic Ownership Statistics 2024](https://advocacy.sba.gov/2024/09/17/small-business-facts-hispanic-ownership-statistics-2024/)
- [SBA Office of Advocacy — Asian American Pacific Islander Ownership Statistics 2024](https://advocacy.sba.gov/2024/05/07/facts-about-small-business-asian-american-pacific-islander-ownership-statistics-2024/)
- [California Legislative Information — Civil Code §1632](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1632)
