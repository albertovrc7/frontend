import { useEffect, useState } from "react";
import axios from "axios";
import WeddingEditor from "../components/WeddingEditor";

export default function Weddings() {

  const [weddings, setWeddings] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);

  useEffect(() => {
    fetchWeddings();
  }, []);

  const fetchWeddings = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://mvp-photo-production.up.railway.app/api/weddings",
      { headers:{ Authorization:`Bearer ${token}`} }
    );

    setWeddings(res.data);
  };

  return (
    <div style={{padding:"30px"}}>

      <h1>💍 Bodas</h1>

      <button
        style={{
          marginTop:"10px",
          marginBottom:"20px",
          padding:"10px 15px",
          background:"#444",
          color:"#fff",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer"
        }}
        onClick={()=>alert("Aquí irá crear boda")}
      >
        Nueva boda
      </button>

      <table style={{width:"100%", borderCollapse:"collapse"}}>

        <thead>
          <tr>
            <th>Pareja</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>

          {weddings.map(w => (

            <tr
              key={w._id}
              onClick={()=>setSelectedWedding(w)}
              style={{cursor:"pointer"}}
            >
              <td>{w.couple}</td>
              <td>{new Date(w.date).toLocaleDateString()}</td>
              <td>{w.status}</td>
              <td>{w.price}€</td>
            </tr>

          ))}

        </tbody>

      </table>
      <WeddingEditor
  wedding={selectedWedding}
  onClose={()=>setSelectedWedding(null)}
/>

    </div>
  );
}