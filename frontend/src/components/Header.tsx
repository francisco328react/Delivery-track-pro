import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router";

export function Header() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="h-16 bg-white border-b flex justify-between items-center px-6 ml-64">
            <span className="text-gray-700 font-medium">
                Olá, {user?.name}
            </span>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
                Sair
            </button>
        </header>
    )
}