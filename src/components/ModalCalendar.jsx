import {
  User,
  MapPin,
  Clock,
  BookText,
  ListOrdered,
  X,
  CalendarDays,
  Edit2,
  Save,
} from "lucide-react";
import { useState, useEffect } from "react";
import { updateSchedule, updateScheduleEstado } from "../services/scheduleService";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ModalCalendar = ({ event, onClose, refreshSchedules, classrooms = [] }) => {
  if (!event) return null;

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    id: event.idSchedule || event.id || null,
    subjectId: event.idSubject || event.subjectId || null,
    classroomId: event.classroomId || "",
    date: event.fechaSesion ? new Date(event.fechaSesion).toISOString().split("T")[0] : "",
    startTime: event.hora ? event.hora.split(" - ")[0] : "",
    endTime: event.hora ? event.hora.split(" - ")[1] : "",
    sesion: event.sesion || "",
    modulo: event.modulo || "",
  });

  useEffect(() => {
    setForm({
      id: event.idSchedule || event.id || null,
      subjectId: event.idSubject || event.subjectId || null,
      classroomId: event.classroomId || "",
      date: event.fechaSesion ? new Date(event.fechaSesion).toISOString().split("T")[0] : "",
      startTime: event.hora ? event.hora.split(" - ")[0] : "",
      endTime: event.hora ? event.hora.split(" - ")[1] : "",
      sesion: event.sesion || "",
      modulo: event.modulo || "",
    });
  }, [event]);


  const handleChangeEstado = async (nuevoEstado) => {
    try {
      setLoading(true);
      await updateScheduleEstado(form.id, nuevoEstado);
      await refreshSchedules();
      toast.success(`Estado actualizado a "${nuevoEstado}"`);
      onClose();
    } catch (err) {
      console.error("Error actualizando clase:", err);
      toast.error("Error actualizando estado de la clase");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        subjectId: Number(form.subjectId),
        classroomId: Number(form.classroomId),
        date: form.date || null,
        dayOfWeek: form.date ? new Date(form.date).toLocaleDateString("en-US", { weekday: "long" }).toUpperCase() : undefined,
        startTime: form.startTime,
        endTime: form.endTime,
        sesion: form.sesion,
      };

      await updateSchedule(form.id, payload);
      await refreshSchedules();
      toast.success("Sesión actualizada correctamente");
      setEditMode(false);
      onClose();
    } catch (err) {
      console.error("Error actualizando sesión:", err);
      toast.error("Error actualizando sesión");
    } finally {
      setLoading(false);
    }
  };

  const isCancelado = event.estado === "Cancelado";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          {/* HEADER */}
          <div
            className={`flex justify-between items-center px-6 py-4 ${isCancelado ? "bg-red-700" : "bg-[rgb(43,57,143)]"}`}
          >
            <div className="flex items-center gap-3">
              <CalendarDays size={22} className="text-white" />

              <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  {event.course ? event.course.toUpperCase() : "—"}
                </h2>
              </div>
              <div className="flex gap-1 items-center text-center bg-white px-2 py-0.5 rounded">
                <p className="font-medium text-md">#{event.idSubject || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-white/20 text-white border-white/30">
                {isCancelado ? "Cancelada" : "Activa"}
              </span>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">
            {/* HEADER BODY */}
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold text-gray-700">
                Información de la sesión
              </h3>

              <button
                onClick={() => setEditMode((v) => !v)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition shadow-sm cursor-pointer
                  ${editMode
                    ? "bg-gray-800 text-white hover:bg-gray-900"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {editMode ? <X size={16} /> : <Edit2 size={16} />}
                {editMode ? "Cancelar" : "Editar"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Docente (no editable aquí) */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <User className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Docente</p>
                  <p className="font-semibold text-gray-800">{event.teacher}</p>
                </div>
              </div>

              {/* Aula */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <MapPin className="text-blue-500" size={20} />
                <div className="w-full">
                  <p className="text-xs text-gray-500">Aula</p>
                  {editMode ? (
                    <select
                      value={form.classroomId}
                      onChange={(e) => setForm({ ...form, classroomId: e.target.value })}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase"
                    >
                      <option value="" disabled>Seleccione aula</option>
                      {classrooms.map((c) => (
                        <option key={c.id} value={c.id} className="uppercase">
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-semibold text-gray-800 uppercase">{event.aula}</p>
                  )}
                </div>
              </div>

              {/* Módulo */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <BookText className="text-blue-500" size={20} />
                <div className="w-full">
                  <p className="text-xs text-gray-500">Módulo</p>
                    <p className="font-semibold text-gray-800">{event.modulo || "N/A"}</p>
                </div>
              </div>

              {/* Sesión */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <ListOrdered className="text-blue-500" size={20} />
                <div className="w-full">
                  <p className="text-xs text-gray-500">Sesión</p>
                  {editMode ? (
                    <input
                      value={form.sesion}
                      onChange={(e) => setForm({ ...form, sesion: e.target.value })}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="S01 / REPROGRAMACIÓN / INTRODUCCIÓN"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">{event.sesion || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Fecha de la sesión */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <CalendarDays className="text-blue-500" size={20} />
                <div className="w-full">
                  <p className="text-xs text-gray-500">Fecha de sesión</p>
                  {editMode ? (
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">
                      {form.date || "—"}
                    </p>
                  )}
                </div>
              </div>

              {/* Horario */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <Clock className="text-blue-500" size={20} />
                <div className="w-full">
                  <p className="text-xs text-gray-500">Horario</p>
                  {editMode ? (
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={form.startTime}
                        onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="time"
                        value={form.endTime}
                        onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  ) : (
                    <p className="font-semibold text-gray-800">{event.hora}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-6 py-4 border-t border-gray-300 bg-gray-50">
            {/* SWITCH */}
            <div className="flex items-center space-x-3">
              <Switch
                id="estado-clase"
                checked={!isCancelado}
                disabled={loading}
                onCheckedChange={async (checked) => {
                  const nuevoEstado = checked ? "Libre" : "Cancelado";
                  await handleChangeEstado(nuevoEstado);
                }}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500 cursor-pointer"
              />

              <Label htmlFor="estado-clase" className="text-sm font-medium">
                {loading ? "Actualizando..." : !isCancelado ? "Clase activa" : "Clase cancelada"}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              {editMode ? (
                null
              ) : <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition flex items-center gap-2 cursor-pointer"
                >
                  <X size={18} />
                  Cerrar
                </button>}
              {editMode ? (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[rgb(43,57,143)] text-white hover:bg-indigo-700 transition flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} />
                  Guardar
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModalCalendar;
