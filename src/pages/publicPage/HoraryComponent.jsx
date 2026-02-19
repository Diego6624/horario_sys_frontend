import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import { connectSocket, disconnectSocket } from "../../services/socketService";
import bg from "/image/bg_image.png";
import { Circle } from "lucide-react";
import { getTurn } from "../../services/horaryService";

const API_URL = "https://horario-sys-backend.onrender.com/api/horaries";

const HoraryComponent = () => {
  const [horarios, setHorarios] = useState([]);
  const [turno, setTurno] = useState("");

  useEffect(() => {
    const cargarTurno = async () => {
      const t = await getTurn();
      setTurno(t);
    };
    cargarTurno();
  }, []);

  const cargarHorarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHorarios(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    }
  };

  useEffect(() => {
    cargarHorarios();
    connectSocket(() => {
      cargarHorarios();
    });
    return () => disconnectSocket();
  }, []);

  return (
    <div
      className="w-screen min-h-screen lg:h-full lg:w-full text-white flex flex-col bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* HEADER DINÁMICO */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-4 px-6 sm:px-12 border-b border-slate-300 bg-white/10 backdrop-blur-sm gap-4 sm:gap-0">
        
        {/* BLOQUE SUPERIOR: Logo (Izquierda) y Turno (Derecha en mobile) */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <div className="flex items-center">
            <img
              src="/image/logo_systematic.png"
              alt="Systematic"
              className="h-8 md:h-12 lg:h-15 object-contain"
            />
          </div>
          
          {/* Turno exclusivo para Mobile (Oculto en SM para arriba) */}
          <span className="sm:hidden text-lg font-extrabold text-blue-700 uppercase">
            TURNO {turno}
          </span>
        </div>

        {/* BLOQUE CENTRAL: Título y Turno (Solo visible de SM para arriba) */}
        <div className="hidden sm:flex items-center gap-2 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tighter text-black uppercase">
            Distribución de Aulas
          </h1>
          <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-700 uppercase">
            TURNO {turno}
          </span>
        </div>

        {/* LEYENDA / ESTADOS: Debajo en mobile, a la derecha en SM+ */}
        <div className="flex flex-row sm:flex-col justify-center sm:justify-end gap-6 sm:gap-1 text-black font-semibold text-sm md:text-md lg:text-lg">
          <div className="flex items-center gap-2">
            <Circle size={15} className="fill-green-500 text-green-500" />
            <span>Libre</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle size={15} className="fill-red-500 text-red-500" />
            <span>Ocupado</span>
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE CARDS */}
      <div className="grow p-1.5 lg:p-5 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 w-full h-full">
          {horarios.map((h) => (
            <CardHorarioComponent
              key={h.id}
              aula={h.numLab}
              docente={h.nameDocente || "—"}
              curso={h.nameCurso || "—"}
              horario={h.horario || "—"}
              sesion={h.numSesion || "—"}
              estado={h.status?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoraryComponent;