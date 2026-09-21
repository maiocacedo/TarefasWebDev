import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoriaBadge } from '@/components/perfil/CategoriaBadge'
import { ListaHabilidades } from '@/components/perfil/ListaHabilidades'
import { FormularioPerfil } from '@/components/perfil/FormularioPerfil'
import { useAuth } from '@/hooks/useAuth'
import type { Musico } from '@/lib/types'

function iniciais(nome: string) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function PerfilMusico() {
  const { usuario, atualizarUsuario } = useAuth()
  if (!usuario || usuario.papel !== 'musico') return null
  const musico = usuario as Musico

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
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
          <CardTitle className="text-lg">Categorias que atendo</CardTitle>
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
          <CardTitle className="text-lg">Portfólio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-border px-4 py-6">
            <p className="text-sm text-muted-foreground">
              {musico.portfolioNome ?? 'Nenhum arquivo anexado.'}
            </p>
            <Button variant="outline" size="sm" disabled>
              Anexar (em breve)
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Opcional. O anexo de portfólio ainda não está disponível.</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="text-lg">Configurações da conta</CardTitle>
        </CardHeader>
        <CardContent>
          <FormularioPerfil
            nomeInicial={musico.nome}
            usuarioInicial={musico.usuario}
            emailInicial={musico.email}
            bioInicial={musico.bio}
            onSalvar={(d) => atualizarUsuario(d)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
