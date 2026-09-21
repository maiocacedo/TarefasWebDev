import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CategoriaBadge } from '@/components/perfil/CategoriaBadge'
import { ListaHabilidades } from '@/components/perfil/ListaHabilidades'

interface CardPerfilProps {
  nome: string
  usuario: string
  foto?: string
  categorias: string[]
  habilidades: string[]
  onVer?: () => void
}

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function CardPerfil({ nome, usuario, foto, categorias, habilidades, onVer }: CardPerfilProps) {
  return (
    <Card className="flex h-full flex-col border-2 border-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-amp">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <Avatar className="h-12 w-12">
          {foto && <AvatarImage src={foto} alt={nome} />}
          <AvatarFallback>{iniciais(nome)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-display font-bold leading-tight">{nome}</p>
          <p className="text-sm text-muted-foreground">@{usuario}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <CategoriaBadge key={c} categoria={c} ativa />
          ))}
        </div>
        <ListaHabilidades habilidades={habilidades} />
      </CardContent>
      {onVer && (
        <CardFooter>
          <Button onClick={onVer} className="w-full border-2 border-foreground">
            Ver perfil
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
