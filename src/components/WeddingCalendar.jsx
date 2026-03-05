import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function WeddingCalendar() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await axios.get("https://mvp-photo-production.up.railway.app/api/weddings", {
          headers: {
            Authorization: "Bearer demo-token"
          }
        });

        const formatted = res.data.map(w => ({
          title: w.couple,
          date: w.date,
          extendedProps: w
        }));

        setEvents(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeddings();
  }, []);

  const handleEventClick = (info) => {
    const w = info.event.extendedProps;

    alert(`
Pareja: ${w.couple}
Fecha: ${w.date}
Estado: ${w.status}
Señal pagada: ${w.depositPaid ? "Sí" : "No"}
Precio: ${w.price}€
    `);
  };

  return (
    <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
}