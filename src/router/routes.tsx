import type { RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spinner, ErrorBoundary } from '@/design-system'
import { SubjectPage } from '@/pages/Subject'

const HomePage = lazy(() => import('@/pages/Home').then((m) => ({ default: m.HomePage })))
const DesignSystemPage = lazy(() =>
  import('@/pages/DesignSystem').then((m) => ({ default: m.DesignSystemPage }))
)
const UniversidadDistritalPage = lazy(() =>
  import('@/pages/UniversidadDistrital').then((m) => ({ default: m.UniversidadDistritalPage }))
)
const UniandesPage = lazy(() =>
  import('@/pages/Uniandes').then((m) => ({ default: m.UniandesPage }))
)
const ComputerScience1Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ComputerScience1Page }))
)
const ComputerScience2Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ComputerScience2Page }))
)
const CS2ProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.CS2ProjectRouterPage }))
)
const ChromaticGraphPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ChromaticGraphPage }))
)
const HashTableChainingPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.HashTableChainingPage }))
)
const BTreePage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.BTreePage }))
)
const TrieDictionaryPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.TrieDictionaryPage }))
)
const LCRSTransformPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.LCRSTransformPage }))
)
const HuffmanCodingPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.HuffmanCodingPage }))
)
const AVLCursorPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.AVLCursorPage }))
)
const NetworkCommunications2Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.NetworkCommunications2Page }))
)
const PhysicsLabPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.PhysicsLabPage }))
)
const DatabasesIIPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.DatabasesIIPage }))
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage }))
)

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-base">
      <Spinner size="lg" />
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}

export const routes: RouteObject[] = [
  { path: '/',     element: withSuspense(HomePage) },
  { path: '/home', element: withSuspense(HomePage) },

  { path: '/design-system', element: withSuspense(DesignSystemPage) },

  { path: '/universidad-distrital',                       element: withSuspense(UniversidadDistritalPage) },
  { path: '/universidad-distrital/databases-ii',                               element: withSuspense(DatabasesIIPage) },
  { path: '/universidad-distrital/network-communication-2',                    element: withSuspense(NetworkCommunications2Page) },
  { path: '/universidad-distrital/physics-lab',                               element: withSuspense(PhysicsLabPage) },
  { path: '/universidad-distrital/computer-science-1',                       element: withSuspense(ComputerScience1Page) },
  { path: '/universidad-distrital/computer-science-2',                       element: withSuspense(ComputerScience2Page) },
  { path: '/universidad-distrital/computer-science-2/b-tree',                 element: withSuspense(BTreePage) },
  { path: '/universidad-distrital/computer-science-2/trie-dictionary',        element: withSuspense(TrieDictionaryPage) },
  { path: '/universidad-distrital/computer-science-2/lcrs-transform',         element: withSuspense(LCRSTransformPage) },
  { path: '/universidad-distrital/computer-science-2/huffman-coding',         element: withSuspense(HuffmanCodingPage) },
  { path: '/universidad-distrital/computer-science-2/avl-cursor',             element: withSuspense(AVLCursorPage) },
  { path: '/universidad-distrital/computer-science-2/chromatic-graph',        element: withSuspense(ChromaticGraphPage) },
  { path: '/universidad-distrital/computer-science-2/hash-table-chaining',   element: withSuspense(HashTableChainingPage) },
  { path: '/universidad-distrital/computer-science-2/:projectSlug',          element: withSuspense(CS2ProjectRouterPage) },
  { path: '/universidad-distrital/:subjectSlug',                             element: <SubjectPage university="distrital" /> },

  { path: '/uniandes',            element: withSuspense(UniandesPage) },
  { path: '/uniandes/:subjectSlug', element: <SubjectPage university="uniandes" /> },

  { path: '*', element: withSuspense(NotFoundPage) },
]
