import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ element }) {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto o estado de carregamento não for concluído, não renderiza nada
  if (loading) {
    return <div>Carregando...</div> // Você pode colocar um "Carregando..." ou um spinner aqui
  }

  if (isAuthenticated === false) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado, renderiza o elemento da rota protegida
  return element;
}