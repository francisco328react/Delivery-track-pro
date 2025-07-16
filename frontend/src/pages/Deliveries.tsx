import { api } from "../services/api";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";

interface Delivery {
    id: string;
    recipient: string;
    status: string;
    createdAt: string;
}

export function Deliveries() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/deliveries")
        .then((res) => setDeliveries(res.data))
        .catch((err) => console.error("Erro ao buscar entregas:", err))
        .finally(() => setLoading(false));
    }, [])

    const filteredSearTerm = deliveries.filter((delivery) =>
        delivery.recipient.toUpperCase().includes(searchTerm.toUpperCase()) || 
        delivery.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">
                    Lista de Entregas
                </h1>
                <button
                    onClick={() => navigate("/deliveries/new")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Nova Entrega
                </button>
            </div>

            <input 
                type="text"
                placeholder="Filtrar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-2 rounded mb-4 w-full md:w-1/2"
            />

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
                            <th className="p-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSearTerm.map((delivery) => (
                            <tr key={delivery.id} className="border-t">
                                <td className="p-2">{delivery.recipient}</td>
                                <td className="p-2">{delivery.status}</td>
                                <td className="p-2">
                                    {new Date(delivery.createdAt).toLocaleString("pt-BR")}
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => navigate(`/couriers/edit/${delivery.id}`)}
                                        className="text-blue-600 hover:underline cursor-pointer"
                                    >
                                        <Pencil className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={async () => {
                                        const confirmDelete = confirm("Tem certeza que deseja excluir esta entrega?");
                                        if (confirmDelete) {
                                            try {
                                            await api.delete(`/deliveries/${delivery.id}`);
                                            alert("Entrega excluída com sucesso");
                                            setDeliveries((prev) => prev.filter((d) => d.id !== delivery.id));
                                            } catch (error) {
                                            alert("Erro ao excluir entrega");
                                            console.error(error);
                                            }
                                        }
                                        }}
                                        className="text-red-600 ml-2 hover:underline cursor-pointer"
                                    >
                                        <Trash2 className="2-6 h-6" />
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