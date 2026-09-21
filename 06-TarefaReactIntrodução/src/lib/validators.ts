export type Validador = (valor: string) => string | null

export const obrigatorio: Validador = (v) =>
  v.trim().length > 0 ? null : 'Preencha este campo.'

export const emailValido: Validador = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Digite um e-mail válido, ex: nome@dominio.com.'

export const minimo =
  (n: number): Validador =>
  (v) =>
    v.length >= n ? null : `Use pelo menos ${n} caracteres.`
