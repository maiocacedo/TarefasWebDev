import type { Requisito } from '@/lib/types'

interface RequisitosListaProps {
  requisitos: Requisito[]
}

export function RequisitosLista({ requisitos }: RequisitosListaProps) {
  if (requisitos.length === 0) {
    return <p className="text-sm text-muted-foreground">Sem requisitos específicos.</p>
  }
  return (
    <dl className="divide-y divide-border rounded-lg border-2 border-foreground">
      {requisitos.map((r, i) => (
        <div key={`${r.label}-${i}`} className="flex justify-between gap-4 px-4 py-3">
          <dt className="text-sm font-semibold">{r.label}</dt>
          <dd className="text-sm text-muted-foreground">{r.valor}</dd>
        </div>
      ))}
    </dl>
  )
}
