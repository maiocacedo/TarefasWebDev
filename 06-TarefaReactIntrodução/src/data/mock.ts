import type { Conta, Contratante, Musico, Usuario, Vaga } from '@/lib/types'

export const categorias = [
  'Vocalista',
  'Guitarrista',
  'Baixista',
  'Baterista',
  'Tecladista',
  'Produtor',
  'DJ',
  'Violinista',
  'Violonista',
]

const contratante: Contratante = {
  id: 'u-contratante',
  papel: 'contratante',
  nome: 'Bar do Rock',
  usuario: 'bardorock',
  email: 'contratante@demo.com',
  foto: '',
  bio: 'Casa de shows no centro. Contratamos músicos para noites ao vivo toda semana.',
  categoriasBuscadas: ['Vocalista', 'Guitarrista', 'Baterista'],
}

const musicoLogado: Musico = {
  id: 'u-musico',
  papel: 'musico',
  nome: 'Caio Macedo',
  usuario: 'caio.bass',
  email: 'musico@demo.com',
  foto: '',
  bio: 'Baixista com pegada em prog rock, jazz e rock. Groove firme, leitura afiada e gosto por arranjos que fogem do óbvio. Disponível para estúdio e banda.',
  categorias: ['Baixista'],
  habilidades: ['Slap', 'Walking bass', 'Improviso', 'Leitura', 'Compassos compostos'],
  preferencias: ['Estúdio', 'Banda'],
  portfolioNome: undefined,
}

export const musicos: Musico[] = [
  musicoLogado,
  {
    id: 'm-1',
    papel: 'musico',
    nome: 'Gabriel Spacki',
    usuario: 'spacki.teclas',
    email: 'gabriel@demo.com',
    foto: '',
    bio: 'Multi-instrumentista focado em rock. Experiência com várias bandas e estúdios.',
    categorias: ['Tecladista', 'Guitarrista', 'Violonista', 'Violinista'],
    habilidades: ['Arranjo', 'Improviso', 'Leitura'],
    preferencias: ['Estúdio', 'Banda'],
  },
  {
    id: 'm-2',
    papel: 'musico',
    nome: 'Lara Lopes',
    usuario: 'lyaa.voz',
    email: 'lara@demo.com',
    foto: '',
    bio: 'Vocalista com fortes influências no metal. Voz potente e rasgada.',
    categorias: ['Vocalista'],
    habilidades: ['Drive', 'Composição', 'Presença de palco'],
    preferencias: ['Banda', 'Eventos'],
  },
  {
    id: 'm-3',
    papel: 'musico',
    nome: 'Gustavo Mazur',
    usuario: 'Gusta.fotocopia',
    email: 'gustavo@demo.com',
    foto: '',
    bio: 'Violonista com foco em MPB e brasilidades. Dedilhado e ritmos complexos.',
    categorias: ['Violonista'],
    habilidades: ['Dedilhado', 'Harmonia', 'Arranjo'],
    preferencias: ['Estúdio', 'Banda'],
  },
  {
    id: 'm-4',
    papel: 'musico',
    nome: 'Pedro Barth',
    usuario: 'barth.guitas',
    email: 'pedro@demo.com',
    foto: '',
    bio: 'Guitarrista voltado para o metal. Solos rápidos e riffs pesados.',
    categorias: ['Guitarrista'],
    habilidades: ['Shredding', 'Riffs pesados', 'Solo'],
    preferencias: ['Banda'],
  },
  {
    id: 'm-5',
    papel: 'musico',
    nome: 'Marcos Vinícius',
    usuario: 'marcos.batera',
    email: 'marcos@demo.com',
    foto: '',
    bio: 'Baterista focado em rock e grooves energéticos. Pegada firme.',
    categorias: ['Baterista'],
    habilidades: ['Groove', 'Pedal duplo', 'Dinâmica'],
    preferencias: ['Banda', 'Eventos'],
  },
  {
    id: 'm-6',
    papel: 'musico',
    nome: 'Victor Emanuel',
    usuario: 'vitor.ea',
    email: 'victor@demo.com',
    foto: '',
    bio: 'DJ com repertório focado em house, funk e rap. Anima qualquer pista.',
    categorias: ['DJ'],
    habilidades: ['Mixagem', 'Leitura de pista', 'Transições'],
    preferencias: ['Eventos', 'Estúdio'],
  },
]

export const usuarios: Usuario[] = [contratante, ...musicos]

export const contas: Conta[] = [
  { email: 'contratante@demo.com', senha: '123456', papel: 'contratante', usuarioId: 'u-contratante' },
  { email: 'musico@demo.com', senha: '123456', papel: 'musico', usuarioId: 'u-musico' },
]

export const vagas: Vaga[] = [
  {
    id: 'v-1',
    titulo: 'Vocalista para noite de MPB',
    resumo: 'Show de 2h no sábado, repertório MPB.',
    descricao: 'Procuramos vocalista para noite de MPB no nosso palco principal. Repertório combinado com antecedência, passagem de som às 18h.',
    tipo: 'evento',
    categorias: ['Vocalista'],
    requisitos: [
      { label: 'Estilo', valor: 'MPB / Bossa' },
      { label: 'Experiência', valor: 'Palco, mínimo 2 anos' },
      { label: 'Data e local', valor: '21/09, Centro' },
      { label: 'Duração', valor: '2 horas' },
    ],
    valorEsperado: 'R$ 800',
    contratanteId: 'u-contratante',
  },
  {
    id: 'v-2',
    titulo: 'Guitarrista para gravação de EP',
    resumo: 'Sessão de estúdio, 4 faixas autorais.',
    descricao: 'Banda independente busca guitarrista para gravar 4 faixas autorais. Pré-produção enviada por e-mail.',
    tipo: 'estudio',
    categorias: ['Guitarrista'],
    requisitos: [
      { label: 'Estilo', valor: 'Indie rock' },
      { label: 'Experiência', valor: 'Gravação em estúdio' },
      { label: 'Prazo', valor: 'Entrega em 3 semanas' },
    ],
    valorEsperado: 'R$ 1.200',
    contratanteId: 'u-contratante',
  },
  {
    id: 'v-3',
    titulo: 'Baterista para formar banda autoral',
    resumo: 'Projeto novo, ensaios semanais.',
    descricao: 'Montando banda autoral de rock alternativo. Buscamos baterista comprometido para ensaios semanais e shows locais.',
    tipo: 'banda',
    categorias: ['Baterista'],
    requisitos: [
      { label: 'Estilo', valor: 'Rock alternativo' },
      { label: 'Disponibilidade', valor: 'Ensaios semanais' },
      { label: 'Local', valor: 'Zona Sul' },
    ],
    valorEsperado: 'A combinar',
    contratanteId: 'u-contratante',
  },
  {
    id: 'v-4',
    titulo: 'Baixista para projeto de prog rock',
    resumo: 'Banda autoral, influências jazz e rock progressivo.',
    descricao: 'Trio autoral busca baixista para compor o line-up. Repertório com métricas ímpares e espaço para improviso. Ensaios quinzenais e gravação de single no fim do trimestre.',
    tipo: 'banda',
    categorias: ['Baixista'],
    requisitos: [
      { label: 'Estilo', valor: 'Prog rock / Jazz' },
      { label: 'Experiência', valor: 'Leitura e compassos compostos' },
      { label: 'Disponibilidade', valor: 'Ensaios quinzenais' },
      { label: 'Local', valor: 'Zona Norte' },
    ],
    valorEsperado: 'R$ 1.000',
    contratanteId: 'u-contratante',
  },
]

export function encontrarUsuario(id: string): Usuario | undefined {
  return usuarios.find((u) => u.id === id)
}

export function encontrarVaga(id: string): Vaga | undefined {
  return vagas.find((v) => v.id === id)
}

export function contratanteDaVaga(vaga: Vaga): Usuario | undefined {
  return encontrarUsuario(vaga.contratanteId)
}
