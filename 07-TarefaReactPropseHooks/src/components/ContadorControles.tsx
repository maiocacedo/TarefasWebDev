    import { Minus, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContadorControlesProps {
  onIncrementar: () => void
  onDecrementar: () => void
  onResetar: () => void
  podeIncrementar: boolean
  podeDecrementar: boolean
  podeResetar: boolean
}

export function ContadorControles({
  onIncrementar,
  onDecrementar,
  onResetar,
  podeIncrementar,
  podeDecrementar,
  podeResetar,
}: ContadorControlesProps) {
  const estilo = 'border-primary/40 text-primary hover:bg-primary/10 hover:text-primary'
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={onDecrementar}
        disabled={!podeDecrementar}
        aria-label="Decrementar"
        className={estilo}
      >
        <Minus />
      </Button>
      <Button
        variant="outline"
        onClick={onResetar}
        disabled={!podeResetar}
        aria-label="Resetar contador"
        className={estilo}
      >
        <RotateCcw />
        Reset
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onIncrementar}
        disabled={!podeIncrementar}
        aria-label="Incrementar"
        className={estilo}
      >
        <Plus />
      </Button>
    </div>
  )
}
