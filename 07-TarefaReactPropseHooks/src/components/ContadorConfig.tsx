import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { formatarValor } from '@/lib/contador'

interface CampoNumeroProps {
  id: string
  label: string
  valor: number
  destaque: boolean
  onCommit: (bruto: number) => number
  min?: number
  placeholder?: string
}

function CampoNumero({ id, label, valor, destaque, onCommit, min, placeholder }: CampoNumeroProps) {
  const [texto, setTexto] = useState(() => formatarValor(valor))

  useEffect(() => {
    setTexto(formatarValor(valor))
  }, [valor])

  function commit() {
    const bruto = texto.trim() === '' ? Number.NaN : Number(texto)
    const aplicado = onCommit(bruto)
    setTexto(formatarValor(aplicado))
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step="any"
        placeholder={placeholder}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur()
        }}
        className={cn('bg-secondary/40 text-center font-mono', destaque && 'pulse-borda')}
      />
    </div>
  )
}

interface ContadorConfigProps {
  step: number
  min: number
  max: number
  destaqueStep: boolean
  destaqueMin: boolean
  destaqueMax: boolean
  onCommitStep: (bruto: number) => number
  onCommitMin: (bruto: number) => number
  onCommitMax: (bruto: number) => number
}

export function ContadorConfig({
  step,
  min,
  max,
  destaqueStep,
  destaqueMin,
  destaqueMax,
  onCommitStep,
  onCommitMin,
  onCommitMax,
}: ContadorConfigProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <CampoNumero
        id="config-step"
        label="Passo"
        valor={step}
        destaque={destaqueStep}
        onCommit={onCommitStep}
        min={0}
        placeholder="> 0"
      />
      <CampoNumero
        id="config-min"
        label="Mínimo"
        valor={min}
        destaque={destaqueMin}
        onCommit={onCommitMin}
      />
      <CampoNumero
        id="config-max"
        label="Máximo"
        valor={max}
        destaque={destaqueMax}
        onCommit={onCommitMax}
      />
    </div>
  )
}
