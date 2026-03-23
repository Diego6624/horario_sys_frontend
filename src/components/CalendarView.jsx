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
  const [allSchedules, setAllSchedules] = useState(schedules);

  const calendarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const events = allSchedules.map((s) => {
    const subj = subjects.find(
      (sub) => sub.course === s.course && sub.teacher === s.teacher
    );

    return {
      id: `${s.id}-${subj?.id || "noSubj"}`,
      title: `${s.course} - ${s.teacher}`,
      start: `${s.date}T${s.startTime}`,
      end: `${s.date}T${s.endTime}`,
      textColor: "#fff",
      extendedProps: {
        idSubject: subj?.id,
        idSchedule: s.id,
        aula: s.classroom,
        sesion: s.sesion,
        modulo: subj?.modulo || "N/A",
        hora: `${s.startTime} - ${s.endTime}`,
        course: s.course,
        teacher: s.teacher,
        estado: s.estado,
        fechaSesion: s.date,
      },
    };
  });

  const calendarApi = calendarRef.current ? calendarRef.current.getApi() : null;

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
        eventDisplay="block"
        eventOverlap={false}
        eventMaxStack={3}
        eventDidMount={(info) => {
          if (info.el && info.el.style) {
            info.el.style.background = "transparent";
            info.el.style.border = "none";
            info.el.style.boxShadow = "none";
          }
        }}
        eventContent={(arg) => {
          const estado = arg.event.extendedProps.estado;
          let bgClass = "";
          let textColor = "text-white";

          if (estado === "Libre") {
            bgClass = "bg-gray-500 border-gray-400";
          } else if (estado === "En clase") {
            bgClass = "bg-blue-700 border-blue-800";
          } else if (estado === "Cancelado") {
            bgClass = "bg-red-400 border-red-300";
          }

          return (
            <div
              className={`p-1.5 border text-xs md:text-sm font-medium rounded-md cursor-pointer shadow-md ${bgClass} ${textColor} overflow-hidden`}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                boxSizing: "border-box",
              }}
              title={`${arg.event.title} • ${arg.event.extendedProps.hora}`}
            >
              <div className="truncate">{arg.event.title}</div>
              <div className="opacity-80 truncate text-[11px]">
                Aula: {arg.event.extendedProps.aula}
              </div>
              <div className="italic opacity-70 truncate text-[11px]">
                {arg.event.extendedProps.hora}
              </div>
              {estado === "Cancelado" && (
                <div className="mt-1 text-red-100 font-bold truncate text-[11px]">Cancelada</div>
              )}
            </div>
          );
        }}
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
