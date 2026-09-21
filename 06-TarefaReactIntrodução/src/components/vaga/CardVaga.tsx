import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoriaBadge } from '@/components/perfil/CategoriaBadge'
import { rotuloTipo, type TipoTrabalho } from '@/lib/types'

interface CardVagaProps {
  titulo: string
  resumo: string
  tipo: TipoTrabalho
  categorias: string[]
  valor: string
  onVer?: () => void
}

export function CardVaga({ titulo, resumo, tipo, categorias, valor, onVer }: CardVagaProps) {
  return (
    <Card className="flex h-full flex-col border-2 border-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-amp">
      <CardHeader className="space-y-2">
        <Badge className="w-fit bg-secondary text-secondary-foreground">{rotuloTipo[tipo]}</Badge>
        <CardTitle className="text-lg">{titulo}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground">{resumo}</p>
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <CategoriaBadge key={c} categoria={c} ativa />
          ))}
        </div>
        <p className="font-display font-bold text-primary">{valor}</p>
      </CardContent>
      {onVer && (
        <CardFooter>
          <Button onClick={onVer} className="w-full border-2 border-foreground">
            Ver vaga
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
