import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CampoTexto } from '@/components/feedback/CampoTexto'
import { Alerta } from '@/components/feedback/Alerta'
import { useCampo } from '@/hooks/useCampo'
import { emailValido, obrigatorio } from '@/lib/validators'

interface DadosPerfil {
  nome: string
  usuario: string
  email: string
  bio: string
}

interface FormularioPerfilProps {
  nomeInicial: string
  usuarioInicial: string
  emailInicial: string
  bioInicial: string
  onSalvar: (dados: DadosPerfil) => void
}

export function FormularioPerfil({
  nomeInicial,
  usuarioInicial,
  emailInicial,
  bioInicial,
  onSalvar,
}: FormularioPerfilProps) {
  const nome = useCampo(nomeInicial, [obrigatorio])
  const usuario = useCampo(usuarioInicial, [obrigatorio])
  const email = useCampo(emailInicial, [obrigatorio, emailValido])
  const senha = useCampo('', [(v) => (v.length === 0 || v.length >= 6 ? null : 'Use pelo menos 6 caracteres.')])
  const bio = useCampo(bioInicial, [])
  const [salvo, setSalvo] = useState(false)

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    setSalvo(false)
    const ok = [nome.validar(), usuario.validar(), email.validar(), senha.validar()].every(Boolean)
    if (!ok) return
    onSalvar({ nome: nome.value, usuario: usuario.value, email: email.value, bio: bio.value })
    senha.reset('')
    setSalvo(true)
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      {salvo && <Alerta tipo="sucesso" mensagem="Alterações salvas com sucesso." />}
      <CampoTexto id="nome" label="Nome" value={nome.value} erro={nome.erro} onChange={nome.onChange} onBlur={nome.onBlur} />
      <CampoTexto id="usuario" label="Usuário" value={usuario.value} erro={usuario.erro} onChange={usuario.onChange} onBlur={usuario.onBlur} />
      <CampoTexto id="email" label="E-mail" type="email" value={email.value} erro={email.erro} onChange={email.onChange} onBlur={email.onBlur} />
      <CampoTexto
        id="senha"
        label="Nova senha"
        type="password"
        value={senha.value}
        erro={senha.erro}
        onChange={senha.onChange}
        onBlur={senha.onBlur}
        dica="Deixe em branco para manter a senha atual."
      />
      <CampoTexto id="bio" label="Bio" multiline value={bio.value} onChange={bio.onChange} onBlur={bio.onBlur} />
      <Button type="submit" className="border-2 border-foreground">
        Salvar alterações
      </Button>
    </form>
  )
}
