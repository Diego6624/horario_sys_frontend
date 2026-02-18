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
      className="w-screen min-h-screen text-white flex flex-col bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* HEADER con Padding de Seguridad (Safe Zone para TV) */}
      <div className="w-full flex flex-wrap justify-between items-center py-2 px-12 border-b border-slate-300 bg-white/10 backdrop-blur-sm">
        
        {/* LOGO */}
        <div className="flex items-center">
          <img
            src="/image/logo_systematic.png"
            alt="Systematic"
            className="h-12 md:h-12 object-contain"
          />
        </div>

        {/* TÍTULO CENTRALIZADO */}
        <div className="flex flex-col items-center">
          <h1 className="text-xl md:text-4xl font-black tracking-tighter text-black uppercase">
            Distribución de Aulas
          </h1>
          <span className="text-xl md:text-3xl font-bold text-blue-700">
            TURNO {turno}
          </span>
        </div>

        {/* LEYENDA (DERECHA) */}
        <div className="flex flex-col text-black font-semibold text-md md:text-lg">
          <div className="flex items-center gap-3">
            <Circle size={20} className="fill-green-500 text-green-500" />
            Libre
          </div>
          <div className="flex items-center gap-3">
            <Circle size={20} className="fill-red-500 text-red-500" />
            Ocupado
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE CARDS - Ajustado para evitar recortes en bordes de TV */}
      <div className="flex-grow p-5 w-full max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6">
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