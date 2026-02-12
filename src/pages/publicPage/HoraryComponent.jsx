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
      <div className="text-center py-6 border-b border-slate-700">
        <h1 className="text-5xl font-extrabold tracking-wider">
          DISTRIBUCIÓN DE LAS AULAS DE CLASE
        </h1>
        <p className="text-2xl text-slate-300 mt-2">
          Turno Mañana
        </p>
      </div>

      {/* CARDS */}
      {/* CARDS */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
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
