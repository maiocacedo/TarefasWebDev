import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface AlertaProps {
  tipo: 'erro' | 'sucesso'
  mensagem: string
}

export function Alerta({ tipo, mensagem }: AlertaProps) {
  const erro = tipo === 'erro'
  return (
    <Alert
      role={erro ? 'alert' : 'status'}
      className={cn(
        'border-2',
        erro
          ? 'border-primary/40 bg-primary/5 text-foreground'
          : 'border-secondary/30 bg-secondary/5 text-foreground',
      )}
    >
      <AlertTitle className="font-display">{erro ? 'Algo deu errado' : 'Tudo certo'}</AlertTitle>
      <AlertDescription>{mensagem}</AlertDescription>
    </Alert>
  )
}
