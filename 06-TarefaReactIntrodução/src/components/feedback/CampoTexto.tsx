import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface CampoTextoProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: () => void
  type?: string
  erro?: string | null
  placeholder?: string
  autoComplete?: string
  multiline?: boolean
  dica?: string
}

export function CampoTexto({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  erro,
  placeholder,
  autoComplete,
  multiline,
  dica,
}: CampoTextoProps) {
  const invalido = Boolean(erro)
  const descrito = invalido ? `${id}-erro` : dica ? `${id}-dica` : undefined
  const classe = cn(invalido && 'border-primary focus-visible:ring-primary')

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={invalido}
          aria-describedby={descrito}
          className={classe}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={invalido}
          aria-describedby={descrito}
          className={classe}
        />
      )}
      {invalido ? (
        <p id={`${id}-erro`} className="text-sm font-medium text-primary">
          {erro}
        </p>
      ) : dica ? (
        <p id={`${id}-dica`} className="text-sm text-muted-foreground">
          {dica}
        </p>
      ) : null}
    </div>
  )
}
