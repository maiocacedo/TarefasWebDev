import { Badge } from '@/components/ui/badge'

interface ListaHabilidadesProps {
  habilidades: string[]
  titulo?: string
}

export function ListaHabilidades({ habilidades, titulo }: ListaHabilidadesProps) {
  if (habilidades.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma habilidade cadastrada ainda.</p>
  }
  return (
    <div className="space-y-2">
      {titulo && <p className="text-sm font-semibold">{titulo}</p>}
      <div className="flex flex-wrap gap-2">
        {habilidades.map((h) => (
          <Badge
            key={h}
            variant="secondary"
            className="bg-muted font-normal text-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
          >
            {h}
          </Badge>
        ))}
      </div>
    </div>
  )
}
