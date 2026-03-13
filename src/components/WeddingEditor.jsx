import { useState } from "react";

export default function WeddingEditor({ wedding, onClose }) {

  const [form, setForm] = useState(wedding);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveWedding = async () => {

    const token = localStorage.getItem("token");

    await fetch(
      `https://mvp-photo-production.up.railway.app/api/weddings/${wedding._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      }
    );

    onClose();
    window.location.reload();

  };

  if (!wedding) return null;

  return (

    <div style={overlayStyle}>

      <div style={modalStyle}>

        <h2>Editar boda</h2>

        <label>Pareja</label>
        <input
          name="couple"
          value={form.couple}
          onChange={handleChange}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="date"
          value={form.date.slice(0,10)}
          onChange={handleChange}
        />

        <label>Estado</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="lead">Lead</option>
          <option value="booked">Reservada</option>
          <option value="shot">Realizada</option>
          <option value="delivered">Entregada</option>
        </select>

        <label>Precio</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <button onClick={saveWedding}>
          Guardar
        </button>

        <button onClick={onClose}>
          Cancelar
        </button>

      </div>

    </div>

  );

}

const overlayStyle = {
  position: "fixed",
  top:0,
  left:0,
  width:"100%",
  height:"100%",
  background:"rgba(0,0,0,0.4)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const modalStyle = {
  background:"white",
  padding:"30px",
  borderRadius:"10px",
  width:"400px",
  display:"flex",
  flexDirection:"column",
  gap:"10px"
};