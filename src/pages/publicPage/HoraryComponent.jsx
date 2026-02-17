import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import {
  connectSocket,
  disconnectSocket,
} from "../../services/socketService";
import bg from "/image/bg_image.png";
import { Circle } from "lucide-react";

const API_URL =
  "https://horario-sys-backend.onrender.com/api/horaries";

const HoraryComponent = () => {

  const [horarios, setHorarios] = useState([]);

  // ===============================
  // 📡 Cargar horarios
  // ===============================
  const cargarHorarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHorarios(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    }
  };

  // ===============================
  // 🔌 Socket tiempo real
  // ===============================
  useEffect(() => {

    cargarHorarios();

    connectSocket(() => {
      console.log("📡 Cambio detectado");
      cargarHorarios();
    });

    return () => disconnectSocket();

  }, []);

  return (
    <div
      className="w-screen min-h-screen text-white flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >

      {/* HEADER */}
      <div className="relative flex w-full items-center justify-center text-center py-3 border-b border-slate-400">

        {/* TÍTULO */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black">
            DISTRIBUCIÓN DE AULAS
          </h1>

          <span className="text-2xl md:text-3xl font-bold text-blue-600">
            - TURNO MAÑANA
          </span>
        </div>

        {/* ESTADOS */}
        <div className="absolute right-28 flex items-center gap-4 text-black font-medium">

          <div className="flex items-center gap-2">
            <Circle size={14} className="fill-green-500 text-green-500" />
            Libre
          </div>

          <div className="flex items-center gap-2">
            <Circle size={14} className="fill-red-500 text-red-500" />
            Ocupado
          </div>

        </div>

        {/* LOGO DERECHA */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <img
            src="/image/logo_systematic.png"
            alt="Systematic"
            className="h-10 object-contain"
          />
        </div>

      </div>

      {/* CARDS */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">
        {horarios.map((h) => (
          <CardHorarioComponent
            key={h.id}
            aula={h.numLab}
            docente={h.nameDocente || "—"}
            curso={h.nameCurso || "—"}
            horario={h.horario || "—"}
            sesion={h.numSesion || "—"}
            estado={h.status?.nombre}
          />
        ))}
      </div>
    </div>
  );
};

export default HoraryComponent;
