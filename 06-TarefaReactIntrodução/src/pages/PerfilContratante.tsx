import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoriaBadge } from '@/components/perfil/CategoriaBadge'
import { FormularioPerfil } from '@/components/perfil/FormularioPerfil'
import { useAuth } from '@/hooks/useAuth'
import type { Contratante } from '@/lib/types'

function iniciais(nome: string) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function PerfilContratante() {
  const { usuario, atualizarUsuario } = useAuth()
  if (!usuario || usuario.papel !== 'contratante') return null
  const contratante = usuario as Contratante

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">{iniciais(contratante.nome)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{contratante.nome}</h1>
          <p className="text-muted-foreground">@{contratante.usuario}</p>
        </div>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="text-lg">Categorias que busco</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {contratante.categoriasBuscadas.map((c) => (
            <CategoriaBadge key={c} categoria={c} ativa />
          ))}
        </CardContent>
      </Card>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="text-lg">Configurações da conta</CardTitle>
        </CardHeader>
        <CardContent>
          <FormularioPerfil
            nomeInicial={contratante.nome}
            usuarioInicial={contratante.usuario}
            emailInicial={contratante.email}
            bioInicial={contratante.bio}
            onSalvar={(d) => atualizarUsuario(d)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
