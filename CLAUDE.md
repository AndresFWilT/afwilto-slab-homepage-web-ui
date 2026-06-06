# CLAUDE.md — Frontend Architecture Manifesto

> **This file is the operating manual for any agent working in this frontend.**
> Read it entirely before writing, modifying, or reviewing any code.
> Every rule here is binding unless the user explicitly overrides it in chat.

---

## 0. How to Use This Document

Before producing any code, an agent must:

1. Identify which layer the task touches (design system / page / hex / routing).
2. Apply the universal rules (§1–§4) regardless of scope.
3. Check the relevant extension recipe (§6–§9).
4. Run the PR checklist (§10) mentally before emitting the final answer.

When in doubt, **prefer deleting code over adding it**, and **ask before guessing**.

---

## 1. Tech Stack (Non-Negotiable)

| Concern        | Choice                                  |
|----------------|-----------------------------------------|
| UI library     | React 19 + TypeScript (strict)          |
| Build tool     | Vite 8 (`@vitejs/plugin-react`)         |
| Styles         | Tailwind CSS v4 via `@tailwindcss/vite` |
| Routing        | React Router v6 (`createBrowserRouter`) |
| HTTP           | `fetch` (no Axios, no external HTTP lib)|
| DI             | React Context (hand-rolled, no library) |
| Icons          | Inline SVG or emoji — no icon library   |
| No test runner is configured yet — do not add one without explicit instruction. |

Path alias `@/` resolves to `src/`. Always use it for imports crossing directory boundaries.

---

## 2. Core Principles

These govern every decision, in priority order:

1. **Domain language first.** Names come from the business / academic domain, never from technology. A port is `IRBTService`, not `HttpTreeService`.
2. **Hexagonal boundary.** Pages never call `fetch` directly. All I/O goes through a port, consumed via `useServices()`.
3. **Atomic Design boundary.** Never skip a layer. An organism does not live inside an atom.
4. **Dark theme always.** Every component must be legible on `#181D35`. Never assume a white or light background unless it is an intentional canvas like the RBT visualiser.
5. **YAGNI.** Build only what the current story needs. Three similar cases is a pattern; two is a coincidence.
6. **SOLID + DRY.** Single responsibility per component. One barrel `index.ts` per directory. No duplicated logic.

---

## 3. Design System

### 3.1 Atomic Design Layers

The design system lives in `src/design-system/` and is structured strictly:

```
design-system/
  tokens/          ← pure data, no JSX
  atoms/           ← Button, Text, Input, Badge, Spinner
  molecules/       ← FormField, Card, Alert
  organisms/       ← Navbar, Footer
  templates/       ← BaseLayout, AuthLayout
```

**Rules:**
- An atom has no dependency on molecules, organisms, or templates.
- A molecule composes atoms only.
- An organism composes atoms and molecules.
- A template composes organisms and atoms/molecules.
- All components are exported through their directory's `index.ts` and then re-exported from `design-system/index.ts`.
- **Never import a design-system component directly by file path.** Always use `@/design-system`.

### 3.2 Component File Convention

Every component in the design system follows this structure:

```
ComponentName/
  ComponentName.tsx        ← implementation
  ComponentName.types.ts   ← all exported types/interfaces
  index.ts                 ← re-exports ComponentName + types
```

### 3.3 Existing Atoms

| Component  | Variants / Sizes           | Key prop  |
|------------|----------------------------|-----------|
| `Button`   | primary, secondary, ghost, danger × sm, md, lg | `loading`, `fullWidth` |
| `Text`     | h1–h4, body, small, caption, mono | `color`, `weight`, `as` |
| `Input`    | sm, md, lg                 | `inputSize`, `error`, `leftIcon`, `rightIcon` |
| `Badge`    | primary, success, warning, error, neutral × sm, md | — |
| `Spinner`  | sm, md, lg                 | — |

### 3.4 Existing Molecules

| Component   | Key props                                      |
|-------------|------------------------------------------------|
| `Card`      | `padding` (none, sm, md, lg), `shadow`, `border` |
| `Alert`     | `variant` (info, success, warning, error), `title`, `onClose` |
| `FormField` | Wraps `Input` with label, helper text, error message |

### 3.5 Adding a New Design System Component

1. Decide the correct layer (atom / molecule / organism / template).
2. Create the directory + three files (`.tsx`, `.types.ts`, `index.ts`).
3. Export from the layer's `index.ts` barrel.
4. Export from `design-system/index.ts`.
5. Add a showcase section to `/design-system` page (`DesignSystemPage.tsx`).
6. **Never add a component to a layer that imports from a higher layer.**

---

## 4. Dark Theme & Design Tokens

### 4.1 Colour Architecture

All tokens are CSS custom properties defined in `src/index.css` under `@theme {}`. They become Tailwind utility classes automatically.

```
brand-50  … brand-900   ← full brand palette (hue 230°, base #181D35)
primary-300 … primary-700 ← vivid blue accent for interactive elements
surface-base / raised / overlay / border ← surface hierarchy
neutral-100 … neutral-900 ← slate scale for text and borders
success/warning/error/info -300/-400/-500 ← semantic colours
```

### 4.2 Surface Hierarchy

| Token             | Hex       | Use                                 |
|-------------------|-----------|-------------------------------------|
| `surface-base`    | `#181D35` | Page background (html/body default) |
| `surface-raised`  | `#1E254A` | Cards, panels, nav                  |
| `surface-overlay` | `#242C56` | Modals, dropdowns                   |
| `surface-border`  | `#2D3760` | All borders and dividers            |

### 4.3 Text Colours on Dark Background

| Use case        | Class / value       |
|-----------------|---------------------|
| Primary text    | `text-neutral-100`  |
| Muted / caption | `text-neutral-400`  |
| Accent / links  | `text-primary-400`  |
| Error           | `text-red-400`      |
| Success         | `text-green-400`    |

### 4.4 Tailwind v4 Override Gotcha — CRITICAL

In Tailwind v4, the **CSS declaration order** in the generated stylesheet determines which utility wins when classes conflict — not the HTML class attribute order. Because `Card` sets `bg-surface-raised` internally, adding `bg-brand-50` to the `className` prop will silently lose.

**Rule:** When you need to override a component's background (or any property its base class sets), use an inline `style` prop with the CSS custom property:

```tsx
// ✗ Wrong — bg-brand-50 may be ignored
<Card className="bg-brand-50" />

// ✓ Correct — inline style always wins
<Card style={{ backgroundColor: 'var(--color-brand-50)' }} />
```

### 4.5 Light Canvas Exception

Interactive visualisers (e.g., the RBT tree canvas) intentionally use `brand-50` as the panel background so that **black nodes read as black** against a light surface. This is the only accepted context for a light background inside the dark theme. Always pair it with:
- Edge strokes using `rgba(24,29,53,0.25)` (brand-900 at 25% opacity).
- Node borders using `rgba(0,0,0,0.18)`.
- Empty-state text using `text-brand-500` for readability.

### 4.6 University Brand Colours

University accent colours (e.g., UD `#003DA5`, Uniandes `#C41E3A`) are used:
- As color band / header accents.
- For badge backgrounds via `${accentColor}22` with `${accentColor}44` border.
- Never as `bg-` Tailwind class — always via `style={{ backgroundColor: ... }}`.

---

## 5. Hexagonal Architecture (Frontend)

The frontend mirrors the backend's Ports & Adapters pattern. **Pages never call `fetch` directly.**

```
src/
  application/ports/         ← interfaces owned by the application layer
    IHttpClient.ts           ← generic HTTP contract
    IRBTService.ts           ← Red-Black Tree domain contract
    (IXxxService.ts)         ← one file per bounded context
  infrastructure/adapters/   ← concrete implementations
    http/
      FetchHttpClient.ts     ← implements IHttpClient
    rbt/
      RBTHttpAdapter.ts      ← implements IRBTService
    (xxx/)                   ← one directory per adapter
  di/
    container.ts             ← composition root — the only place that knows concrete types
    ServiceProvider.tsx      ← React Context + useServices() hook
```

### 5.1 Port Rules

- A port is a TypeScript `interface` with no imports from `infrastructure/`.
- It lives in `src/application/ports/IXxxService.ts`.
- It uses domain types only (plain TypeScript, no framework references).
- It exports the interface AND all types the page will need (response shapes, union types).

### 5.2 Adapter Rules

- An adapter is a class that `implements` the port interface.
- Constructor receives `IHttpClient` as the sole dependency (injected, never `new`d).
- The class property form is required — TypeScript parameter properties are **forbidden** because the project uses `erasableSyntaxOnly: true`:

```typescript
// ✗ Forbidden — erasableSyntaxOnly rejects this
class MyAdapter {
  constructor(private readonly http: IHttpClient) {}
}

// ✓ Correct
class MyAdapter {
  private readonly http: IHttpClient
  constructor(http: IHttpClient) { this.http = http }
}
```

- Error translation happens inside the adapter. The page receives a `new Error('Human-readable message')`. HTTP status codes never leak past the adapter.
- All API responses follow the Go envelope `{ data: T }`. The adapter unwraps `.data` before returning.

### 5.3 DI Container

`src/di/container.ts` is the **composition root** — the only file that instantiates concrete adapter classes. To add a new service:

```typescript
// 1. Add to ServiceContainer interface
export interface ServiceContainer {
  httpClient: IHttpClient
  rbtService: IRBTService
  myNewService: IMyNewService   // ← add here
}

// 2. Instantiate and add to the exported container object
const myHttp = new FetchHttpClient(import.meta.env.VITE_MY_SVC_URL ?? 'http://localhost:8082')
export const container: ServiceContainer = {
  httpClient: mainHttp,
  rbtService: new RBTHttpAdapter(csMngrHttp),
  myNewService: new MyNewAdapter(myHttp),  // ← add here
}
```

### 5.4 Consuming a Service in a Component

```typescript
// In any component under ServiceProvider:
const { rbtService } = useServices()
```

Never import the concrete adapter or the container object in a component. Only `useServices()`.

---

## 6. Page Architecture

### 6.1 Directory Structure

```
src/pages/
  Home/                      ← entry page
  DesignSystem/              ← component showcase at /design-system
  NotFound/                  ← 404
  Subject/                   ← generic subject placeholder (SubjectPage.tsx)
  UniversidadDistrital/      ← UD university overview + subjects
    data.ts                  ← UD_INFO, UD_SUBJECTS, category styles
    subjects/
      ComputerScience1Page.tsx   ← wraps SubjectPage + injects visualiser
      ComputerScience2Page.tsx   ← wraps SubjectPage + injects project grid
      cs2/
        data.ts              ← CS2_PROJECTS array
        ProjectArtwork.tsx   ← SVG thumbnail components
        CS2ProjectPage.tsx   ← generic CS2 project template
        CS2ProjectRouterPage.tsx ← useParams → CS2ProjectPage
  Uniandes/                  ← Uniandes university overview + subjects
```

### 6.2 The SubjectPage Pattern

`SubjectPage` is a reusable template that provides:
- Breadcrumb navigation
- Subject header (title, category badge, university badge, description)
- University context strip (logo, name, career)

When a subject has real content (a visualiser, project grid, etc.), wrap `SubjectPage` and pass the content as `children`:

```tsx
export function ComputerScience1Page() {
  return (
    <SubjectPage university="distrital" slug="computer-science-1">
      <RBTVisualizer />
    </SubjectPage>
  )
}
```

**The `slug` prop is required when the route is static** (not parameterised). Without it, `useParams()` returns `undefined` and the page shows "Subject not found".

```tsx
// ✗ Wrong for static route /universidad-distrital/computer-science-1
<SubjectPage university="distrital">...</SubjectPage>

// ✓ Correct
<SubjectPage university="distrital" slug="computer-science-1">...</SubjectPage>
```

When no `children` are passed, `SubjectPage` renders the standard "Content in Progress" placeholder.

### 6.3 Routing Rules

All routes live in `src/router/routes.tsx`. Rules:

- **All pages are lazy-loaded** via `React.lazy`. No eager imports in routes.tsx.
- The `withSuspense(Component)` wrapper is the standard pattern.
- **Static routes must appear before parameterised routes** at the same path level. React Router v6 respects specificity, but ordering makes intent explicit:

```typescript
// ✓ Specific static routes first
{ path: '/universidad-distrital/computer-science-1', element: withSuspense(CS1Page) },
{ path: '/universidad-distrital/computer-science-2', element: withSuspense(CS2Page) },
// Generic parameterised route last
{ path: '/universidad-distrital/:subjectSlug',        element: <SubjectPage university="distrital" /> },
```

- Project-level routes (three segments) are independent of subject-level routes (two segments):

```typescript
// Subject level
{ path: '/universidad-distrital/computer-science-2',              element: ... },
// Project level — three segments, no conflict
{ path: '/universidad-distrital/computer-science-2/:projectSlug', element: ... },
```

- The `Fallback` spinner uses `bg-surface-base` so it matches the dark page background.

---

## 7. Extension Recipes

### 7.1 Adding a New Backend Service (e.g., AVL Tree for CS2)

```
1. Create src/application/ports/IAVLService.ts
   - Define the interface + all response/request types
   - Name operations in business language (insert, delete, balance, etc.)

2. Create src/infrastructure/adapters/avl/AVLHttpAdapter.ts
   - Implement IAVLService
   - Use IHttpClient; translate HTTP errors to human messages
   - Use explicit property form (no TS parameter properties)

3. Add src/infrastructure/adapters/avl/index.ts
   - export { AVLHttpAdapter } from './AVLHttpAdapter'

4. Add to src/infrastructure/adapters/index.ts
   - export * from './avl'

5. Update src/di/container.ts
   - Add IAVLService to ServiceContainer interface
   - Instantiate AVLHttpAdapter with its FetchHttpClient
   - Add VITE_AVL_MNGR_URL env var default

6. The component uses: const { avlService } = useServices()
```

### 7.2 Adding a New Subject Page with a Visualiser

```
1. Create src/pages/UniversidadDistrital/subjects/ComputerScienceXPage.tsx
   - Entry point wraps SubjectPage with slug="computer-science-x"
   - Inject the visualiser as children

2. Add the service port + adapter if a backend exists (see §7.1)

3. Export from src/pages/UniversidadDistrital/subjects/index.ts

4. Add to src/router/routes.tsx — static route BEFORE the :subjectSlug wildcard:
   { path: '/universidad-distrital/computer-science-x', element: withSuspense(CSXPage) }
```

### 7.3 Adding a CS2-Style Project Page

```
1. Add the project object to src/pages/UniversidadDistrital/subjects/cs2/data.ts
   - slug, title, titleEs, description, detail, category
   - timeComplexity, spaceComplexity, concepts
   - gradientFrom, gradientTo (hex colours for the SVG thumbnail)
   - plannedEndpoints array (method, path, description)

2. Add the SVG thumbnail to cs2/ProjectArtwork.tsx
   - Create a new function component (SvgProps) → SVG
   - Add it to the ARTWORK registry keyed by slug
   - SVG viewBox = "0 0 200 120", preserveAspectRatio="xMidYMid slice"
   - Use gradients for background, geometric shapes for the data structure

3. No route change needed — CS2ProjectRouterPage handles all slugs automatically.

4. When the backend is built:
   a. Add port + adapter (§7.1)
   b. Create a dedicated page (e.g., BTreePage.tsx) that wraps CS2ProjectPage
      with real content instead of the "coming soon" card
   c. Add a specific static route BEFORE the :projectSlug wildcard
```

### 7.4 Adding a New University

```
1. Create src/pages/NewUniversity/data.ts
   - Export INFO object (name, acronym, career, accentColor, goldColor, logoUrl, etc.)
   - Export SUBJECTS array with slugs, titles, categories, descriptions
   - Export CATEGORY_STYLE map

2. Create src/pages/NewUniversity/NewUniversityPage.tsx
   - Follow the same pattern as UniversidadDistritalPage / UniandesPage
   - Category filter pills, responsive subject card grid, SubjectCard component

3. Create src/pages/NewUniversity/index.ts (exports)

4. Add the university to:
   - src/pages/Home/HomePage.tsx — add a UniversityCard with logoUrl + to="/new-university"
   - src/pages/Subject/SubjectPage.tsx — add the university to the University union type
     and handle its subjects/info/backPath

5. Add routes to src/router/routes.tsx:
   { path: '/new-university',          element: withSuspense(NewUniversityPage) }
   { path: '/new-university/:slug',    element: <SubjectPage university="new-university" /> }

6. Update BaseLayout default nav links if the university should appear in the navbar
```

### 7.5 Adding SVG Artwork for a Project Card

All SVG thumbnails follow this contract:

```tsx
function MyThumbnail({ from, to }: { from: string; to: string }) {
  const id = 'unique-gradient-id'
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill={`url(#${id})`} />
      {/* data structure geometry here */}
      {/* nodes: circles or rects, fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" */}
      {/* edges: lines, stroke="rgba(255,255,255,0.25)" */}
      {/* labels: text, fill="white" fontSize="9-11" fontFamily="monospace" */}
    </svg>
  )
}
```

**Gradient IDs must be unique across all artwork in the same page** — collision causes cross-contamination.

---

## 8. TypeScript Rules

### 8.1 `erasableSyntaxOnly` is Enabled

The Vite template enables `"erasableSyntaxOnly": true` in `tsconfig.app.json`. This means:
- **TypeScript parameter properties (`constructor(private x: T)`) are forbidden.**
- Use explicit property + assignment instead:

```typescript
// ✗ Forbidden
class Foo { constructor(private bar: Bar) {} }

// ✓ Required
class Foo {
  private readonly bar: Bar
  constructor(bar: Bar) { this.bar = bar }
}
```

- Decorators and other TypeScript-only syntax that is erased at runtime are similarly affected.

### 8.2 General TypeScript Rules

- Prefer `interface` over `type` for object shapes (especially props and service contracts).
- Use `type` for unions, tuples, and aliases.
- No `any` except in casting bridge code (`(categoryStyle as any)[key]`); add a comment explaining why.
- All component props are typed via a named interface in the `.types.ts` file (design system) or inline (page-local components).
- Export only what consumers need. Internal helpers are unexported.

---

## 9. Styling Rules

### 9.1 Using Tailwind

- Use Tailwind utility classes for everything except dynamic values that depend on runtime data (e.g., university brand colours). Those go in `style={{}}`.
- Never write custom CSS in a component — extend `src/index.css` `@theme {}` block for new tokens.
- Use `clsx` (already installed) for conditional class composition. Never string-concatenate class names.

### 9.2 Responsive Breakpoints

```
sm  ≥ 640px   phone landscape / small tablet
md  ≥ 768px   tablet
lg  ≥ 1024px  desktop
xl  ≥ 1280px  wide desktop
```

All grids use this pattern:
```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

Flex rows that need mobile stacking use `flex-col sm:flex-row`.

### 9.3 Spacing

- Inter-element gaps: `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px).
- Page sections: `gap-8` or `gap-10` between major sections, `gap-16` between hero and content.
- Card padding: use the `padding` prop (sm=12px, md=24px, lg=32px) — never manually add padding inside a Card.

### 9.4 SVG Canvas Rules

Two invariants apply to every interactive SVG canvas in the project (graph builders, tree visualisers, etc.).

#### Scrollable canvas pattern

An interactive SVG canvas must never clip or truncate its content on narrow viewports. The correct pattern is:

```tsx
{/* Card clips the rounded corners; inner wrapper handles overflow */}
<Card
  padding="none"
  className="relative overflow-hidden w-full"
  style={{ height: '360px', backgroundColor: 'var(--color-brand-50)' }}
>
  {/* Scroll wrapper — horizontal scrollbar appears when viewport < minWidth */}
  <div className="overflow-auto w-full h-full" style={{ scrollbarWidth: 'thin' }}>
    <div style={{ minWidth: '800px', height: '100%' }}>
      <MySvgCanvas />
    </div>
  </div>
</Card>
```

Rules:
- `overflow-hidden` stays on the `Card` to preserve rounded corners.
- `overflow-auto` goes on the **inner wrapper div**, not the Card.
- Set `minWidth` on a sizing div inside the scroll wrapper to match the SVG's logical coordinate space.
- A loading overlay (absolute-positioned inside the Card) covers the visible card area regardless of scroll position — place it as a direct child of the Card, before the scroll wrapper.

#### SVG text centering

**Never use hardcoded pixel coordinates for centered text inside an SVG.** Hardcoded values break when the `viewBox` dimensions change.

```tsx
// ✗ Breaks if viewBox changes — coordinates become off-center
<text x={250} y={150} textAnchor="middle">Placeholder</text>

// ✓ Always centred — works with any viewBox
<text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
>
  Placeholder
</text>
```

Use `x="50%" y="50%"` with **both** `textAnchor="middle"` (horizontal) and `dominantBaseline="middle"` (vertical) for any text that must appear at the geometric centre of the SVG coordinate space.

### 9.6 Animation

- Hover lift: `group-hover:-translate-y-1 transition-all duration-200` on cards.
- Colour transitions: `transition-colors duration-150 ease-in-out` on interactive elements.
- No motion without semantic purpose. No keyframe animations added without need.

---

## 10. Code Style Rules

- **No comments by default.** Add a comment only when the WHY is non-obvious (hidden constraint, invariant, workaround).
- **No docstrings.** Well-named identifiers communicate what; comments communicate why.
- **No trailing summaries.** Do not write "// this handles the case where..." — that belongs in the PR description.
- Section separators (`// ── Section ─────`) are acceptable in large page files to make orientation fast, but must be concise.
- Internal helper functions in a page file are lowercase, unexported, and defined after the exported component they serve.

---

## 11. Anti-Patterns — Forbidden

| Anti-pattern | Why |
|---|---|
| `fetch()` in a component | Violates hexagonal boundary — use a port via `useServices()` |
| Importing a concrete adapter class in a component | Couples UI to infrastructure |
| Importing a design-system component by direct file path | Breaks the barrel export contract |
| Skipping a layer in Atomic Design | Breaks component contracts and testability |
| `bg-brand-X` Tailwind class on a component that has its own background | Silently loses to CSS declaration order — use inline `style` |
| `constructor(private x: T)` | Forbidden by `erasableSyntaxOnly` |
| Route added without checking for conflicts with existing wildcards | Causes silent fallthrough to the wrong page |
| `slug` prop omitted on SubjectPage for a static route | `useParams()` returns `undefined`, shows "Subject not found" |
| University brand colour as a Tailwind class | Dynamic colours must be `style={{}}` |
| Hard-coding `localhost:8080` anywhere other than `container.ts` | Backend URLs are configuration, not code |
| Adding an external library without explicit instruction | YAGNI — the stack is intentionally minimal |

---

## 12. PR Checklist

Before emitting final code, verify:

- [ ] Every import from `src/design-system` goes through the barrel (`@/design-system`), not a direct file path.
- [ ] No `fetch()`, `axios`, or `XMLHttpRequest` in a component — all I/O through `useServices()`.
- [ ] New service: port interface → adapter class → container registration → env var default.
- [ ] New route: static routes appear before parameterised wildcards at the same depth.
- [ ] `slug` prop passed to `SubjectPage` when the parent route is not parameterised.
- [ ] Background overrides use `style={{ backgroundColor: 'var(--color-xxx)' }}`, not a Tailwind class.
- [ ] No TypeScript parameter properties (`constructor(private x: T)`).
- [ ] All dynamic colours (university brand, category colours) use `style={{}}` with hex or CSS variable.
- [ ] Responsive: tested at `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3` — no layout breaks.
- [ ] New design system component: added to `DesignSystemPage.tsx` showcase.
- [ ] Build passes: `npm run build` exits 0 with 0 TypeScript errors.

---

## 13. Key File Map

| File | Role |
|---|---|
| `src/index.css` | Single source of truth for all design tokens (`@theme {}`) |
| `src/design-system/index.ts` | Public API of the design system |
| `src/di/container.ts` | Composition root — only file that knows concrete adapter types |
| `src/di/ServiceProvider.tsx` | `ServiceProvider` wrapper + `useServices()` hook |
| `src/router/routes.tsx` | All route definitions, lazy imports, `withSuspense` |
| `src/pages/Subject/SubjectPage.tsx` | Generic subject template with optional `children` slot |
| `src/pages/UniversidadDistrital/data.ts` | UD_INFO, UD_SUBJECTS, category style map |
| `src/pages/Uniandes/data.ts` | UNIANDES_INFO, UNIANDES_SUBJECTS |
| `src/pages/UniversidadDistrital/subjects/cs2/data.ts` | CS2 project definitions + planned API contracts |
| `src/pages/UniversidadDistrital/subjects/cs2/ProjectArtwork.tsx` | SVG thumbnail registry |
| `src/application/ports/IRBTService.ts` | Port contract for the Red-Black Tree microservice |
| `src/infrastructure/adapters/rbt/RBTHttpAdapter.ts` | HTTP adapter implementing IRBTService |
