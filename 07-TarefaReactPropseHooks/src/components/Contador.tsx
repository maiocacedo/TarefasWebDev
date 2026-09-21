import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ContadorDisplay } from '@/components/ContadorDisplay'
import { ContadorControles } from '@/components/ContadorControles'
import { ContadorConfig } from '@/components/ContadorConfig'
import { usePulse } from '@/hooks/usePulse'
import {
  calcularReset,
  clamp,
  clean,
  ordenarLimites,
  sanitizarStep,
} from '@/lib/contador'

export function Contador() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(10)

  const [pulseValor, dispararPulseValor] = usePulse()
  const [pulseStep, dispararPulseStep] = usePulse()
  const [pulseMin, dispararPulseMin] = usePulse()
  const [pulseMax, dispararPulseMax] = usePulse()

  function incrementar() {
    setCount((c) => clamp(clean(c + step), min, max))
  }

  function decrementar() {
    setCount((c) => clamp(clean(c - step), min, max))
  }

  function resetar() {
    setCount(calcularReset(min, max))
  }

  function commitStep(bruto: number): number {
    const invalido = !(Number.isFinite(bruto) && bruto > 0)
    const novo = sanitizarStep(bruto, step)
    setStep(novo)
    if (novo !== bruto || invalido) dispararPulseStep()
    return novo
  }

  function commitMin(bruto: number): number {
    if (!Number.isFinite(bruto)) {
      dispararPulseMin()
      return min
    }
    const ord = ordenarLimites(bruto, max)
    setMin(ord.min)
    setMax(ord.max)
    const novoCount = clamp(count, ord.min, ord.max)
    setCount(novoCount)
    if (ord.min !== bruto) {
      dispararPulseMin()
      dispararPulseMax()
    }
    if (novoCount !== count) dispararPulseValor()
    return ord.min
  }

  function commitMax(bruto: number): number {
    if (!Number.isFinite(bruto)) {
      dispararPulseMax()
      return max
    }
    const ord = ordenarLimites(min, bruto)
    setMin(ord.min)
    setMax(ord.max)
    const novoCount = clamp(count, ord.min, ord.max)
    setCount(novoCount)
    if (ord.max !== bruto) {
      dispararPulseMin()
      dispararPulseMax()
    }
    if (novoCount !== count) dispararPulseValor()
    return ord.max
  }

  const alvoReset = calcularReset(min, max)

  return (
    <Card className="w-full max-w-md border-primary/30 bg-card/80 p-8 shadow-neon backdrop-blur-sm">
      <div className="flex flex-col gap-8">
        <ContadorDisplay valor={count} min={min} max={max} destaque={pulseValor} />
        <ContadorControles
          onIncrementar={incrementar}
          onDecrementar={decrementar}
          onResetar={resetar}
          podeIncrementar={count < max}
          podeDecrementar={count > min}
          podeResetar={count !== alvoReset}
        />
        <ContadorConfig
          step={step}
          min={min}
          max={max}
          destaqueStep={pulseStep}
          destaqueMin={pulseMin}
          destaqueMax={pulseMax}
          onCommitStep={commitStep}
          onCommitMin={commitMin}
          onCommitMax={commitMax}
        />
      </div>
    </Card>
  )
}
