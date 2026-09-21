import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { NavLateral } from '@/components/layout/NavLateral'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import Login from '@/pages/Login'
import FeedMusicos from '@/pages/FeedMusicos'
import FeedVagas from '@/pages/FeedVagas'
import PerfilContratante from '@/pages/PerfilContratante'
import PerfilMusico from '@/pages/PerfilMusico'
import Publicacao from '@/pages/Publicacao'
import MusicoDetalhes from '@/pages/MusicoDetalhes'
import NaoEncontrado from '@/pages/NaoEncontrado'

function Layout() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-background">
      <NavLateral />
      <div className="md:pl-60">
        <main
          key={location.pathname}
          className="min-h-screen animate-in fade-in slide-in-from-bottom-3 pb-24 duration-500 md:pb-0"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function Inicio() {
  const { usuario, papel } = useAuth()
  if (!usuario) return <Navigate to="/login" replace />
  return <Navigate to={papel === 'contratante' ? '/musicos' : '/vagas'} replace />
}

function Perfil() {
  const { papel } = useAuth()
  return papel === 'contratante' ? <PerfilContratante /> : <PerfilMusico />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/musicos"
          element={
            <ProtectedRoute papel="contratante">
              <FeedMusicos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vagas"
          element={
            <ProtectedRoute papel="musico">
              <FeedVagas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publicacao/:id"
          element={
            <ProtectedRoute>
              <Publicacao />
            </ProtectedRoute>
          }
        />
        <Route
          path="/musico/:id"
          element={
            <ProtectedRoute>
              <MusicoDetalhes />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  )
}
