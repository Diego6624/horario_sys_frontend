import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SubjectEditModal = ({
  show,
  onClose,
  onSubmit,
  form,
  handleChange,
  editing,
  courses,
  teachers,
  classrooms,
  addScheduleRow,
  updateScheduleRow,
  removeScheduleRow,
}) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-start justify-center z-50 pt-10 pb-10 overflow-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2 }} 
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {editing ? "Editar Materia" : "Nueva Materia"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Curso</label>
              <select
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="" disabled>Seleccione curso</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>

            {/* Duración y Módulo */}
            <div className="flex w-full gap-5">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Duración (semanas)</label>
                <input
                  type="number"
                  min={1}
                  name="duracionSemanas"
                  value={form.duracionSemanas}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Módulo</label>
                <select
                  name="modulo"
                  value={form.modulo}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione módulo</option>
                  <option value="M1">Módulo 1</option>
                  <option value="M2">Módulo 2</option>
                  <option value="M3">Módulo 3</option>
                </select>
              </div>
            </div>

            {/* Docente */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Docente</label>
              <select
                name="teacherId"
                value={form.teacherId}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="" disabled>Seleccione docente</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
            </div>

            {/* Horarios dinámicos */}
            {!editing && (
              <div className="bg-gray-50 p-3 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Horarios</h4>
                  <button
                    type="button"
                    onClick={addScheduleRow}
                    className="text-sm bg-[rgb(43,57,143)] text-white px-3 py-1 rounded"
                  >
                    + Agregar horario
                  </button>
                </div>

                {form.schedules.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No hay horarios agregados. Presiona "+ Agregar horario" para añadir uno.
                  </p>
                )}

                {form.schedules.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-end bg-white p-2 rounded border">
                    <div className="col-span-3">
                      <label className="text-xs font-medium">Día</label>
                      <select
                        value={s.dayOfWeek}
                        onChange={(e) => updateScheduleRow(idx, "dayOfWeek", e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        required
                      >
                        <option value="" disabled>Seleccionar</option>
                        <option value="MONDAY">LUNES</option>
                        <option value="TUESDAY">MARTES</option>
                        <option value="WEDNESDAY">MIÉRCOLES</option>
                        <option value="THURSDAY">JUEVES</option>
                        <option value="FRIDAY">VIERNES</option>
                        <option value="SATURDAY">SÁBADO</option>
                        <option value="SUNDAY">DOMINGO</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="text-xs font-medium">Inicio</label>
                      <input
                        type="time"
                        value={s.startTime}
                        onChange={(e) => updateScheduleRow(idx, "startTime", e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-xs font-medium">Fin</label>
                      <input
                        type="time"
                        value={s.endTime}
                        onChange={(e) => updateScheduleRow(idx, "endTime", e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        required
                      />
                    </div>

                    <div className="col-span-4">
                      <label className="text-xs font-medium">Aula</label>
                      <select
                        value={s.classroomId}
                        onChange={(e) => updateScheduleRow(idx, "classroomId", e.target.value)}
                        className="w-full border rounded px-2 py-1"
                        required
                      >
                        <option value="">Seleccione aula</option>
                        {classrooms.map((c) => (
                          <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeScheduleRow(idx)}
                        className="text-red-600 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FOOTER */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700  transition cursor-pointer"
              >
                {editing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubjectEditModal;
