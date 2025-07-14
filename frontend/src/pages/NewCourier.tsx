import { Layout } from "../components/Layout";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { useState } from "react";

export function NewCourier() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [active, setActive] = useState(true);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await api.post("/couriers", { name, email, phone, active });
            alert("Entregador cadastrado com sucesso!");
            navigate("/couriers");
        } catch (error) {
            alert("Erro ao cadastrar entregador");
            console.error(error);
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl font-semibold mb-4">Novo Entregador</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label htmlFor="name" className="block mb-1">Nome</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-1">Telefone</label>
                    <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="active" className="block mb-1">Ativo</label>
                    <input 
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="mr-2"
                    />
                    <span>{active ? "Sim" : "Não"}</span>
                </div>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                    Cadastrar Entregador
                </button>
            </form>
        </Layout>
    )
}