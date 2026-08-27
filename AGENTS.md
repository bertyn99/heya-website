# AGENTS.md — heyaconvivialite.fr (`web/`)

Project A only: marketing site + `/admin` CMS. Not the IoT dashboard (Project B).

Parent context: `../AGENTS.md`. CMS architecture (source of truth): `../architecture_web_cms.md`. Design: Figma `Q6qQE08D65ejymddc96Q0Q`.

---

## Stack (locked)

| Layer | Choice |
|---|---|
| App | Nuxt 4, one app: `/` public + `/admin` CMS |
| UI | Nuxt UI 4 + Tailwind 4, light mode only, DM Sans |
| CMS render | `@comark/nuxt` (not installed yet). Pages = block builder → Comark markdown. Blog = TipTap `UEditor` minus AI |
| Auth | `@nuxtjs/better-auth` email/password, signup disabled. One editor (Elise) |
| ORM | Drizzle via NuxtHub (`hub.db: 'sqlite'` → D1 in prod) |
| Validation | Zod in `shared/schemas/*`, parse on API with `server/utils/validate.ts` |
| SEO | `@nuxtjs/seo` fed by CMS `seo` rows |
| Hosting | Cloudflare Worker, D1 + R2 + KV. Local emulation first (`hub.remote: false`) |
| Package manager | **pnpm** (`packageManager: pnpm@11.9.0`) |

Not used: Nuxt Studio, Vercel/Netlify, nuxt-auth-utils, Prisma, cooking-blog AI / recipes / Strapi import.

---

## Commands

```bash
pnpm dev                    # http://localhost:3000 (SQLite + blob + KV in .data/)
pnpm lint
pnpm typecheck
pnpm db:generate            # drizzle generate
pnpm db:migrate
pnpm task:seed-admin        # needs `pnpm dev` running
pnpm task:publish-scheduled # local stand-in for Cloudflare cron
pnpm build                  # Cloudflare preset
```

Env: copy `.env.example`. Required: `NUXT_BETTER_AUTH_SECRET` (≥ 32 chars). Local seed: `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Prod: `NUXT_PUBLIC_SITE_URL=https://heyaconvivialite.fr`.

Do not enable `hub.remote`. Do not commit `.env` or `.data/`.

---

## Layout

```
web/
├── app/
│   ├── assets/css/main.css     # brand tokens (Figma)
│   ├── components/             # landing sections + chrome
│   ├── data/                   # hardcoded copy until CMS seed
│   ├── layouts/default.vue     # public
│   ├── layouts/admin.vue       # CMS shell
│   ├── pages/                  # public routes + /admin/*
│   ├── utils/navigation.ts     # nav + CAL_COM_URL
│   ├── utils/heya-ui.ts        # shared section classes
│   ├── auth.config.ts          # defineClientAuth
│   └── app.config.ts           # Nuxt UI theme (primary = heya orange)
├── server/
│   ├── api/                    # REST (admin CRUD still to build)
│   ├── db/schema.ts            # CMS tables (pages, posts, seo, blobs)
│   ├── db/migrations/sqlite/
│   ├── tasks/                  # seed-admin, publish-scheduled
│   ├── utils/validate.ts       # Zod → 422
│   └── auth.config.ts          # defineServerAuth
├── shared/
│   ├── schemas/                # Zod (auth, contact, content)
│   └── types/content.ts        # draft | published | scheduled
├── nuxt.config.ts
└── wrangler.jsonc
```

`~/` → `app/`. Shared isomorphic code: `#shared/*`.

---

## Current vs next

**Done:** NuxtHub local, Better Auth + login, admin layout/stubs, Drizzle CMS schema, seed-admin, publish-scheduled task, public marketing pages (copy still in Vue).

**Next (see architecture §12):** `@comark/nuxt` + block catalogue, serialize/parse builder ↔ Comark, public renderer from D1, page builder UI, blog editor, publish/schedule APIs, media picker, page seed, go-live on Elise Cloudflare.

Public pages currently read `app/data/*` and section components. Do not invent a second CMS. Move copy into `pages.content_md` / `posts.content_md` when the renderer lands.

---

## Auth

- `server/auth.config.ts`: `emailAndPassword.enabled`, `disableSignUp: true`. No OAuth. No `drizzleAdapter(...)` (NuxtHub owns it).
- Do not set `secret` / `baseURL` by hand. Module injects them.
- `routeRules`: `/admin/**` user-only → `/admin/login`; `/admin/login` guest-only → `/admin`.
- Seed via Nitro task or `POST /_dev/seed-admin` (dev only). Never a public register form.
- Admin APIs: `requireUserSession(event)`. One role: editor.

Better Auth tables (`user`, `session`, `account`, `verification`) are generated. Do not rewrite them. CMS tables FK via `#auth/schema`.

---

## CMS model

Two collections. Source of truth = Comark markdown in D1. Public site reads `status = published` only.

| Table | Role |
|---|---|
| `pages` | slug, title, status, `content_md`, schedule/publish dates |
| `posts` | blog: excerpt, cover pathname, category string, `content_md` |
| `seo` | `entity_type` page\|post + `entity_id` |
| `blobs` | media metadata; files in R2 / `.data/blob` |

Statuses: `draft` | `published` | `scheduled`. Save ≠ publish. Unpublish → `draft`.

Cron in **prod only**: `*/5 * * * *` → task `publish-scheduled`. Local: `pnpm task:publish-scheduled`.

Site is FR only. No `locale`, no page hierarchy, no revisions, no audit log, no category CRUD in v1.

### Block catalogue (closed)

`hero`, `business-proof`, `problem`, `how-it-works`, `values`, `use-cases`, `testimonials`, `offers`, `contact-cta`, `solution`, `richtext`.

Elise reorders and edits props. She does not invent block types or write `::hero` by hand. Contact form + Cal.com stay **code**. TipTap (`UEditor`) is for blog prose and the `richtext` block only. Landing sections never go through `UEditor`.

Seed slugs: `/`, `/concept`, `/a-propos`, `/contact`, `/mentions-legales`, `/politique-de-confidentialite`, `/solutions/residences-seniors`, `/solutions/residences-etudiantes`, `/solutions/co-living`, `/solutions/habitat-inclusif`. `/blog` is a code list route.

---

## Public site (must preserve)

- Tagline: "Créer du lien en habitat partagé" (not seniors-only).
- Cal.com: `https://cal.com/elise-croguennoc/temps-d-echange` (`CAL_COM_URL`).
- YouTube: `OCfrl-l-guI`.
- Quote form: Prefix, Prénom*, Nom*, Email*, Téléphone*, Nombre d'unités, Date d'installation, Durée de test (3/6/12 mois), Notes (180). Schema: `shared/schemas/contact.ts`.
- Activity colors: bleu jeux, jaune extérieur, orange manuel, violet café. Tokens in `app/assets/css/main.css`.
- UI primary is Figma orange `#ff763c` (`heya`), not the old WordPress blue.

---

## Conventions

- **pnpm**, not npm.
- ESLint stylistic: no trailing commas, `1tbs` braces (see `nuxt.config.ts`).
- Zod schemas in `shared/schemas/`. API bodies: `validateBody(event, schema)`.
- Auto-imports: do not import Vue/Nuxt composables. Explicit imports for Zod, Drizzle, project modules.
- Components PascalCase. API files kebab-case with method suffix (`index.get.ts`, `[id].put.ts`).
- CMS media via blob binding, never `public/` for editorial images.
- `colorMode` is light-only. Do not add a dark theme.

---

## Do not

- Mix Project B (MQTT, Timescale, Mosquitto, SSE dashboard) into this app.
- Copy cooking-blog features listed as out of scope (AI, recipes, Strapi, roles, revisions, two Workers).
- Install `nuxt-studio` or `@onmax/nuxt-better-auth`.
- Open signup (`disableSignUp` must stay true).
- Put `residence_id` or IoT telemetry anywhere here.
- Deploy or point DNS without client approval. Prod is Elise's Cloudflare account, not a personal preview.
- Commit secrets, `.data/`, or change `dev`/`deploy` scripts unless they are actually broken.

Verification: `pnpm lint` → `pnpm typecheck`. Exercise `/` and `/admin/login` when touching UI.
