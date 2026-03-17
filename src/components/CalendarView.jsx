import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const CalendarView = ({ schedules }) => {
  const events = schedules.map((s) => ({
    id: s.id,
    title: `${s.course} - ${s.teacher}`,
    start: `${s.date}T${s.startTime}`,
    end: `${s.date}T${s.endTime}`,
    backgroundColor: s.estado === "Libre" ? "#475569" : "#1e3a8a",
    borderColor: "#0f172a",
    textColor: "#fff",
    extendedProps: {
      aula: s.classroom,
      sesion: s.sesion,
      estado: s.estado,
    },
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={esLocale}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        slotMinTime="08:00:00"
        slotMaxTime="24:00:00"   
        height="auto"            
        eventContent={(arg) => (
          <div className="p-2 text-xs font-medium text-white rounded-md">
            <div>{arg.event.title}</div>
            <div className="opacity-80">{arg.event.extendedProps.aula}</div>
            <div className="italic opacity-70">{arg.event.extendedProps.estado}</div>
          </div>
        )}
      />
    </div>
  );
};

export default CalendarView;
