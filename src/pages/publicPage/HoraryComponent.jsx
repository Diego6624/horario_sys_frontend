import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import {
  connectSocket,
  disconnectSocket,
} from "../../services/socketService";
import bg from "/image/bg_image.png";
import { Circle } from "lucide-react";
import { getTurn } from "../../services/horaryService";

const API_URL =
  "https://horario-sys-backend.onrender.com/api/horaries";

const HoraryComponent = () => {

  const [horarios, setHorarios] = useState([]);
  const [turno, setTurno] = useState("");
  // ===============================
  // Turno automatico
  // ===============================
  useEffect(() => {
    const cargarTurno = async () => {
      const t = await getTurn();
      setTurno(t);
    };

    cargarTurno();
  }, []);


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
      <div className="w-full grid grid-cols-3 items-center py-3 border-b border-slate-400 px-6">

        {/* IZQUIERDA — LOGO */}
        <div className="flex items-center">
          <img
            src="/image/logo_systematic.png"
            alt="Systematic"
            className="h-10 md:h-12 object-contain"
          />
        </div>

        {/* CENTRO — TÍTULO */}
        <div className="flex justify-center items-center text-center gap-2">

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black whitespace-nowrap">
            DISTRIBUCIÓN DE AULAS
          </h1>

          <span className="text-2xl md:text-3xl font-bold text-blue-600 whitespace-nowrap">
            - TURNO {turno}
          </span>

        </div>

        {/* DERECHA — ESTADOS */}
        <div className="flex justify-end items-center gap-6 text-black font-medium">

          <div className="flex items-center gap-2">
            <Circle size={16} className="fill-green-500 text-green-500" />
            Libre
          </div>

          <div className="flex items-center gap-2">
            <Circle size={16} className="fill-red-500 text-red-500" />
            Ocupado
          </div>

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
            estado={h.status?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default HoraryComponent;
