export type OSCategory = 'CPU Scheduling'

export interface OSProject {
  slug: string
  title: string
  description: string
  detail: string
  category: OSCategory
  concept: string
  gradientFrom: string
  gradientTo: string
}

export const OS_PROJECTS: OSProject[] = [
  {
    slug: 'round-robin',
    title: 'Round-Robin Scheduler',
    description:
      'CPU scheduling with configurable time quantum. Each process gets an equal slice; if it does not finish, it goes to the back of the ready queue.',
    detail:
      'Implements textbook Round-Robin scheduling: processes (with configurable burst times) share the CPU in time quanta. If a process exhausts its quantum without completing, it is re-queued with its remaining burst time. The simulator produces a full execution log, a Gantt chart of which process ran in each slot, and per-process metrics (completion time, turnaround time, waiting time). Run a full simulation or step through one quantum at a time to watch the queue evolve.',
    category: 'CPU Scheduling',
    concept: 'Round-Robin / Time Quantum',
    gradientFrom: '#3730a3',
    gradientTo: '#6d28d9',
  },
]

export const OS_CATEGORY_COLOR: Record<OSCategory, string> = {
  'CPU Scheduling': '#8b5cf6',
}
