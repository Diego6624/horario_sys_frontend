import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import { connectSocket, disconnectSocket } from "../../services/socketService";
import bg from "/image/bg_image.png";
import { Circle } from "lucide-react";
import { getCurrentSchedules } from "../../services/scheduleService";
import LoaderComponent from "../../components/LoaderComponent";

const HoraryComponent = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarHorarios = async () => {
    try {
      setLoading(true);
      const data = await getCurrentSchedules(); 
      setHorarios(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🔹 Carga inicial vía fetch
    cargarHorarios();

    // 🔹 Suscripción al socket
    connectSocket((data) => {
      // Usar directamente lo que manda el backend
      setHorarios(data);
      setLoading(false);
    });

    return () => disconnectSocket();
  }, []);

  return (
    <div
      className="w-screen min-h-screen lg:h-full lg:w-full text-white flex flex-col bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* HEADER */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-1.5 px-6 sm:px-12 border-b border-slate-300 bg-white/10 backdrop-blur-sm gap-2 sm:gap-0">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <img
            src="/image/logo_systematic.png"
            alt="Systematic"
            className="h-8 md:h-12 lg:h-15 object-contain"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 text-center">
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold tracking-tighter text-black uppercase">
            Distribución de Aulas
          </h1>
          <span className="text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-blue-700 uppercase">
            TURNO {horarios[0]?.turno || "—"}
          </span>
        </div>

        <div className="flex flex-row sm:flex-col justify-center sm:justify-end gap-6 sm:gap-1 text-black font-semibold text-sm sm:text-md lg:text-lg">
          <div className="sm:hidden flex items-center gap-2">
            <Circle size={12} className="fill-gray-400 text-gray-400" />
            <span>Libre</span>
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <Circle size={12} className="fill-blue-500 text-blue-500" />
            <span>En clase</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Circle size={15} className="fill-gray-400 text-gray-400" />
            <span>Libre</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Circle size={15} className="fill-blue-500 text-blue-500" />
            <span>En clase</span>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="grow p-1.5 lg:p-5 w-full">
        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 w-full h-full">
            {horarios.map((h) => (
              <CardHorarioComponent
                key={h.id || h.classroom}
                aula={h.classroom}
                docente={h.teacher || "—"}
                curso={h.course || "—"}
                horario={h.startTime !== "—" ? `${h.startTime} - ${h.endTime}` : "—"}
                sesion={h.sesion || "—"}
                estado={h.estado}
                turno={h.turno}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoraryComponent;
