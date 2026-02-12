import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import {
  connectSocket,
  disconnectSocket,
} from "../../services/socketService";

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
    <div className="w-screen min-h-screen bg-slate-900 text-white flex flex-col">

      {/* HEADER */}
      <div className="flex w-full items-center justify-center text-center py-2 border-b border-slate-700 gap-2">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          DISTRIBUCIÓN DE LAS AULAS
        </h1>
        <p className="text-2xl md:text-3xl font-medium tracking-wide">-</p>
        <p className="text-2xl md:text-3xl text-slate-300">
          TURNO MAÑANA
        </p>
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
          />
        ))}
      </div>

    </div>
  );
};

export default HoraryComponent;
