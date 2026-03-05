import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import WeddingDetails from "./WeddingDetails";

export default function WeddingCalendar() {

  const [events, setEvents] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);

  useEffect(() => {
    const fetchWeddings = async () => {

      const res = await axios.get(
        "https://mvp-photo-production.up.railway.app/api/weddings",
        {
          headers: {
            Authorization: "Bearer demo-token"
          }
        }
      );

      const formatted = res.data.map(w => ({
        title: w.couple,
        date: w.date,
        extendedProps: w
      }));

      setEvents(formatted);
    };

    fetchWeddings();
  }, []);

  const handleEventClick = (info) => {
    setSelectedWedding(info.event.extendedProps);
  };

  return (
    <div>

      <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
        />
      </div>

      <WeddingDetails
        wedding={selectedWedding}
        onClose={() => setSelectedWedding(null)}
      />

    </div>
  );
}