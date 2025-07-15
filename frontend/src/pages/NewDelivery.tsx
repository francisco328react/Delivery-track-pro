import { Layout } from "../components/Layout";
import { useNavigate } from "react-router";
import { api } from "../services/api";
import { deliverySchema } from "../schemas/deliverySchema";
import type { DeliveryFormData } from "../schemas/deliverySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function NewDelivery() {
    const { register, handleSubmit, formState: {errors}} = useForm<DeliveryFormData>({resolver: zodResolver(deliverySchema)});
    const navigate = useNavigate();

    async function onSubmit(data: DeliveryFormData) {

        try {
            await api.post("/deliveries", data);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <div>
                    <label>Destinatário</label>
                    <input 
                        {...register("recipient")}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.recipient && (
                        <p className="text-red-600 text-sm">{errors.recipient.message}</p>
                    )}
                </div>
                <div>
                    <label>Status</label>
                    <select 
                        {...register("status")}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="pendente">Pendente</option>
                        <option value="em trânsito">Em trânsito</option>
                        <option value="entregue">Entregue</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-600 text-sm">{errors.status.message}</p>
                    )}
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