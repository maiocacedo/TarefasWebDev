import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CategoriaBadgeProps {
  categoria: string
  ativa?: boolean
}

export function CategoriaBadge({ categoria, ativa }: CategoriaBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border-foreground/30 font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105',
        ativa && 'border-foreground bg-primary text-primary-foreground',
      )}
    >
      {categoria}
    </Badge>
  )
}
