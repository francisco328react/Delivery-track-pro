import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { Layout } from "../components/Layout";

interface Courier {
  name: string;
  email: string;
  phone?: string;
  active: boolean;
}

export function EditCourier() {
  const [form, setForm] = useState<Courier>({
    name: "",
    email: "",
    phone: "",
    active: true,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  console.log("ID -", id);

  useEffect(() => {
    if(!id) return

    api.get(`/couriers/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao carregar entregador"));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.put(`/couriers/${id}`, form);
      alert("Entregador atualizado!");
      navigate("/couriers");
    } catch (error) {
      alert("Erro ao atualizar entregador");
      console.error(error);
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Editar Entregador</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label>Nome</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Telefone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>
            <input
              name="active"
              type="checkbox"
              checked={form.active}
              onChange={handleChange}
              className="mr-2"
            />
            Ativo
          </label>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </Layout>
  );
}
