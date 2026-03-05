import React from "react";

export default function WeddingDetails({ wedding, onClose }) {

  if (!wedding) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>

        <h2>{wedding.couple}</h2>

        <p><strong>Fecha:</strong> {wedding.date}</p>
        <p><strong>Estado:</strong> {wedding.status}</p>
        <p><strong>Precio:</strong> {wedding.price}€</p>
        <p><strong>Señal pagada:</strong> {wedding.depositPaid ? "Sí" : "No"}</p>

        <button onClick={onClose} style={buttonStyle}>
          Cerrar
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
  width:"400px"
};

const buttonStyle = {
  marginTop:"20px",
  padding:"10px 20px",
  cursor:"pointer"
};