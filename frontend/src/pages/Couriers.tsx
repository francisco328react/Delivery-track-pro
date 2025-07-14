import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { api } from "../services/api";

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

    useEffect(() => {
        api.get("/couriers")
        .then((res) => setCouriers(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [])

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Lista de Entregadores</h1>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    )
}