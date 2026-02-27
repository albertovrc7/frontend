import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

localStorage.setItem("token", res.data.token);

export default function Login() {
  const [couple, setCouple] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { couple, password }
      );

      localStorage.setItem("loggedCouple", res.data.couple);

      navigate(`/couple/${res.data.couple}`);
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Área privada
        </h1>

        <input
          type="text"
          placeholder="Nombre pareja (ej: laura-juan)"
          className="w-full mb-4 p-2 border rounded-lg"
          value={couple}
          onChange={(e) => setCouple(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}