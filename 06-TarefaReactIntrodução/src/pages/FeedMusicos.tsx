import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardPerfil } from '@/components/perfil/CardPerfil'
import { Badge } from '@/components/ui/badge'
import { musicos, categorias } from '@/data/mock'
import { cn } from '@/lib/utils'

export default function FeedMusicos() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState<string | null>(null)

  const lista = filtro ? musicos.filter((m) => m.categorias.includes(filtro)) : musicos

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Encontre músicos</h1>
        <p className="text-muted-foreground">Filtre por categoria e veja quem está disponível.</p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!filtro} onClick={() => setFiltro(null)}>
          <Badge
            variant="outline"
            className={cn(
              'cursor-pointer border-foreground/30 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95',
              !filtro && 'bg-primary text-primary-foreground',
            )}
          >
            Todas
          </Badge>
        </button>
        {categorias.map((c) => (
          <button key={c} type="button" aria-pressed={filtro === c} onClick={() => setFiltro(c)}>
            <Badge
              variant="outline"
              className={cn(
                'cursor-pointer border-foreground/30 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95',
                filtro === c && 'bg-primary text-primary-foreground',
              )}
            >
              {c}
            </Badge>
          </button>
        ))}
      </div>

      {lista.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-10 text-center animate-in fade-in zoom-in-95 duration-300">
          <p className="font-display text-lg font-semibold">Nenhum músico nesta categoria</p>
          <p className="text-muted-foreground">Tente outra categoria ou volte para "Todas".</p>
        </div>
      ) : (
        <div key={filtro ?? 'all'} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((m, i) => (
            <div
              key={m.id}
              className="h-full animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <CardPerfil
                nome={m.nome}
                usuario={m.usuario}
                foto={m.foto}
                categorias={m.categorias}
                habilidades={m.habilidades}
                onVer={() => navigate(`/musico/${m.id}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
