import type { OSProject } from './data'

interface ArtworkProps {
  project: OSProject
  className?: string
}

export function ProjectArtwork({ project, className = '' }: ArtworkProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {project.slug === 'round-robin' && <RoundRobinArtwork from={project.gradientFrom} to={project.gradientTo} />}
    </div>
  )
}

function RoundRobinArtwork({ from, to }: { from: string; to: string }) {
  const id = 'os-rr-grad'
  const processes = [
    { label: 'P1', cx: 100, cy: 60, r: 22, remaining: '8' },
    { label: 'P2', cx: 165, cy: 38, r: 18, remaining: '3' },
    { label: 'P3', cx: 230, cy: 60, r: 24, remaining: '12' },
    { label: 'P4', cx: 270, cy: 95, r: 16, remaining: '5' },
  ]
  return (
    <svg viewBox="0 0 340 120" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="340" height="120" fill={`url(#${id})`} />

      {/* CPU box */}
      <rect x="12" y="44" width="52" height="32" rx="6"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <text x="38" y="63" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">CPU</text>

      {/* Arrow from CPU to first process */}
      <line x1="64" y1="60" x2="78" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" markerEnd="url(#arr)" />

      {/* Process circles */}
      {processes.map((p) => (
        <g key={p.label}>
          <circle cx={p.cx} cy={p.cy} r={p.r}
            fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
          <text x={p.cx} y={p.cy - 3} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">{p.label}</text>
          <text x={p.cx} y={p.cy + 9} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">{p.remaining}</text>
        </g>
      ))}

      {/* Circular arrows between processes */}
      <path d="M 122 60 Q 143 20 165 38" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
        markerEnd="url(#arr)" />
      <path d="M 183 38 Q 210 22 230 60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
        markerEnd="url(#arr)" />
      <path d="M 248 68 Q 264 82 270 79" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
        markerEnd="url(#arr)" />
      {/* Back-arrow looping to CPU */}
      <path d="M 270 111 Q 200 118 100 82 Q 60 80 38 76" fill="none"
        stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr)" />

      {/* Legend: quantum */}
      <rect x="285" y="10" width="48" height="18" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <text x="309" y="22" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="monospace">Q = 5</text>

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(255,255,255,0.5)" />
        </marker>
      </defs>
    </svg>
  )
}
