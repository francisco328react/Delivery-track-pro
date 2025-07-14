import { useAuth } from "../context/useAuth"

export function Header() {
    const {user, logout} = useAuth()

    return (
        <header className="h-16 bg-white border-b flex justify-between items-center px-6 ml-64">
            <span className="text-gray-700 font-medium">
                Olá, {user?.name}
            </span>
            <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Sair
            </button>
        </header>
    )
}