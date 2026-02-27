import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PhotographerPanel() {
  const [stats, setStats] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/stats`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
      .then(res => setStats(res.data))
      .catch(() => alert("Error cargando estadísticas"));
      axios.get(`${import.meta.env.VITE_API_URL}/api/monthly-revenue`)
  .then(res => setMonthlyRevenue(res.data));
  }, []);

  if (!stats) return <div className="p-10">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Dashboard Fotógrafo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card title="Total Bodas" value={stats.total} />
        <Card title="Confirmadas" value={stats.confirmed} />
        <Card title="Pendientes" value={stats.pending} />
        <Card title="Fotos Subidas" value={stats.totalPhotos} />
        <Card title="Facturación Estimada" value={`${stats.totalRevenue || 0}€`} />

      </div>
<div className="bg-white p-8 rounded-2xl shadow-xl mt-12">
  <h2 className="text-xl font-bold mb-6 text-center">
    Evolución mensual de ingresos
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={monthlyRevenue}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#000" />
    </LineChart>
  </ResponsiveContainer>
</div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-gray-500 mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}