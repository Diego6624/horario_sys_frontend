import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ModalCalendar from "./ModalCalendar";
import { getAllSchedules } from "../services/scheduleService";

const CalendarView = ({ schedules, subjects = [], classrooms = [], teachers = [] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allSchedules, setAllSchedules] = useState(schedules);
  const [currentMonth, setCurrentMonth] = useState("");

  const calendarRef = useRef(null);

  // 👇 sincroniza allSchedules con el prop schedules
  useEffect(() => {
    setAllSchedules(schedules);
  }, [schedules]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      const date = api.getDate();
      setCurrentMonth(
        new Date(date).toLocaleDateString("es-ES", { month: "long", year: "numeric" }).toUpperCase()
      );
    }
  }, [calendarRef]);

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
        classroomId: s.classroomId,
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

  const updateMonth = () => {
    if (calendarApi) {
      const date = calendarApi.getDate();
      setCurrentMonth(
        new Date(date).toLocaleDateString("es-ES", { month: "long", year: "numeric" }).toUpperCase()
      );
    }
  };

  return (
    <div className="p-3">
      {/* Toolbar personalizada */}
      <div className="flex flex-row justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => {
              calendarApi?.prev();
              updateMonth();
            }}
            className="px-3 py-2 bg-white rounded-lg hover:bg-gray-200 transition cursor-pointer border border-gray-200"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => {
              calendarApi?.next();
              updateMonth();
            }}
            className="px-3 py-2 bg-white rounded-lg hover:bg-gray-200 transition cursor-pointer border border-gray-200"
          >
            <ArrowRight />
          </button>
          <button
            onClick={() => {
              calendarApi?.today();
              updateMonth();
            }}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Hoy
          </button>
        </div>

        <div className="hidden sm:block text-lg md:text-xl font-bold text-gray-800 tracking-wide">
          {currentMonth}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => calendarApi?.changeView("timeGridDay")}
            className="px-3 py-2 bg-white rounded-lg hover:bg-gray-200 transition cursor-pointer border border-gray-200"
          >
            Día
          </button>
          <button
            onClick={() => calendarApi?.changeView("timeGridWeek")}
            className="px-3 py-2 bg-white rounded-lg hover:bg-gray-200 transition cursor-pointer border border-gray-200"
          >
            Semana
          </button>
          {!isMobile && (
            <button
              onClick={() => calendarApi?.changeView("dayGridMonth")}
              className="px-3 py-2 bg-white rounded-lg hover:bg-gray-200 transition cursor-pointer border border-gray-200"
            >
              Mes
            </button>
          )}
        </div>
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100">
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
            hour12: false,
          }}
          slotLabelInterval="01:00"
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
          dayHeaderContent={(args) => {
            const date = args.date;
            const viewType = args.view.type;
            if (viewType === "dayGridMonth") {
              const options = { weekday: "short" };
              const formatted = new Date(date).toLocaleDateString("es-ES", options);
              return formatted.charAt(0).toUpperCase() + formatted.slice(1);
            } else {
              const options = { weekday: "short", day: "numeric" };
              const formatted = new Date(date).toLocaleDateString("es-ES", options);
              return formatted.charAt(0).toUpperCase() + formatted.slice(1);
            }
          }}
          dayHeaderClassNames="bg-indigo-50 text-indigo-700 font-semibold rounded-md px-3 py-1 mx-1 shadow-sm"
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
                  Aula: <span className="uppercase">{arg.event.extendedProps.aula}</span>
                </div>
                <div className="italic opacity-70 truncate text-[11px]">
                  {arg.event.extendedProps.hora}
                </div>
                {estado === "Cancelado" && (
                  <div className="mt-1 text-red-100 font-bold truncate text-[11px]">
                    Cancelada
                  </div>
                )}
              </div>
            );
          }}
        />

        {/* Modal separado */}
        {selectedEvent && (
          <ModalCalendar
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            refreshSchedules={refreshSchedules}
            classrooms={classrooms}
            teachers={teachers}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;
