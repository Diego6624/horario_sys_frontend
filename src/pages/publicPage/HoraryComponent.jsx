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

  // Día actual
  const diasSemana = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
  const hoy = diasSemana[new Date().getDay()];

  // Cargar horarios actuales con estado
  const cargarHorarios = async () => {
    try {
      setLoading(true);
      const data = await getCurrentSchedules(); // ahora usamos ScheduleViewDTO
      setHorarios(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Suscripción al socket
  useEffect(() => {
    cargarHorarios();
    connectSocket(() => {
      cargarHorarios();
    });
    return () => disconnectSocket();
  }, []);

  // Filtrar horarios del día actual
  const horariosHoy = horarios.filter(h => h.dayOfWeek === hoy);

  return (
    <div
      className="w-screen min-h-screen lg:h-full lg:w-full text-white flex flex-col bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* HEADER */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-1.5 px-6 sm:px-12 border-b border-slate-300 bg-white/10 backdrop-blur-sm gap-2 sm:gap-0">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <div className="flex items-center">
            <img
              src="/image/logo_systematic.png"
              alt="Systematic"
              className="h-8 md:h-12 lg:h-15 object-contain"
            />
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-center">
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold tracking-tighter text-black uppercase">
            Distribución de Aulas
          </h1>
        </div>

        <div className="flex flex-row sm:flex-col justify-center sm:justify-end gap-6 sm:gap-1 text-black font-semibold text-sm sm:text-md lg:text-lg">
          <div className="sm:hidden flex items-center gap-2">
            <Circle size={12} className="fill-green-500 text-green-500" />
            <span>Libre</span>
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <Circle size={12} className="fill-red-500 text-red-500" />
            <span>Ocupado</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Circle size={15} className="fill-green-500 text-green-500" />
            <span>Libre</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Circle size={15} className="fill-red-500 text-red-500" />
            <span>Ocupado</span>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="grow p-1.5 lg:p-5 w-full">
        {loading ? (
          <LoaderComponent />
        ) : horariosHoy.length === 0 ? (
          <p className="text-center text-lg text-blue-500 font-semibold mt-10">
            No hay clases programadas para hoy ({hoy}).
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 w-full h-full">
            {horariosHoy.map((h) => (
              <CardHorarioComponent
                key={h.id}
                aula={h.classroom}
                docente={h.teacher}
                curso={h.course}
                horario={h.horario}
                sesion={h.sesion}
                estado={h.estado}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoraryComponent;
