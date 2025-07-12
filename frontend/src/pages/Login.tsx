import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("987123456");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setError("Credenciais invalidas");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {error && (
                    <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <input 
                    type="email"
                    placeholder="E-mail"
                    className="w-full px-4 py-2 border rounded mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full px-4 py-2 border rounded mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 border rounded w-full hover:bg-blue-600 duration-300 cursor-pointer"
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}