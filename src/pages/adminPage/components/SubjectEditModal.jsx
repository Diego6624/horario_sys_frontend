import { X, Plus } from "lucide-react";
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

  const inputStyle =
    "w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-transparent transition";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3">

        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl 
          flex flex-col max-h-[90vh] p-4 sm:p-6 overflow-hidden"
        >

          {/* HEADER */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[rgb(43,57,143)]">
                {editing ? "Editar Materia" : "Nueva Materia"}
              </h3>
              <p className="text-sm text-gray-500">
                {editing
                  ? "Modifica los datos de la materia"
                  : "Completa la información para registrar una materia"}
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">

            {/* 🔥 CONTENIDO CON SCROLL */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">

              {/* Curso */}
              <div>
                <label className="text-sm font-medium text-gray-600">Curso</label>
                <select
                  name="courseId"
                  value={form.courseId}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="" disabled>Seleccione curso</option>
                  {courses
                    .slice()
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                </select>
              </div>

              {/* Duración + Módulo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Duración (semanas)
                  </label>
                  <input
                    type="number"
                    min={1}
                    name="duracionSemanas"
                    value={form.duracionSemanas}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Módulo
                  </label>
                  <select
                    name="modulo"
                    value={form.modulo}
                    onChange={handleChange}
                    className={inputStyle}
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
                <label className="text-sm font-medium text-gray-600">Docente</label>
                <select
                  name="teacherId"
                  value={form.teacherId}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="" disabled>Seleccione docente</option>
                  {teachers
                    .slice()
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre}
                      </option>
                    ))}
                </select>
              </div>

              {/* HORARIOS */}
              {!editing && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-300">

                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700">Horarios</h4>
                    <button
                      type="button"
                      onClick={addScheduleRow}
                      className="flex items-center gap-1 text-sm bg-[rgb(43,57,143)] text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition shadow-sm cursor-pointer"
                    >
                      <Plus size={14} />
                      Agregar
                    </button>
                  </div>

                  {/* 🔥 SOLO ESTA PARTE TIENE SCROLL */}
                  <div className="max-h-60 sm:max-h-64 overflow-y-auto pr-1 space-y-3">
                    {form.schedules.length === 0 && (
                      <p className="text-sm text-gray-500">
                        Aún no hay horarios registrados.
                      </p>
                    )}

                    {form.schedules.map((s, idx) => (
                      <div
                        key={idx}
                        className="relative bg-white rounded-lg border border-gray-400 shadow-sm p-4 transition hover:shadow-md"
                      >
                        <div className="absolute left-0 top-0 h-full w-1 bg-[rgb(43,57,143)] rounded-l-4xl" />

                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm font-semibold text-gray-700">
                            Horario #{idx + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeScheduleRow(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">

                          <div className="sm:col-span-3">
                            <label className="text-xs text-gray-500">Día</label>
                            <select
                              value={s.dayOfWeek}
                              onChange={(e) =>
                                updateScheduleRow(idx, "dayOfWeek", e.target.value)
                              }
                              className={inputStyle}
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

                          <div className="sm:col-span-3">
                            <label className="text-xs text-gray-500">Hora inicio</label>
                            <input
                              type="time"
                              value={s.startTime}
                              onChange={(e) =>
                                updateScheduleRow(idx, "startTime", e.target.value)
                              }
                              className={inputStyle}
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="text-xs text-gray-500">Hora fin</label>
                            <input
                              type="time"
                              value={s.endTime}
                              onChange={(e) =>
                                updateScheduleRow(idx, "endTime", e.target.value)
                              }
                              className={inputStyle}
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="text-xs text-gray-500">Aula</label>
                            <select
                              value={s.classroomId}
                              onChange={(e) =>
                                updateScheduleRow(idx, "classroomId", e.target.value)
                              }
                              className={inputStyle}
                            >
                              <option value="" disabled>Seleccione aula</option>
                              {classrooms
                                .slice()
                                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                                .map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.nombre}
                                  </option>
                                ))}
                            </select>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 🔥 FOOTER FIJO */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 border-t bg-white">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md cursor-pointer"
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