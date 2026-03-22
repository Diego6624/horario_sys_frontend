import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import bg from "/image/bg_image.png";
import { Circle } from "lucide-react";
import LoaderComponent from "../../components/LoaderComponent";
import { connectSocket, disconnectSocket } from "../../services/socketService";
import { getCurrentSchedules } from "../../services/scheduleService";
import { getAllSubjectsPublic } from "../../services/subjectService";
import useClock from "../../hooks/useClock"; // 👈 importar el hook

const HoraryComponent = () => {
  const [horarios, setHorarios] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const time = useClock(); // ⏰ reloj en tiempo real

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const schs = await getCurrentSchedules();
      const subs = await getAllSubjectsPublic();
      setHorarios(schs);
      setSubjects(subs);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();

    connectSocket((data) => {
      console.log("📡 Horarios actualizados vía socket:", data);
      setHorarios(data);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div
      className="w-screen min-h-screen text-white flex flex-col bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* HEADER */}
      <div className="w-full flex justify-between items-center py-3 px-4 md:px-6 border-b border-white/20 bg-white/10 backdrop-blur-md">

        {/* LOGO */}
        <img
          src="/image/logo_systematic.png"
          alt="Systematic"
          className="h-8 md:h-12 object-contain"
        />

        {/* CENTRO (solo desktop) */}
        <div className="hidden md:flex gap-3 items-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase text-black ">
            Distribución de Aulas
          </h1>
          <span className="text-lg md:text-3xl font-bold text-blue-700 uppercase">
            TURNO {horarios[0]?.turno || "—"}
          </span>
        </div>

        {/* TURNO (solo mobile) */}
        <div className="md:hidden text-blue-700 font-bold text-lg uppercase">
          TURNO {horarios[0]?.turno || "—"}
        </div>

        {/* RELOJ MODERNO */}
        <div className="hidden sm:block text-blue-700 text-lg md:text-2xl px-4 py-2 rounded-md border bg-white/50 tracking-widest">
          {time.toLocaleTimeString("es-PE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
      </div>

      {/* CARDS */}
      <div className="grow p-2 w-auto mx-10 rounded-lg bg-white/10 backdrop-blur-sm">
        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 w-full h-full">
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
                  turno={h.turno}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="w-full flex justify-center gap-10 py-4 bg-white/10 backdrop-blur-sm text-black font-semibold">
        <div className="flex items-center gap-2">
          <Circle size={15} className="fill-gray-400 text-gray-400" />
          <span>Libre</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={15} className="fill-blue-500 text-blue-500" />
          <span>En clase</span>
        </div>
      </div>
    </div>
  );
};

export default HoraryComponent;
