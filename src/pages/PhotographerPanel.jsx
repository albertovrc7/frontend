import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { useEffect, useState } from "react";

export default function Photographer() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Cargando métricas...</p>;

  return (
    <div style={{ padding: "30px" }}>
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
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "180px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}
    >
      <h4 style={{ margin: 0, color: "#aaa" }}>{title}</h4>
      <p style={{ fontSize: "22px", marginTop: "10px" }}>{value}</p>
    </div>
  );
}