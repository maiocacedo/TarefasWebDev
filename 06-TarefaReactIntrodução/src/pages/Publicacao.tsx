import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alerta } from '@/components/feedback/Alerta'
import { CategoriaBadge } from '@/components/perfil/CategoriaBadge'
import { RequisitosLista } from '@/components/vaga/RequisitosLista'
import { useAuth } from '@/hooks/useAuth'
import { contratanteDaVaga, encontrarVaga } from '@/data/mock'
import { rotuloTipo } from '@/lib/types'

export default function Publicacao() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuario, papel } = useAuth()
  const [candidatou, setCandidatou] = useState(false)
  const [avisoGerenciar, setAvisoGerenciar] = useState(false)

  const vaga = id ? encontrarVaga(id) : undefined

  if (!vaga) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center">
        <h1 className="mb-2 text-2xl font-bold">Vaga não encontrada</h1>
        <p className="mb-4 text-muted-foreground">Essa publicação pode ter sido removida.</p>
        <Button asChild className="border-2 border-foreground">
          <Link to="/">Voltar</Link>
        </Button>
      </div>
    )
  }

  const autor = contratanteDaVaga(vaga)
  const ehDono = papel === 'contratante' && usuario?.id === vaga.contratanteId

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4 -ml-2" onClick={() => navigate(-1)}>
        ← Voltar
      </Button>
      <Card className="border-2 border-foreground shadow-amp">
        <CardHeader className="space-y-3">
          <Badge className="w-fit bg-secondary text-secondary-foreground">{rotuloTipo[vaga.tipo]}</Badge>
          <CardTitle className="text-2xl">{vaga.titulo}</CardTitle>
          {autor && <p className="text-sm text-muted-foreground">Publicado por {autor.nome}</p>}
          <div className="flex flex-wrap gap-2">
            {vaga.categorias.map((c) => (
              <CategoriaBadge key={c} categoria={c} ativa />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-1">
            <h2 className="text-sm font-semibold">Descrição</h2>
            <p className="text-muted-foreground">{vaga.descricao}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold">Requisitos</h2>
            <RequisitosLista requisitos={vaga.requisitos} />
          </section>

          <section className="flex items-center justify-between rounded-lg border-2 border-foreground bg-muted/40 px-4 py-3">
            <span className="text-sm font-semibold">Valor esperado</span>
            <span className="font-display text-lg font-bold text-primary">{vaga.valorEsperado}</span>
          </section>

          {candidatou && <Alerta tipo="sucesso" mensagem="Candidatura enviada! O contratante vai receber seu perfil." />}

          {ehDono ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-3">
                <Button className="border-2 border-foreground" onClick={() => setAvisoGerenciar(true)}>
                  Editar vaga
                </Button>
                <Button variant="outline" onClick={() => setAvisoGerenciar(true)}>
                  Encerrar vaga
                </Button>
              </div>
              {avisoGerenciar && (
                <p role="status" className="text-sm text-muted-foreground">
                  O gerenciamento de vagas estará disponível em breve.
                </p>
              )}
            </div>
          ) : papel === 'musico' ? (
            <Button
              className="w-full border-2 border-foreground"
              disabled={candidatou}
              onClick={() => setCandidatou(true)}
            >
              {candidatou ? 'Candidatura enviada' : 'Candidatar-se'}
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
