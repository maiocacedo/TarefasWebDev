import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Briefcase, LogOut, Music, UserRound, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function NavLateral() {
  const { usuario, papel, logout } = useAuth()
  const navigate = useNavigate()

  if (!usuario || !papel) return null

  const linkFeed = papel === 'contratante' ? '/musicos' : '/vagas'
  const rotuloFeed = papel === 'contratante' ? 'Músicos' : 'Vagas'
  const IconeFeed = papel === 'contratante' ? Users : Briefcase

  const itens = [
    { to: linkFeed, rotulo: rotuloFeed, Icone: IconeFeed },
    { to: '/perfil', rotulo: 'Perfil', Icone: UserRound },
  ]

  function sair() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r-2 border-foreground bg-background md:flex">
        <Link to={linkFeed} className="group flex items-center gap-2.5 px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[3px_3px_0_hsl(var(--foreground))] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Music className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">Get-A-Gig</span>
        </Link>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {itens.map(({ to, rotulo, Icone }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:translate-x-1 hover:bg-muted active:scale-95',
                  isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-primary transition-all duration-300',
                      isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
                    )}
                  />
                  <Icone className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  {rotulo}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{iniciais(usuario.nome)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">{usuario.nome}</p>
              <p className="text-xs text-muted-foreground">
                {papel === 'contratante' ? 'Contratante' : 'Músico'}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full active:scale-95" onClick={sair}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      <header className="sticky top-0 z-10 flex items-center gap-2 border-b-2 border-foreground bg-background px-4 py-3 md:hidden">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[2px_2px_0_hsl(var(--foreground))]">
          <Music className="h-4 w-4" />
        </span>
        <span className="font-display text-lg font-bold">Get-A-Gig</span>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex items-stretch border-t-2 border-foreground bg-background md:hidden">
        {itens.map(({ to, rotulo, Icone }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-all duration-200 active:scale-90',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icone className={cn('h-5 w-5 transition-transform duration-200', isActive && 'scale-110')} />
                {rotulo}
              </>
            )}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={sair}
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 active:scale-90"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </nav>
    </>
  )
}
