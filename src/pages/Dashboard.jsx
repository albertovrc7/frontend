import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [weddings, setWeddings] = useState([]);
  const [form, setForm] = useState({
    couple: "",
    date: "",
    status: "Pendiente",
    payment: "Pendiente",
  });

  useEffect(() => {
    fetchWeddings();
  }, []);

  const fetchWeddings = async () => {
    const res = await axios.get("http://localhost:5000/api/weddings");
    setWeddings(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/weddings", form);
    setForm({
      couple: "",
      date: "",
      status: "Pendiente",
      payment: "Pendiente",
    });
    fetchWeddings();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">📸 Wedding CRM</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nueva boda</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="couple"
              placeholder="Nombre de la pareja"
              value={form.couple}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>Pendiente</option>
              <option>Confirmada</option>
              <option>Entregada</option>
            </select>

            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option>Pendiente</option>
              <option>Señal</option>
              <option>Pagado</option>
            </select>

            <button className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80">
              Guardar
            </button>
          </form>
        </div>

        {/* Listado */}
        <div className="col-span-2 space-y-4">
          {weddings.map((wedding) => (
            <div
              key={wedding.id}
              className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {wedding.couple}
                </h3>
                <p className="text-gray-500">{wedding.date}</p>
                <p className="text-sm">
                  Estado: {wedding.status} | Pago: {wedding.payment}
                </p>
              </div>

              <Link to={`/couple/${wedding.couple}`}>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black">
                  Área privada
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;