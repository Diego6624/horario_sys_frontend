import { useEffect, useState } from "react";
import { getAllHoraries } from "../../services/horaryService";
import HoraryEditModal from "./components/HoraryEditModal";
import LoaderComponent from "../../components/LoaderComponent";
import { Calendar, User, BookOpen, Clock, List, Edit } from "lucide-react";

const HoraryList = () => {
  const [horaries, setHoraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllHoraries();
      setHoraries(data);
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
        {horaries.map((h) => (
          <div
            key={h.id}
            className="rounded-xl shadow-lg border bg-white hover:shadow-xl transition overflow-hidden"
            style={{ borderLeft: "6px solid rgb(43,57,143)" }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3">
              <h3 className="font-bold text-lg" style={{ color: "rgb(47,106,174)" }}>
                Aula {h.classroom?.nombre || h.numLab}
              </h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold text-white shadow-sm ${
                  h.status?.name === "Disponible"
                    ? "bg-green-500"
                    : h.status?.name === "Ocupado"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {h.status?.name || "Sin estado"}
              </span>
            </div>

            {/* INFO */}
            <div className="p-4 space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <User size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Docente:</b> {h.schedule?.docente || "—"}</span>
              </p>
              <p className="flex items-center gap-2">
                <BookOpen size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Curso:</b> {h.schedule?.curso || "—"}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Horario:</b> {h.schedule?.startTime} - {h.schedule?.endTime}</span>
              </p>
              <p className="flex items-center gap-2">
                <List size={18} style={{ color: "rgb(43,57,143)" }} />
                <span><b>Sesión:</b> {h.schedule?.sesion || "—"}</span>
              </p>
            </div>

            {/* ACCIONES */}
            <div className="px-4 pb-4">
              <button
                onClick={() => setSelected(h)}
                className="w-full bg-[rgb(43,57,143)] text-white py-2 rounded-lg hover:bg-[rgb(47,106,174)] transition flex items-center justify-center gap-2 font-semibold shadow-md cursor-pointer"
              >
                <Edit size={18} />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <HoraryEditModal
          horary={selected}
          onClose={() => setSelected(null)}
          onUpdated={fetchData}
        />
      )}
    </>
  );
};

export default HoraryList;
