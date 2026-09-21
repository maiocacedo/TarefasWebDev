import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CampoTexto } from '@/components/feedback/CampoTexto'
import { Alerta } from '@/components/feedback/Alerta'
import { useAuth } from '@/hooks/useAuth'
import { useCampo } from '@/hooks/useCampo'
import { emailValido, minimo, obrigatorio } from '@/lib/validators'
import type { Papel } from '@/lib/types'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [papel, setPapel] = useState<Papel>('contratante')
  const [erroLogin, setErroLogin] = useState<string | null>(null)

  const email = useCampo('', [obrigatorio, emailValido])
  const senha = useCampo('', [obrigatorio, minimo(6)])

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    setErroLogin(null)
    const emailOk = email.validar()
    const senhaOk = senha.validar()
    if (!emailOk || !senhaOk) return

    const resultado = login(email.value, senha.value, papel)
    if (!resultado.ok) {
      setErroLogin(resultado.erro ?? 'Não foi possível entrar.')
      return
    }
    navigate(papel === 'contratante' ? '/musicos' : '/vagas')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-2 border-foreground shadow-amp">
        <CardHeader>
          <CardTitle className="text-3xl">Get-A-Gig</CardTitle>
          <CardDescription>Conecte músicos e quem contrata. Entre para começar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={enviar} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-sm font-medium">Entrar como</p>
              <Tabs value={papel} onValueChange={(v) => setPapel(v as Papel)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contratante">Contratante</TabsTrigger>
                  <TabsTrigger value="musico">Músico</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {erroLogin && <Alerta tipo="erro" mensagem={erroLogin} />}

            <CampoTexto
              id="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="nome@dominio.com"
              value={email.value}
              erro={email.erro}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />
            <CampoTexto
              id="senha"
              label="Senha"
              type="password"
              autoComplete="current-password"
              placeholder="Mínimo 6 caracteres"
              value={senha.value}
              erro={senha.erro}
              onChange={senha.onChange}
              onBlur={senha.onBlur}
            />

            <Button type="submit" className="w-full border-2 border-foreground">
              Entrar
            </Button>
          </form>

          <div className="mt-6 rounded-md border border-dashed border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Contas de teste</p>
            <p>Contratante — contratante@demo.com / 123456</p>
            <p>Músico — musico@demo.com / 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
