import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Papel } from '@/lib/types'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  papel?: Papel
  children: ReactNode
}

export function ProtectedRoute({ papel, children }: ProtectedRouteProps) {
  const { usuario, papel: papelAtual } = useAuth()

  if (!usuario) return <Navigate to="/login" replace />
  if (papel && papelAtual !== papel) {
    return <Navigate to={papelAtual === 'contratante' ? '/musicos' : '/vagas'} replace />
  }
  return <>{children}</>
}
