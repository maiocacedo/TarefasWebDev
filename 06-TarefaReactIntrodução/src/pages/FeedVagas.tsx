import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardVaga } from '@/components/vaga/CardVaga'
import { Badge } from '@/components/ui/badge'
import { vagas, categorias } from '@/data/mock'
import { cn } from '@/lib/utils'

export default function FeedVagas() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState<string | null>(null)

  const lista = filtro ? vagas.filter((v) => v.categorias.includes(filtro)) : vagas

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Encontre trabalhos</h1>
        <p className="text-muted-foreground">Vagas abertas para músicos. Filtre pela sua categoria.</p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!filtro} onClick={() => setFiltro(null)}>
          <Badge
            variant="outline"
            className={cn('cursor-pointer border-foreground/30', !filtro && 'bg-primary text-primary-foreground')}
          >
            Todas
          </Badge>
        </button>
        {categorias.map((c) => (
          <button key={c} type="button" aria-pressed={filtro === c} onClick={() => setFiltro(c)}>
            <Badge
              variant="outline"
              className={cn(
                'cursor-pointer border-foreground/30',
                filtro === c && 'bg-primary text-primary-foreground',
              )}
            >
              {c}
            </Badge>
          </button>
        ))}
      </div>

      {lista.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-10 text-center">
          <p className="font-display text-lg font-semibold">Nenhuma vaga nesta categoria</p>
          <p className="text-muted-foreground">Tente outra categoria ou volte para "Todas".</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((v) => (
            <CardVaga
              key={v.id}
              titulo={v.titulo}
              resumo={v.resumo}
              tipo={v.tipo}
              categorias={v.categorias}
              valor={v.valorEsperado}
              onVer={() => navigate(`/publicacao/${v.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
