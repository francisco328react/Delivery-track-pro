import { Layout } from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

export function NewDelivery() {
    const [recipient, setRecipient] = useState("");
    const [status, setStatus] = useState("pendente");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await api.post("/deliveries", { recipient, status});
            alert("Entrega cadastrada com sucesso!");
            navigate("/deliveries");
        } catch (error) {
            alert("Erro ao cadastrar entrega");
            console.error(error);
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl font-semibold mb-4">Nova Entrega</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block mb-1">Destinatário</label>
                    <input 
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Status</label>
                    <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Pendente</option>
                        <option value="">Em trânsito</option>
                        <option value="">Entregue</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Cadastrar Entrega
                </button>
            </form>
        </Layout>
    )
}