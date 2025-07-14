import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { api } from "../services/api";
import { useNavigate } from "react-router";

interface Courier {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    active?: boolean | null;
}

export function Couriers() {
    const [couriers, setCouriers] = useState<Courier[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/couriers")
        .then((res) => setCouriers(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [])

    return (
        <Layout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Lista de Entregadores</h1>
                <button
                    onClick={() => navigate("/couriers/new")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Novo Entregador
                </button>
            </div>

            {loading ? (
                <p>Carregando...</p>
            ) : couriers.length === 0 ? (
                <p>Nenhum entregador cadatrado</p>
            ) : (
                <table className="w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Nome</th>
                            <th className="p-2 text-2xl">Email</th>
                            <th className="p-2 text-left">Telefone</th>
                            <th className="p-2 text-left">Ativo</th>
                            <th className="p-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {couriers.map((courier) => (
                            <tr key={courier.id} className="border-t">
                                <td className="p-2">
                                    {courier.name}
                                </td>
                                <td className="p-2">
                                    {courier.email}
                                </td>
                                <td className="p-2">
                                    {courier.phone || "-"}
                                </td>
                                <td>
                                    {courier.active ? (
                                        <span className="text-green-600 font-semibold">Sim</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">Não</span>
                                    )}
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => navigate(`/couriers/edit/${courier.id}`)}
                                        className="text-green-600 hover:underline"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    )
}