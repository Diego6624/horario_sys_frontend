import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ModalCalendar from "./ModalCalendar";
import { getAllSchedules } from "../services/scheduleService";

const CalendarView = ({ schedules, subjects = [] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allSchedules, setAllSchedules] = useState(schedules); // ✅ para refrescar

  const calendarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Filtramos cancelados
  const events = allSchedules.map((s) => {
    const subj = subjects.find(sub => sub.course === s.course);
    return {
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
        modulo: subj?.modulo || "N/A",
        hora: `${s.startTime} - ${s.endTime}`,
        course: s.course,
        teacher: s.teacher,
        id: s.id,
        estado: s.estado,
        fechaSesion: s.date
      },
    };
  });

  const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;

  // ✅ función para refrescar horarios
  const refreshSchedules = async () => {
    const schs = await getAllSchedules();
    setAllSchedules(schs);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 md:p-6">
      {/* Toolbar personalizada */}
      <div className="flex flex-row justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          <button onClick={() => calendarApi?.prev()} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            <ArrowLeft />
          </button>
          <button onClick={() => calendarApi?.next()} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            <ArrowRight />
          </button>
          <button onClick={() => calendarApi?.today()} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
            Hoy
          </button>
        </div>

        <div className="hidden sm:block text-lg md:text-xl font-bold text-gray-800">
          CALENDARIO
        </div>

        <div className="flex gap-2">
          <button onClick={() => calendarApi?.changeView("timeGridDay")} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            Día
          </button>
          <button onClick={() => calendarApi?.changeView("timeGridWeek")} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            Semana
          </button>
          {!isMobile && (
            <button onClick={() => calendarApi?.changeView("dayGridMonth")} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
              Mes
            </button>
          )}
        </div>
      </div>

      {/* Calendario */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
        locale={esLocale}
        events={events}
        allDaySlot={false}
        headerToolbar={false}
        slotMinTime="08:00:00"
        slotMaxTime="24:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: false,
        }}
        height={isMobile ? "85vh" : "auto"}
        expandRows={true}
        eventClick={(info) => {
          setSelectedEvent(info.event.extendedProps);
        }}
        eventContent={(arg) => (
          <div className="p-2 text-xs md:text-sm font-medium text-white rounded-md cursor-pointer">
            <div>{arg.event.title}</div>
            <div className="opacity-80">{arg.event.extendedProps.aula}</div>
            <div className="italic opacity-70">{arg.event.extendedProps.hora}</div>
            {arg.event.extendedProps.estado === "Cancelado" && (
              <div className="mt-1 text-red-300 font-bold">Cancelada</div>
            )}
          </div>
        )}

      />

      {/* Modal separado */}
      <ModalCalendar
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        refreshSchedules={refreshSchedules}
      />
    </div>
  );
};

export default CalendarView;
