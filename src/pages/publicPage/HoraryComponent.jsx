import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import LoaderComponent from "../../components/LoaderComponent";
import { connectSocket, disconnectSocket } from "../../services/socketService";
import { getCurrentSchedules } from "../../services/scheduleService";
import { getAllSubjectsPublic } from "../../services/subjectService";
import useClock from "../../hooks/useClock";

const HoraryComponent = () => {
  const [horarios, setHorarios] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const time = useClock();

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const schs = await getCurrentSchedules();
      const subs = await getAllSubjectsPublic();
      setHorarios(schs);
      setSubjects(subs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();

    connectSocket((data) => {
      setHorarios(data);
    });

    return () => disconnectSocket();
  }, []);

  return (
    <div className="relative w-screen min-h-screen flex flex-col text-gray-800">

      {/* 🌄 IMAGEN DE FONDO */}
      <div className="absolute inset-0 bg-[url('/image/bg_image.png')] bg-cover bg-center"></div>

      {/* 🔥 CONTENIDO */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-xs shadow-xs">

          {/* MOBILE HEADER */}
          <div className="flex md:hidden justify-between items-center px-4 py-3">
            <img src="/image/logo_systematic.png" className="h-8 sm:h-12" />

            <p className="text-lg font-bold text-blue-600 uppercase">
              TURNO {horarios[0]?.turno || "—"}
            </p>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-4">

            <img src="/image/logo_systematic.png" className="h-10 sm:h-14" />

            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[rgb(43,57,143)]">
                DISTRIBUCIÓN DE AULAS
              </h1>
              <p className="text-sm sm:text-lg md:text-xl font-semibold text-blue-600 uppercase">
                TURNO {horarios[0]?.turno || "—"}
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs sm:text-sm text-gray-500">Hora actual</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(43,57,143)]">
                {time.toLocaleTimeString("es-PE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>

          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 p-6 pt-3">

          {/* LEYENDA MOBILE */}
          <div className="flex lg:hidden justify-center font-semibold  gap-4 py-3 text-xs sm:text-sm rounded-xl mb-4">
            <Legend color="bg-gray-400" label="Libre" />
            <Legend color="bg-blue-500" label="En clase" />
            <Legend color="bg-orange-500" label="Siguiente" />
          </div>

          {loading ? (
            <LoaderComponent />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {horarios.map((h) => {
                const subject = subjects.find((s) => s.course === h.course);

                return (
                  <CardHorarioComponent
                    key={h.id || h.classroom}
                    aula={h.classroom}
                    docente={h.estado === "Cancelado" ? "—" : h.teacher || "—"}
                    curso={h.estado === "Cancelado" ? "—" : h.course || "—"}
                    horario={
                      h.estado === "Cancelado"
                        ? "—"
                        : h.startTime
                          ? `${h.startTime} - ${h.endTime}`
                          : "—"
                    }
                    sesion={
                      h.estado === "Cancelado"
                        ? "—"
                        : subject?.modulo && h.sesion
                          ? `${subject.modulo} - ${h.sesion}`
                          : h.sesion || "—"
                    }
                    estado={h.estado}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER DESKTOP */}
        <div className="hidden lg:flex flex-wrap justify-center font-semibold gap-4 sm:gap-8 md:gap-10 py-3 sm:py-4 bg-white/10 backdrop-blur-xs border-t border-gray-200 text-xs sm:text-sm md:text-base shadow-inner">
          <Legend color="bg-gray-400" label="Libre" />
          <Legend color="bg-blue-500" label="En clase" />
          <Legend color="bg-orange-500" label="Siguiente clase" />
        </div>

      </div>
    </div>
  );
};

export default HoraryComponent;

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-4 h-4 rounded-full ${color}`} />
    <span className="text-gray-600">{label}</span>
  </div>
);