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
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col text-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">

        {/* LOGO */}
        <img src="/image/logo_systematic.png" className="h-12" />

        {/* TITULO */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[rgb(43,57,143)]">
            DISTRIBUCIÓN DE AULAS
          </h1>
          <p className="text-lg md:text-2xl font-semibold text-blue-600">
            TURNO {horarios[0]?.turno || "—"}
          </p>
        </div>

        {/* RELOJ */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Hora actual</p>
          <p className="text-3xl md:text-4xl font-bold text-[rgb(43,57,143)]">
            {time.toLocaleTimeString("es-PE", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-6">

        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

      {/* FOOTER */}
      <div className="flex justify-center gap-10 py-4 bg-white border-t border-gray-200 text-sm md:text-base shadow-inner">
        <Legend color="bg-gray-400" label="Libre" />
        <Legend color="bg-blue-500" label="En clase" />
        <Legend color="bg-orange-500" label="Siguiente clase" />
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