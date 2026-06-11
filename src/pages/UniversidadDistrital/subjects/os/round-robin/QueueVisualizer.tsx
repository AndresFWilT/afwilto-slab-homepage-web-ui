import { Text } from '@/design-system'
import type { ProcessDto } from './types'
import { processColor } from './types'

interface Props {
  queue: ProcessDto[]
  currentTime: number
}

export function QueueVisualizer({ queue, currentTime }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Text variant="small" weight="semibold" color="default">Ready Queue</Text>
        <Text variant="caption" color="muted" className="font-mono">t = {currentTime}</Text>
      </div>

      <div className="flex items-center gap-1 min-h-[56px] overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
        {queue.length === 0 ? (
          <Text variant="caption" color="muted" className="italic">Queue is empty</Text>
        ) : (
          <>
            <span className="text-neutral-500 text-xs mr-1 shrink-0">front →</span>
            {queue.map((p, i) => (
              <div
                key={`${p.pid}-${i}`}
                className="flex flex-col items-center justify-center rounded-md shrink-0 transition-all duration-300"
                style={{
                  width: 52,
                  height: 48,
                  backgroundColor: `${processColor(p.pid)}22`,
                  border: `2px solid ${processColor(p.pid)}`,
                }}
              >
                <span className="font-mono font-bold text-sm" style={{ color: processColor(p.pid) }}>
                  P{p.pid}
                </span>
                <span className="font-mono text-xs text-neutral-400">{p.remainingTime}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
