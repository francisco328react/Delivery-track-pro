import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { api } from "../services/api";

interface SummaryData {
  totalDeliveries: number;
  totalCouriers: number;
  activeCouriers: number;
  inactiveCouriers: number;
}

export function Dashboard() {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    api.get("/dashboard")
      .then((res) => setSummary(res.data))
      .catch(() => alert("Erro ao carregar dashboard"));
  }, [])

  function Card({ title, value, color }: { title: string, value: number, color: string }) {
    return (
      <div className={`${color} text-white rounded-lg p-6 shadow-md`}>
        <p className="text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Resumo do Sistema</h1>

      {!summary ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total de Entregas" value={summary.totalDeliveries} color="bg-blue-600"/>
          <Card title="Entregadores Ativos" value={summary.activeCouriers} color="bg-green-600"/>
          <Card title="Inativos" value={summary.inactiveCouriers} color="bg-red-600"/>
          <Card title="Total de Entregadores" value={summary.totalCouriers} color="bg-purple-600"/>
        </div>
      )}
    </Layout>
  );
}
