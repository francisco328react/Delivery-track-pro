import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../services/api";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const isAuthenticated = !!token;

  async function login(email: string, password: string) {
    const response = await api.post("/login", { email, password });
    const token = response.data.token;

    setToken(token);
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
  }

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
