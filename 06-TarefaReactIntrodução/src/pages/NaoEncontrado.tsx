import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p className="text-muted-foreground">O endereço que você tentou abrir não existe ou foi movido.</p>
      <Button asChild className="border-2 border-foreground">
        <Link to="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}
