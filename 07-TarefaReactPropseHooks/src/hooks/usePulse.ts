import { useCallback, useEffect, useRef, useState } from 'react'

export function usePulse(duracaoMs = 600): [boolean, () => void] {
  const [ativo, setAtivo] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const disparar = useCallback(() => {
    setAtivo(false)
    requestAnimationFrame(() => setAtivo(true))
  }, [])

  useEffect(() => {
    if (!ativo) return
    timer.current = window.setTimeout(() => setAtivo(false), duracaoMs)
    return () => window.clearTimeout(timer.current)
  }, [ativo, duracaoMs])

  return [ativo, disparar]
}
