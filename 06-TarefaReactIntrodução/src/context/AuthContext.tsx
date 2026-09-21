import { createContext, useState, type ReactNode } from 'react'
import type { Papel, Usuario } from '@/lib/types'
import { contas, encontrarUsuario } from '@/data/mock'

interface ResultadoLogin {
  ok: boolean
  erro?: string
}

interface AuthValor {
  usuario: Usuario | null
  papel: Papel | null
  login: (email: string, senha: string, papel: Papel) => ResultadoLogin
  logout: () => void
  atualizarUsuario: (patch: Partial<Usuario>) => void
}

const CHAVE = 'getagig.sessao'

export const AuthContext = createContext<AuthValor | null>(null)

function lerSessao(): Usuario | null {
  try {
    const bruto = localStorage.getItem(CHAVE)
    return bruto ? (JSON.parse(bruto) as Usuario) : null
  } catch {
    return null
  }
}

function gravarSessao(usuario: Usuario | null) {
  try {
    if (usuario) localStorage.setItem(CHAVE, JSON.stringify(usuario))
    else localStorage.removeItem(CHAVE)
  } catch {
    return
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => lerSessao())

  function login(email: string, senha: string, papel: Papel): ResultadoLogin {
    const conta = contas.find((c) => c.email === email.trim().toLowerCase())
    if (!conta || conta.senha !== senha) {
      return { ok: false, erro: 'E-mail ou senha incorretos. Confira as credenciais e tente de novo.' }
    }
    if (conta.papel !== papel) {
      return { ok: false, erro: 'Essa conta não pertence a esse tipo de acesso. Selecione o tipo correto.' }
    }
    const dados = encontrarUsuario(conta.usuarioId)
    if (!dados) {
      return { ok: false, erro: 'Não encontramos os dados dessa conta.' }
    }
    setUsuario(dados)
    gravarSessao(dados)
    return { ok: true }
  }

  function logout() {
    setUsuario(null)
    gravarSessao(null)
  }

  function atualizarUsuario(patch: Partial<Usuario>) {
    setUsuario((atual) => {
      if (!atual) return atual
      const atualizado = { ...atual, ...patch } as Usuario
      gravarSessao(atualizado)
      return atualizado
    })
  }

  return (
    <AuthContext.Provider value={{ usuario, papel: usuario?.papel ?? null, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  )
}
