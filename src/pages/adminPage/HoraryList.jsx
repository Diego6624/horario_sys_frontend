import { useEffect, useState } from "react";
import { getAllSchedules } from "../../services/scheduleService";
import LoaderComponent from "../../components/LoaderComponent";
import { Calendar, User, BookOpen, Clock, List } from "lucide-react";

const HoraryList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoaderComponent />;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-2xl font-bold flex items-center gap-2"
          style={{ color: "rgb(43,57,143)" }}
        >
          <Calendar size={26} style={{ color: "rgb(47,106,174)" }} />
          Gestión de Horarios
        </h2>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((s) => (
          <div
            key={`${s.id}-${s.classroom}-${s.sesion}`}
            className="rounded-xl shadow-lg border bg-white hover:shadow-xl transition overflow-hidden"
            style={{ borderLeft: "6px solid rgb(43,57,143)" }}
          >

            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3">
              <h3 className="font-bold text-lg" style={{ color: "rgb(47,106,174)" }}>
                Aula {s.classroom}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold text-white shadow-sm ${s.estado === "Libre"
                  ? "bg-green-500"
                  : s.estado === "En clase"
                    ? "bg-red-500"
                    : "bg-gray-400"
                  }`}
              >
                {s.estado}
              </span>
            </div>

            {/* INFO */}
            <div className="p-4 space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <User size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Docente:</b> {s.teacher || "—"}</span>
              </p>
              <p className="flex items-center gap-2">
                <BookOpen size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Curso:</b> {s.course || "—"}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Horario:</b> {s.horario}</span>
              </p>
              <p className="flex items-center gap-2">
                <List size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Sesión:</b> {s.sesion || "—"}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HoraryList;
