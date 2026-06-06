export type CS2Category = 'Trees' | 'Graphs' | 'Hash'

export interface PlannedEndpoint {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  path: string
  description: string
}

export interface CS2Project {
  slug: string
  title: string
  titleEs: string
  description: string
  detail: string
  category: CS2Category
  timeComplexity: string
  spaceComplexity: string
  concepts: string[]
  gradientFrom: string
  gradientTo: string
  plannedEndpoints: PlannedEndpoint[]
}

export const CS2_PROJECTS: CS2Project[] = [
  {
    slug: 'b-tree',
    title: 'B-Tree',
    titleEs: 'Árbol B',
    description: 'Self-balancing tree where each node holds multiple keys. Foundation for database indexing and file systems.',
    detail: 'A B-tree generalises a binary search tree by allowing nodes to have more than two children. All leaves appear at the same level, and insertion and deletion keep the tree balanced. Widely used in relational databases and file systems because its node size maps naturally to a disk block.',
    category: 'Trees',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    concepts: ['Multi-way search tree', 'Balanced insertion', 'Disk locality', 'Database indexing'],
    gradientFrom: '#1e3a8a',
    gradientTo: '#1d4ed8',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/btree/insert', description: 'Insert a key, returns the updated tree' },
      { method: 'POST', path: '/api/v1/btree/delete', description: 'Delete a key, rebalancing via borrow/merge' },
      { method: 'POST', path: '/api/v1/btree/find',   description: 'Find a key, returns the path from root' },
    ],
  },
  {
    slug: 'trie-dictionary',
    title: 'Trie Dictionary',
    titleEs: 'Árbol N-Ario (Diccionario)',
    description: 'Prefix tree for word storage with translation lookup, autocomplete, and traversal visualization.',
    detail: 'A Trie (prefix tree) stores strings character by character, sharing common prefixes among words. Each node holds a single character; a terminal node marks the end of a word and stores its translation. This makes prefix search and autocomplete O(m) — proportional only to the prefix length. Ported from the legacy Java "Arbol N-ario" bilingual dictionary with proper deletion, prefix search, and three traversal orders.',
    category: 'Trees',
    timeComplexity: 'O(m)',
    spaceComplexity: 'O(n·m)',
    concepts: ['Prefix trees', 'Autocomplete', 'Tree traversals', 'Dictionary data structure'],
    gradientFrom: '#065f46',
    gradientTo: '#047857',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/trie/insert',   description: 'Insert a word + translation, returns updated trie' },
      { method: 'POST', path: '/api/v1/trie/delete',   description: 'Delete a word with proper node pruning' },
      { method: 'POST', path: '/api/v1/trie/search',   description: 'Find all words matching a prefix' },
      { method: 'POST', path: '/api/v1/trie/traverse', description: 'Traverse the trie (PREORDER/INORDER/POSTORDER)' },
    ],
  },
  {
    slug: 'lcrs-transform',
    title: 'N-ary to Binary (LCRS)',
    titleEs: 'Árbol N-Ario a Binario',
    description: 'Left-Child Right-Sibling transformation with weighted edges and shortest root-to-leaf path visualization.',
    detail: 'The LCRS (Left-Child Right-Sibling) encoding is the canonical way to convert any N-ary tree into a binary tree: each node\'s first child becomes its left pointer, and its next sibling becomes its right pointer. This preserves the full N-ary structure without any information loss and uses O(n) space. Previously called "N-ary to Binary" — LCRS is the precise computer-science term used in all modern textbooks.',
    category: 'Trees',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    concepts: ['LCRS encoding', 'N-ary trees', 'Binary trees', 'Weighted shortest path'],
    gradientFrom: '#164e63',
    gradientTo: '#0e7490',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/lcrs/transform',     description: 'Convert N-ary tree to LCRS binary, returns both trees' },
      { method: 'POST', path: '/api/v1/lcrs/shortest-path', description: 'Find shortest root-to-leaf path by edge weight sum' },
      { method: 'POST', path: '/api/v1/lcrs/traverse',      description: 'Traverse binary tree (PREORDER/INORDER/POSTORDER/BFS)' },
    ],
  },
  {
    slug: 'huffman-coding',
    title: 'Huffman Coding',
    titleEs: 'Codigos de Huffman',
    description: 'Optimal prefix-free encoding with tree visualization and compression analysis.',
    detail: 'Huffman coding assigns variable-length prefix-free binary codes to symbols based on their frequency. More frequent symbols get shorter codes. The algorithm builds an optimal binary tree bottom-up using a min-priority queue, achieving the minimum possible average code length. Ported from the legacy Java application with a min-heap instead of the O(n²) linear scan.',
    category: 'Trees',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    concepts: ['Greedy algorithms', 'Priority queues', 'Prefix-free codes', 'Data compression'],
    gradientFrom: '#92400e',
    gradientTo: '#b45309',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/huffman/encode', description: 'Encode text — returns tree, code table, and compression stats' },
    ],
  },
  {
    slug: 'avl-cursor',
    title: 'AVL with Cursors',
    titleEs: 'Cursores AVL',
    description: 'Height-balanced BST that maintains a balance factor of ±1, implemented with a cursor-based memory model.',
    detail: 'An AVL tree guarantees O(log n) operations by tracking the height difference between subtrees. After any insertion or deletion, single or double rotations restore balance. The cursor-based variant simulates pointer-based trees inside a fixed-size array, demonstrating how dynamic structures can be embedded in contiguous memory.',
    category: 'Trees',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    concepts: ['Self-balancing BST', 'Rotations', 'Balance factor', 'Cursor arrays'],
    gradientFrom: '#881337',
    gradientTo: '#be123c',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/avl-cursor/initialize', description: 'Create an empty cursor table with name + capacity' },
      { method: 'POST', path: '/api/v1/avl-cursor/insert',     description: 'Insert a key — returns updated cursor + rotation info' },
      { method: 'POST', path: '/api/v1/avl-cursor/delete',     description: 'Delete a key — returns updated cursor + rotation info' },
    ],
  },
  {
    slug: 'dijkstra-prim',
    title: 'Dijkstra & Prim',
    titleEs: 'Dijkstra y Prim',
    description: 'Interactive graph builder: draw vertices, assign edge weights, then run Dijkstra (shortest paths) or Prim (MST).',
    detail: 'Dijkstra\'s algorithm finds the single-source shortest path in a weighted graph without negative edges, using a priority queue to greedily relax edges. Prim\'s algorithm grows a minimum spanning tree by repeatedly selecting the cheapest edge connecting the MST to a new vertex. Both share structural similarity — both use a priority queue and greedy selection.',
    category: 'Graphs',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    concepts: ['Greedy algorithms', 'Priority queue', 'Shortest paths', 'Minimum spanning tree'],
    gradientFrom: '#134e4a',
    gradientTo: '#0f766e',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/graph/nodes',         description: 'Add a vertex' },
      { method: 'POST', path: '/api/v1/graph/edges',         description: 'Add a weighted edge' },
      { method: 'GET',  path: '/api/v1/graph/dijkstra/{src}',description: 'Shortest paths from source' },
      { method: 'GET',  path: '/api/v1/graph/prim',          description: 'Minimum spanning tree' },
    ],
  },
  {
    slug: 'graphs',
    title: 'Graph Traversals',
    titleEs: 'Grafos — DFS / BFS',
    description: 'Depth-first and breadth-first traversal of undirected and directed graphs with visit-order tracking.',
    detail: 'DFS (Depth-First Search) explores as far as possible before backtracking, naturally finding connected components and detecting cycles. BFS (Breadth-First Search) explores level by level, computing shortest paths in unweighted graphs. Both are building blocks for more advanced algorithms such as topological sort, Dijkstra, and Kosaraju.',
    category: 'Graphs',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    concepts: ['DFS', 'BFS', 'Adjacency representation', 'Connected components'],
    gradientFrom: '#312e81',
    gradientTo: '#4338ca',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/graph/nodes',       description: 'Add a vertex' },
      { method: 'POST', path: '/api/v1/graph/edges',       description: 'Add an edge' },
      { method: 'GET',  path: '/api/v1/graph/dfs/{start}', description: 'DFS traversal order from start' },
      { method: 'GET',  path: '/api/v1/graph/bfs/{start}', description: 'BFS traversal order from start' },
    ],
  },
  {
    slug: 'kruskal',
    title: 'Kruskal',
    titleEs: 'Algoritmo de Kruskal',
    description: 'Minimum spanning tree via edge sorting and Union-Find. Implemented with a priority queue.',
    detail: 'Kruskal\'s algorithm finds the MST by sorting all edges by weight and adding them in order, skipping any that would create a cycle. The cycle check is done in near-O(1) using a Union-Find (disjoint-set) data structure with path compression and union by rank. The priority queue variant processes edges without a full sort, suitable for streaming graphs.',
    category: 'Graphs',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V + E)',
    concepts: ['Union-Find', 'MST', 'Priority queue', 'Greedy edge selection'],
    gradientFrom: '#14532d',
    gradientTo: '#15803d',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/kruskal/edges',  description: 'Submit edge list with weights' },
      { method: 'GET',  path: '/api/v1/kruskal/mst',    description: 'Minimum spanning tree edges' },
      { method: 'GET',  path: '/api/v1/kruskal/steps',  description: 'Step-by-step edge selection' },
    ],
  },
  {
    slug: 'hash-matrix',
    title: 'Dispersion Matrix',
    titleEs: 'Matriz de Dispersión',
    description: 'Two-dimensional hash table mapping keys to positions using row and column hash functions.',
    detail: 'A dispersion (scatter) matrix applies two independent hash functions to a key — one for the row index and one for the column index — placing the key at the intersection. This spreads entries across a 2-D space, reducing collision probability compared to a 1-D table. Collision resolution strategies include open addressing and chaining within each cell.',
    category: 'Hash',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n²)',
    concepts: ['2D hash table', 'Double hashing', 'Collision distribution', 'Scatter storage'],
    gradientFrom: '#831843',
    gradientTo: '#9d174d',
    plannedEndpoints: [
      { method: 'POST',   path: '/api/v1/hashmatrix/entries',       description: 'Insert a key-value pair' },
      { method: 'GET',    path: '/api/v1/hashmatrix/entries/{key}', description: 'Look up a key' },
      { method: 'DELETE', path: '/api/v1/hashmatrix/entries/{key}', description: 'Remove a key' },
      { method: 'GET',    path: '/api/v1/hashmatrix/snapshot',      description: 'Full matrix state' },
    ],
  },
  {
    slug: 'hash-methods',
    title: 'Hash Methods',
    titleEs: 'Métodos de Dispersión',
    description: 'Comparative study of hash functions and collision strategies: division, folding, mid-square, chaining, open addressing.',
    detail: 'This project implements and compares multiple hashing strategies. Hash functions covered: division method (h(k)=k mod m), folding, mid-square. Collision resolution: separate chaining (linked lists per bucket) and open addressing (linear probing, quadratic probing, double hashing). Load factor analysis shows when to resize the table.',
    category: 'Hash',
    timeComplexity: 'O(1) avg, O(n) worst',
    spaceComplexity: 'O(n)',
    concepts: ['Division method', 'Folding', 'Chaining', 'Open addressing', 'Load factor'],
    gradientFrom: '#7c2d12',
    gradientTo: '#c2410c',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/hash/configure',           description: 'Choose hash function and collision strategy' },
      { method: 'POST', path: '/api/v1/hash/entries',             description: 'Insert a key' },
      { method: 'GET',  path: '/api/v1/hash/entries/{key}',       description: 'Search for a key' },
      { method: 'GET',  path: '/api/v1/hash/snapshot',            description: 'Table state with collision chains' },
      { method: 'GET',  path: '/api/v1/hash/stats',               description: 'Load factor and collision count' },
    ],
  },
  {
    slug: 'hash-table-chaining',
    title: 'Hash Table — Separate Chaining',
    titleEs: 'Matriz de Dispersión',
    description: 'Division-method hashing with linked-list collision handling. Insert, delete, and find entries while watching the bucket chains grow.',
    detail: 'The hash function h(k) = k mod m (prime m) maps each key to a bucket. Collisions are resolved by appending to a singly-linked chain at that bucket. The service is stateless — the full table is included in every request and response, keeping the backend a pure calculation engine. Original Java/Swing application ported to Go + React following DDD and Hexagonal Architecture.',
    category: 'Hash',
    timeComplexity: 'O(1) avg, O(n) worst',
    spaceComplexity: 'O(n)',
    concepts: ['Division-method hashing', 'Separate chaining', 'Load factor', 'Prime modulus', 'Linked lists'],
    gradientFrom: '#082f49',
    gradientTo: '#0c4a6e',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/hash-table/insert', description: 'Insert entry → returns updated table + location' },
      { method: 'POST', path: '/api/v1/hash-table/delete', description: 'Delete key → returns updated table + freed location' },
      { method: 'POST', path: '/api/v1/hash-table/find',   description: 'Find key → returns location (table unchanged)' },
    ],
  },
  {
    slug: 'chromatic-graph',
    title: 'Chromatic Number Estimator',
    titleEs: 'Número Cromático',
    description: 'Interactive graph builder + greedy coloring: place vertices, connect edges, then estimate the chromatic number χ(G).',
    detail: 'Greedy graph coloring assigns each vertex the lowest color index not already used by any of its colored neighbors, visiting vertices in BFS order from the selected start. The result is an upper bound on χ(G) — the minimum colors needed so no two adjacent vertices share a color. Implemented as a live interactive tool with 16-color palette ported from the original Java application.',
    category: 'Graphs',
    timeComplexity: 'O(V²)',
    spaceComplexity: 'O(V)',
    concepts: ['Graph coloring', 'Greedy algorithm', 'BFS traversal', 'Adjacency matrix', 'χ(G) upper bound'],
    gradientFrom: '#1e3a8a',
    gradientTo: '#3730a3',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/chromatic/estimate', description: 'Run greedy chromatic estimate on submitted graph' },
    ],
  },
  {
    slug: 'topological-order',
    title: 'Topological Sort',
    titleEs: 'Orden Topológico',
    description: 'Linear ordering of vertices in a DAG such that for every directed edge u → v, u appears before v.',
    detail: 'Topological sort is only defined for Directed Acyclic Graphs (DAGs). Kahn\'s algorithm uses in-degree tracking and a queue to produce a valid ordering iteratively, also detecting cycles (no ordering exists if a cycle is present). The DFS-based variant uses finish-time ordering. Applications include build systems, course prerequisites, and task scheduling.',
    category: 'Graphs',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    concepts: ['DAG', 'In-degree', "Kahn's algorithm", 'Cycle detection'],
    gradientFrom: '#5b21b6',
    gradientTo: '#7c3aed',
    plannedEndpoints: [
      { method: 'POST', path: '/api/v1/topo/graph',   description: 'Submit DAG as adjacency list' },
      { method: 'GET',  path: '/api/v1/topo/order',   description: 'Topological ordering of vertices' },
      { method: 'GET',  path: '/api/v1/topo/cycles',  description: 'Detected cycles (empty if valid DAG)' },
    ],
  },
]

export const CS2_CATEGORY_COLOR: Record<CS2Category, string> = {
  Trees:  '#7c3aed',
  Graphs: '#0f766e',
  Hash:   '#c2410c',
}
