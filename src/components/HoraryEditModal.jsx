import { useEffect, useState } from "react";
import { updateHorary, getStatuses } from "../services/horaryService";
import { Edit3, User, BookOpen, Clock, List, CheckCircle, XCircle } from "lucide-react";

const HoraryEditModal = ({ horary, onClose, onUpdated }) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nameDocente: horary.nameDocente || "",
    nameCurso: horary.nameCurso || "",
    horario: horary.horario || "",
    numSesion: horary.numSesion || "",
    statusId: horary.status?.id || ""
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getStatuses();
        setStatuses(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatuses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        nameDocente: form.nameDocente,
        nameCurso: form.nameCurso,
        horario: form.horario,
        numSesion: form.numSesion,
        status: { id: Number(form.statusId) }
      };

      await updateHorary(horary.numLab, payload);
      await onUpdated();
      onClose();
    } catch (err) {
      console.error("Error actualizando:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-xl"
      >
        {/* Título con icono */}
        <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2" style={{ color: "rgb(43,57,143)" }}>
          <Edit3 size={22} style={{ color: "rgb(47,106,174)" }} />
          Editar Aula {horary.numLab}
        </h2>

        {/* DOCENTE */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <User size={16} style={{ color: "rgb(43,57,143)" }} /> Docente
          </label>
          <input
            name="nameDocente"
            value={form.nameDocente}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* CURSO */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <BookOpen size={16} style={{ color: "rgb(43,57,143)" }} /> Curso
          </label>
          <input
            name="nameCurso"
            value={form.nameCurso}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* HORARIO */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <Clock size={16} style={{ color: "rgb(43,57,143)" }} /> Horario
          </label>
          <input
            name="horario"
            value={form.horario}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* SESIÓN */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <List size={16} style={{ color: "rgb(43,57,143)" }} /> Sesión
          </label>
          <input
            name="numSesion"
            value={form.numSesion}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* ESTADO */}
        <div>
          <label className="text-sm font-semibold">Estado</label>
          <select
            name="statusId"
            value={form.statusId}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            {statuses.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </select>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
          >
            <XCircle size={18} /> Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-[rgb(43,57,143)] hover:bg-[rgb(47,106,174)] text-white px-4 py-2 rounded flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <CheckCircle size={18} /> Actualizar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HoraryEditModal;
