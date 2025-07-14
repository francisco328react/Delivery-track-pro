import { api } from "../services/api";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

interface Delivery {
    id: string;
    recipient: string;
    status: string;
    createdAt: string;
}

export function Deliveries() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/deliveries")
        .then((res) => setDeliveries(res.data))
        .catch((err) => console.error("Erro ao buscar entregas:", err))
        .finally(() => setLoading(false));
    }, [])

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">
                Lista de Entregas
            </h1>
            {loading ? (
                <p>Carregando...</p>
            ) : deliveries.length === 0 ? (
                <p>Nenhuma entrega cadastrada.</p>
            ): (
                <table className="w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Destinatário</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Criado em</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery.id} className="border-t">
                                <td className="p-2">{delivery.recipient}</td>
                                <td className="p-2">{delivery.status}</td>
                                <td className="p-2">
                                    {new Date(delivery.createdAt).toLocaleString("pt-BR")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    )
}