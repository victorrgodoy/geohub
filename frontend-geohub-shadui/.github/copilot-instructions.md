## Repo overview — big picture

- Stack: React 19 + TypeScript + Vite. Dev server: `npm run dev` (vite). Build: `npm run build` (runs `tsc -b` then `vite build`). Lint: `npm run lint`.
- Frontend talks to two HTTP backends:
  - internal backend: axios instance `api` in `src/services/api.ts` (base URL from `VITE_BACKEND_API_URL`)
  - public REST Countries API: `restCountriesApi` in `src/services/api.ts` (used by `src/services/restCountries.ts`).

## Architecture & data flow (how things move)

- UI components (mostly under `src/components` and `src/components/ui`) are presentational primitives built on Radix + Tailwind.
- Pages live in `src/pages/*` and are composed by the `Layout` page (`src/pages/Layout.tsx`) which wires common providers and global layout (sidebar, breadcrumb).
- Routing: `src/router.tsx` — `Layout` is the root and child routes include `Overview` and `Continent`.
- Data fetch flow: component -> hook (in `src/hooks`) -> service (in `src/services`) -> axios instance (`src/services/api.ts`).
  - Example: `Overview` uses hooks (see `src/hooks/useRestCountries.ts`) which call `src/services/restCountries.ts` that uses `restCountriesApi`.

## Provider & global state patterns

- App provider order is important (see `src/App.tsx`): ThemeProvider -> PageTitleProvider -> QueryClientProvider -> Router. Keep the order when adding providers.
- Theme toggling is implemented by adding `dark` / `light` classes to `document.body` in `src/context/theme/themeProvider.tsx`.
- Page title is stored in `src/context/pageTitle/*` and components set it via `usePageTitle()`.

## Services, types, and conventions

- All HTTP calls live in `src/services/*`. Each service exports small async functions (e.g., `createCountry`, `listAllCountry`) that return typed responses (see `src/types/*`).
- Use the existing typed shapes in `src/types` (Country, Continent, City). Prefer returning those types from service functions.
- React Query is used for data caching and server state (`@tanstack/react-query`). Follow the pattern in `src/hooks/*`: a hook returns the `useQuery` call configured with `queryKey` and `queryFn` that calls a service function.

## Build / dev / debug workflow notes

- Start development server: `npm run dev`. Hot reload provided by Vite.
- Full build: `npm run build`. Note: it runs `tsc -b` before `vite build` — TypeScript project references may fail if `tsconfig` is misconfigured.
- Preview production build: `npm run preview`.
- Lint: `npm run lint` (ESLint configured in `eslint.config.js`).
- Environment: set `VITE_BACKEND_API_URL` in your `.env` or your shell before running dev to connect to the backend. If you see `Network Error` on API calls, check CORS and that `VITE_BACKEND_API_URL` is reachable from the browser.

## Project-specific patterns and gotchas

- axios instances: prefer using `api` or `restCountriesApi` rather than creating ad-hoc fetches so interceptors or baseURL changes are centralized (`src/services/api.ts`).
- Services return raw `data` from the backend; callers expect the shaped objects defined in `src/types`.
- Provider composition matters — changing the provider order can break theme or query behavior.
- UI primitives: `src/components/ui` contains low-level Radix/Tailwind components; `components/app*` files wrap them into app-specific widgets. When adding a new UI control, create a primitive in `ui/` and then an `app*` wrapper if it needs app-specific wiring.

## Integration points & external deps

- Backend: controlled by `VITE_BACKEND_API_URL` — local/mock backends are OK as long as they match expected endpoints (`/continent`, `/country`, etc.).
- External: Rest Countries API (`https://restcountries.com/v3.1`) is called by `src/services/restCountries.ts` for country metadata.
- State & caching: `@tanstack/react-query` (see `src/hooks`) — adopt query keys like `['rest-countries']`, `['countries', continentId]`.

## Quick examples you can follow

- Add a new data hook:
  - create `src/services/foo.ts` with exported async functions that call `api`.
  - add `src/hooks/useFoo.ts` that returns `useQuery({ queryKey: ['foo'], queryFn: listFoo })`.
  - use `useFoo()` in a page/component.

- Change page title in a page component:
  - import and call `const { setPageTitle } = usePageTitle()` inside a component effect.

## Where to look first when editing

- Layout & routes: `src/pages/Layout.tsx`, `src/router.tsx`
- Services & APIs: `src/services/api.ts`, `src/services/*`
- Hooks & queries: `src/hooks/*`
- UI primitives and app wrappers: `src/components/ui/*`, `src/components/app*`
- Global styles and Tailwind: `src/index.css`, `vite.config.ts` (Tailwind plugin)

---

If this looks good I can iterate — e.g. add a short checklist for PR reviewers or examples of common query keys used in the repo. Anything unclear or missing you want me to include? 
