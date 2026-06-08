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
const ComputerScience3Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ComputerScience3Page }))
)
const CS2ProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.CS2ProjectRouterPage }))
)
const CS3ProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.CS3ProjectRouterPage }))
)
const CriticalPathPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.CriticalPathPage }))
)
const TruthTablePage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.TruthTablePage }))
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
const GraphAlgorithmsPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.GraphAlgorithmsPage }))
)
const GraphTraversalsPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.GraphTraversalsPage }))
)
const KruskalPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.KruskalPage }))
)
const HashDispersionPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.HashDispersionPage }))
)
const HashFunctionsPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.HashFunctionsPage }))
)
const TopologicalSortPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.TopologicalSortPage }))
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
  { path: '/universidad-distrital/computer-science-3',                       element: withSuspense(ComputerScience3Page) },
  { path: '/universidad-distrital/computer-science-3/critical-path',          element: withSuspense(CriticalPathPage) },
  { path: '/universidad-distrital/computer-science-3/truth-table',             element: withSuspense(TruthTablePage) },
  { path: '/universidad-distrital/computer-science-3/:projectSlug',            element: withSuspense(CS3ProjectRouterPage) },
  { path: '/universidad-distrital/computer-science-2/b-tree',                 element: withSuspense(BTreePage) },
  { path: '/universidad-distrital/computer-science-2/trie-dictionary',        element: withSuspense(TrieDictionaryPage) },
  { path: '/universidad-distrital/computer-science-2/lcrs-transform',         element: withSuspense(LCRSTransformPage) },
  { path: '/universidad-distrital/computer-science-2/huffman-coding',         element: withSuspense(HuffmanCodingPage) },
  { path: '/universidad-distrital/computer-science-2/avl-cursor',             element: withSuspense(AVLCursorPage) },
  { path: '/universidad-distrital/computer-science-2/chromatic-graph',        element: withSuspense(ChromaticGraphPage) },
  { path: '/universidad-distrital/computer-science-2/graph-algorithms',       element: withSuspense(GraphAlgorithmsPage) },
  { path: '/universidad-distrital/computer-science-2/graph-traversals',       element: withSuspense(GraphTraversalsPage) },
  { path: '/universidad-distrital/computer-science-2/kruskal',                element: withSuspense(KruskalPage) },
  { path: '/universidad-distrital/computer-science-2/hash-dispersion',        element: withSuspense(HashDispersionPage) },
  { path: '/universidad-distrital/computer-science-2/hash-functions',         element: withSuspense(HashFunctionsPage) },
  { path: '/universidad-distrital/computer-science-2/topological-sort',       element: withSuspense(TopologicalSortPage) },
  { path: '/universidad-distrital/computer-science-2/hash-table-chaining',   element: withSuspense(HashTableChainingPage) },
  { path: '/universidad-distrital/computer-science-2/:projectSlug',          element: withSuspense(CS2ProjectRouterPage) },
  { path: '/universidad-distrital/:subjectSlug',                             element: <SubjectPage university="distrital" /> },

  { path: '/uniandes',            element: withSuspense(UniandesPage) },
  { path: '/uniandes/:subjectSlug', element: <SubjectPage university="uniandes" /> },

  { path: '*', element: withSuspense(NotFoundPage) },
]
