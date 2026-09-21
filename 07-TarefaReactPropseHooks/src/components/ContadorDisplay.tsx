import { cn } from '@/lib/utils'
import { formatarValor } from '@/lib/contador'

interface ContadorDisplayProps {
  valor: number
  min: number
  max: number
  destaque: boolean
}

export function ContadorDisplay({ valor, min, max, destaque }: ContadorDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        aria-live="polite"
        className={cn(
          'neon-text font-display text-7xl font-bold tabular-nums sm:text-8xl',
          destaque && 'pulse-neon',
        )}
      >
        {formatarValor(valor)}
      </span>
      <span
        aria-live="polite"
        className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground"
      >
        {formatarValor(min)} .. {formatarValor(max)}
      </span>
    </div>
  )
}
