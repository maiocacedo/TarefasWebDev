export function clean(n: number): number {
  return Math.round(n * 1e9) / 1e9
}

export function clamp(n: number, min: number, max: number): number {
  if (n < min) return min
  if (n > max) return max
  return n
}

export function formatarValor(n: number): string {
  return String(clean(n))
}

export function sanitizarStep(bruto: number, anterior: number): number {
  if (Number.isFinite(bruto) && bruto > 0) return clean(bruto)
  return anterior > 0 ? anterior : 1
}

export function ordenarLimites(
  min: number,
  max: number,
): { min: number; max: number } {
  return min > max ? { min: max, max: min } : { min, max }
}

export function calcularReset(min: number, max: number): number {
  return clamp(Math.max(min, 0), min, max)
}
