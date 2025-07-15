import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { api } from "../services/api";
import { PackageCheck, Truck, Users, UserX  } from "lucide-react";

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

  function Card({ title, value, color, icon }: { title: string, value: number, color: string, icon: React.ReactNode }) {
    return (
      <div className={`${color} text-white rounded-lg p-5 shadow-md flex items-center justify-between`}>
        <div>
          <p className="text-sm font-light">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <div>{icon}</div>
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
          <Card  icon={<PackageCheck className="w-8 h-8 text-white" />} title="Total de Entregas" value={summary.totalDeliveries} color="bg-blue-600"/>
          <Card  icon={<Truck className="w-8 h-8 text-white" />} title="Entregadores Ativos" value={summary.activeCouriers} color="bg-green-600"/>
          <Card  icon={<UserX  className="w-8 h-8 text-white" />} title="Inativos" value={summary.inactiveCouriers} color="bg-red-600"/>
          <Card  icon={<Users  className="w-8 h-8 text-white" />} title="Total de Entregadores" value={summary.totalCouriers} color="bg-purple-600"/>
        </div>
      )}
    </Layout>
  );
}
