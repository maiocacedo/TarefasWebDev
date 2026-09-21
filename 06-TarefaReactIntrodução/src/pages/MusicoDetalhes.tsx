import { useParams, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoriaBadge } from '@/components/perfil/CategoriaBadge'
import { ListaHabilidades } from '@/components/perfil/ListaHabilidades'
import { encontrarUsuario } from '@/data/mock'
import type { Musico } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'

function iniciais(nome: string) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function MusicoDetalhes() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const usuario = id ? encontrarUsuario(id) : undefined

  if (!usuario || usuario.papel !== 'musico') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Músico não encontrado</h1>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    )
  }

  const musico = usuario as Musico

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">{iniciais(musico.nome)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{musico.nome}</h1>
          <p className="text-muted-foreground">@{musico.usuario}</p>
        </div>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="text-lg">Categorias que atende</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {musico.categorias.map((c) => (
              <CategoriaBadge key={c} categoria={c} ativa />
            ))}
          </div>
          <ListaHabilidades habilidades={musico.habilidades} titulo="Habilidades" />
          <div>
            <p className="mb-2 text-sm font-semibold">Preferências</p>
            <div className="flex flex-wrap gap-2">
              {musico.preferencias.map((p) => (
                <CategoriaBadge key={p} categoria={p} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="text-lg">Biografia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{musico.bio}</p>
        </CardContent>
      </Card>
    </div>
  )
}
