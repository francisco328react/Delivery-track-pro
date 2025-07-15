import { Layout } from "../components/Layout";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import type { CourierFormData } from "../schemas/courierSchema";
import { courierSchema } from "../schemas/courierSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function NewCourier() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm<CourierFormData>({resolver: zodResolver(courierSchema)});

    async function onSubmit(data: CourierFormData) {

        try {
            await api.post("/couriers", data);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input 
                        {...register("name")}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.name && (
                        <p className="text-red-600">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        {...register("email")}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.email && (
                        <p className="text-red-600">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="phone">Telefone</label>
                    <input
                        {...register("phone")}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="active">
                        <input 
                            type="checkbox"
                            {...register("active")}
                            defaultChecked
                            className="mr-2"
                        />
                        Ativo
                    </label>
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