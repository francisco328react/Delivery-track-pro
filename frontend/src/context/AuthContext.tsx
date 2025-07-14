import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!token;

  async function login(email: string, password: string) {
    const response = await api.post("/login", { email, password });
    const {token, user} = response.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        login, 
        logout, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
