import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializando como null
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Quando terminar a verificação, define loading como false
  }, []);

  // Retorna o estado de autenticação e o estado de carregamento
  return { isAuthenticated, loading };
}