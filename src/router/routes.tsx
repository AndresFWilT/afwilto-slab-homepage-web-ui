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
const NetworkComm1Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.NetworkComm1Page }))
)
const NetworkComm3Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.NetworkComm3Page }))
)
const OperationsResearch1Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.OperationsResearch1Page }))
)
const OR1ProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.OR1ProjectRouterPage }))
)
const GraphicalMethodPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects/or1/graphical-method/GraphicalMethodPage').then((m) => ({ default: m.GraphicalMethodPage }))
)
const MixedIntegerPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects/or1/mixed-integer/MixedIntegerPage').then((m) => ({ default: m.MixedIntegerPage }))
)
const PhysicsLabPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.PhysicsLabPage }))
)
const DatabasesIIPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.DatabasesIIPage }))
)
const OperativeSystemsPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.OperativeSystemsPage }))
)
const RoundRobinPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.RoundRobinPage }))
)
const OSProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.OSProjectRouterPage }))
)
const MLFQPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.MLFQPage }))
)
const ArtificialIntelligencePage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ArtificialIntelligencePage }))
)
const AIProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.AIProjectRouterPage }))
)
const AStarPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.AStarPage }))
)
const DFSPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.DFSPage }))
)
const ProgrammingModels2Page = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ProgrammingModels2Page }))
)
const PM2ProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.PM2ProjectRouterPage }))
)
const ProgrammingOOPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.ProgrammingOOPage }))
)
const OOProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.OOProjectRouterPage }))
)
const BasicProgrammingPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.BasicProgrammingPage }))
)
const BPProjectRouterPage = lazy(() =>
  import('@/pages/UniversidadDistrital/subjects').then((m) => ({ default: m.BPProjectRouterPage }))
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
  { path: '/universidad-distrital/basic-programming',                            element: withSuspense(BasicProgrammingPage) },
  { path: '/universidad-distrital/basic-programming/:projectSlug',               element: withSuspense(BPProjectRouterPage) },
  { path: '/universidad-distrital/programming-models-2',                        element: withSuspense(ProgrammingModels2Page) },
  { path: '/universidad-distrital/programming-models-2/:projectSlug',           element: withSuspense(PM2ProjectRouterPage) },
  { path: '/universidad-distrital/object-oriented-programming',                  element: withSuspense(ProgrammingOOPage) },
  { path: '/universidad-distrital/object-oriented-programming/:projectSlug',    element: withSuspense(OOProjectRouterPage) },
  { path: '/universidad-distrital/artificial-intelligence-1',                   element: withSuspense(ArtificialIntelligencePage) },
  { path: '/universidad-distrital/artificial-intelligence-1/a-star',           element: withSuspense(AStarPage) },
  { path: '/universidad-distrital/artificial-intelligence-1/depth-first-search', element: withSuspense(DFSPage) },
  { path: '/universidad-distrital/artificial-intelligence-1/:projectSlug',     element: withSuspense(AIProjectRouterPage) },
  { path: '/universidad-distrital/operative-systems',                          element: withSuspense(OperativeSystemsPage) },
  { path: '/universidad-distrital/operative-systems/mlfq-scheduler',           element: withSuspense(MLFQPage) },
  { path: '/universidad-distrital/operative-systems/round-robin',              element: withSuspense(RoundRobinPage) },
  { path: '/universidad-distrital/operative-systems/:projectSlug',             element: withSuspense(OSProjectRouterPage) },
  { path: '/universidad-distrital/databases-ii',                               element: withSuspense(DatabasesIIPage) },
  { path: '/universidad-distrital/network-communication-1',                    element: withSuspense(NetworkComm1Page) },
  { path: '/universidad-distrital/operations-research-1',                      element: withSuspense(OperationsResearch1Page) },
  { path: '/universidad-distrital/operations-research-1/graphical-method',     element: withSuspense(GraphicalMethodPage) },
  { path: '/universidad-distrital/operations-research-1/mixed-integer',        element: withSuspense(MixedIntegerPage) },
  { path: '/universidad-distrital/operations-research-1/:projectSlug',         element: withSuspense(OR1ProjectRouterPage) },
  { path: '/universidad-distrital/network-communication-2',                    element: withSuspense(NetworkCommunications2Page) },
  { path: '/universidad-distrital/network-communication-3',                    element: withSuspense(NetworkComm3Page) },
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
