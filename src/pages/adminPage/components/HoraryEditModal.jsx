import { useState } from "react";
import { updateSchedule } from "../../../services/scheduleService"; // necesitas crear este método en tu service
import { Edit3, User, BookOpen, Clock, List, CheckCircle, XCircle } from "lucide-react";

const HoraryEditModal = ({ schedule, onClose, onUpdated }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    dayOfWeek: schedule.dayOfWeek || "",
    startTime: schedule.startTime || "",
    endTime: schedule.endTime || "",
    sesion: schedule.sesion || "",
    classroomId: schedule.classroomId || "",
    subjectId: schedule.subjectId || ""
  });

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
        dayOfWeek: form.dayOfWeek,
        startTime: form.startTime,
        endTime: form.endTime,
        sesion: form.sesion,
        classroomId: Number(form.classroomId),
        subjectId: Number(form.subjectId)
      };
      await updateSchedule(schedule.id, payload);
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
        {/* Título */}
        <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2" style={{ color: "rgb(43,57,143)" }}>
          <Edit3 size={22} style={{ color: "rgb(47,106,174)" }} />
          Editar Bloque
        </h2>

        {/* DOCENTE / CURSO (solo lectura, vienen del Subject) */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <User size={16} style={{ color: "rgb(43,57,143)" }} /> Docente
          </label>
          <input
            value={schedule.teacher}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <BookOpen size={16} style={{ color: "rgb(43,57,143)" }} /> Curso
          </label>
          <input
            value={schedule.course}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />
        </div>

        {/* Editable */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <Clock size={16} style={{ color: "rgb(43,57,143)" }} /> Inicio
          </label>
          <input
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Fin</label>
          <input
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold flex items-center gap-1">
            <List size={16} style={{ color: "rgb(43,57,143)" }} /> Sesión
          </label>
          <input
            name="sesion"
            value={form.sesion}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
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
