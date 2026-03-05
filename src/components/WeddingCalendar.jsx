import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function WeddingCalendar() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/weddings`)
      .then(res => {

        const formatted = res.data.map(w => ({
          title: w.couple,
          date: w.date,
          extendedProps: w
        }));

        setEvents(formatted);
      });

  }, []);

  const handleEventClick = (info) => {

    const wedding = info.event.extendedProps;

    alert(
      `
Pareja: ${wedding.couple}
Fecha: ${wedding.date}
Estado: ${wedding.status}
Pago: ${wedding.payment}
Fotos: ${wedding.photos.length}
      `
    );

  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
}import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function WeddingCalendar() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/weddings`)
      .then(res => {

        const formatted = res.data.map(w => ({
          title: w.couple,
          date: w.date,
          extendedProps: w
        }));

        setEvents(formatted);
      });

  }, []);

  const handleEventClick = (info) => {

    const wedding = info.event.extendedProps;

    alert(
      `
Pareja: ${wedding.couple}
Fecha: ${wedding.date}
Estado: ${wedding.status}
Pago: ${wedding.payment}
Fotos: ${wedding.photos.length}
      `
    );

  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
}