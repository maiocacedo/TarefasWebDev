import { useState } from 'react'
import type { Validador } from '@/lib/validators'

export function useCampo(inicial: string, validadores: Validador[] = []) {
  const [value, setValue] = useState(inicial)
  const [erro, setErro] = useState<string | null>(null)
  const [tocado, setTocado] = useState(false)

  function rodar(valor: string): string | null {
    for (const validar of validadores) {
      const resultado = validar(valor)
      if (resultado) return resultado
    }
    return null
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const novo = e.target.value
    setValue(novo)
    if (tocado) setErro(rodar(novo))
  }

  function onBlur() {
    setTocado(true)
    setErro(rodar(value))
  }

  function validar(): boolean {
    const resultado = rodar(value)
    setTocado(true)
    setErro(resultado)
    return resultado === null
  }

  function reset(novoValor = inicial) {
    setValue(novoValor)
    setErro(null)
    setTocado(false)
  }

  return { value, erro, tocado, onChange, onBlur, validar, setValue, reset }
}
