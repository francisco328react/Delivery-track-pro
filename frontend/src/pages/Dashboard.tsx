import { useAuth } from "../context/useAuth";

export function Dashboard() {
  const { user, logout } = useAuth();

  console.log(user)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user?.name || "Usuário"} 👋</h1>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}
