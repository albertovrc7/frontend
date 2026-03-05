import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Photographer() {

  // ✅ LOS HOOKS VAN DENTRO
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://mvp-photo-production.up.railway.app/api/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data));

    fetch("https://mvp-photo-production.up.railway.app/api/monthly-revenue", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setRevenueData(data));

  }, []);

  if (!stats) return <p>Cargando métricas...</p>;

  return (
    <div
  style={{
    padding: "40px",
    background: "#f5f6fa",
    minHeight: "100vh",
    fontFamily: "system-ui"
  }}
>
      <h1>Dashboard Fotógrafo</h1>

      <h2>📊 Resumen general</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Card title="Total bodas" value={stats.total} />
        <Card title="Confirmadas" value={stats.confirmed} />
        <Card title="Pendientes" value={stats.pending} />
      </div>

      <h2 style={{ marginTop: "40px" }}>💼 Métricas de negocio</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Card title="💰 Beneficio Neto" value={stats.netProfit + " €"} />
        <Card title="🎯 Ticket Medio" value={Math.round(stats.averageTicket) + " €"} />
        <Card title="📈 Margen" value={stats.margin + " %"} />
        <Card title="💸 Ingresos Pendientes" value={stats.pendingPayments + " €"} />
        <Card title="🔄 Conversión" value={stats.conversionRate + " %"} />
      </div>

      <h2 style={{ marginTop: "50px" }}>📈 Facturación mensual</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#111" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "14px",
        minWidth: "200px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        border: "1px solid #eee"
      }}
    >
      <h4 style={{ margin: 0, color: "#666", fontSize: "14px" }}>
        {title}
      </h4>

      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "8px",
          color: "#111"
        }}
      >
        {value}
      </p>
    </div>
  );
}