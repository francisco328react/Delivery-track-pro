import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { Pencil, Trash2, User2, Mail, Phone } from "lucide-react";

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
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/couriers")
        .then((res) => setCouriers(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [])

    const filteredCouriers = couriers.filter((courier) => 
        courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        courier.email.toUpperCase().includes(searchTerm.toUpperCase())
    )

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
            
            <input 
                type="text"
                placeholder="Buscar por nome ou email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-2 rounded mb-4 w-full md:w-1/2"
            />

            {loading ? (
                <p>Carregando...</p>
            ) : couriers.length === 0 ? (
                <p>Nenhum entregador cadatrado</p>
            ) : (
                <table className="w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Nome</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Telefone</th>
                            <th className="p-2 text-left">Ativo</th>
                            <th className="p-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCouriers.map((courier) => (
                            <tr key={courier.id} className="border-t">
                                <td className="p-2">
                                    <User2 className="w-5 h-5 py-0.5 text-gray-500" />
                                    {courier.name}
                                </td>
                                <td className="p-2">
                                    <Mail className="w-5 h-5 py-0.5 text-gray-500" />
                                    {courier.email}
                                </td>
                                <td className="p-2">
                                    <Phone className="w-5 h-5 py-0.5 text-gray-500" />
                                    {courier.phone || "-"}
                                </td>
                                <td className="p-2">
                                    {courier.active ? (
                                        <span className="text-green-600 font-semibold">Sim</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">Não</span>
                                    )}
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => navigate(`/couriers/edit/${courier.id}`)}
                                        className="text-green-600 hover:underline cursor-pointer"
                                    >
                                        <Pencil className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={async () => {
                                        const confirmDelete = confirm("Tem certeza que deseja excluir este entregador?");
                                        if (confirmDelete) {
                                            try {
                                            await api.delete(`/couriers/${courier.id}`);
                                            alert("Entregador excluído com sucesso");
                                            setCouriers((prev) => prev.filter((c) => c.id !== courier.id));
                                            } catch (error) {
                                            alert("Erro ao excluir entregador");
                                            console.error(error);
                                            }
                                        }
                                        }}
                                        className="text-red-600 ml-2 hover:underline cursor-pointer"
                                    >
                                        <Trash2 className="w-6 h-6" />
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