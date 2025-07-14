import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { Layout } from "../components/Layout";

interface Delivery {
  recipient: string;
  status: string;
}

export function EditDelivery() {
  const [form, setForm] = useState<Delivery>({
    recipient: "",
    status: "pendente",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/deliveries/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao carregar entrega"));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.put(`/deliveries/${id}`, form);
      alert("Entrega atualizada!");
      navigate("/deliveries");
    } catch (error) {
      alert("Erro ao atualizar entrega");
      console.error(error);
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Editar Entrega</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label>Destinatário</label>
          <input
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="pendente">Pendente</option>
            <option value="em trânsito">Em trânsito</option>
            <option value="entregue">Entregue</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </Layout>
  );
}
