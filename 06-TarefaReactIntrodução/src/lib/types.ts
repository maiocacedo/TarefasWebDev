export type Papel = 'contratante' | 'musico'
export type TipoTrabalho = 'estudio' | 'banda' | 'evento'

export interface Conta {
  email: string
  senha: string
  papel: Papel
  usuarioId: string
}

export interface UsuarioBase {
  id: string
  nome: string
  usuario: string
  email: string
  foto: string
  bio: string
  papel: Papel
}

export interface Musico extends UsuarioBase {
  papel: 'musico'
  categorias: string[]
  habilidades: string[]
  preferencias: string[]
  portfolioNome?: string
}

export interface Contratante extends UsuarioBase {
  papel: 'contratante'
  categoriasBuscadas: string[]
}

export type Usuario = Musico | Contratante

export interface Requisito {
  label: string
  valor: string
}

export interface Vaga {
  id: string
  titulo: string
  resumo: string
  descricao: string
  tipo: TipoTrabalho
  categorias: string[]
  requisitos: Requisito[]
  valorEsperado: string
  contratanteId: string
}

export const rotuloTipo: Record<TipoTrabalho, string> = {
  estudio: 'Sessão de estúdio',
  banda: 'Compor banda',
  evento: 'Evento ao vivo',
}
