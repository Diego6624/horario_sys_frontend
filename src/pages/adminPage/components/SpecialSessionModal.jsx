import { motion, AnimatePresence } from "framer-motion";

const SpecialSessionModal = ({
  show,
  onClose,
  onSubmit,
  specialForm,
  setSpecialForm,
  subjects,
  classrooms,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <div className="p-4 pb-1 md:p-6 md:pb-2">
              <h3 className="text-lg md:text-xl font-bold text-[rgb(43,57,143)]">
                Nueva Sesión
              </h3>
              <p className="text-sm text-gray-500">
                Completa los datos para registrar una sesión independiente.
              </p>
            </div>

            {/* FORM SCROLL */}
            <form
              onSubmit={onSubmit}
              className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4"
            >
              {/* Materia */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Materia
                </label>
                <select
                  value={specialForm.subjectId}
                  onChange={(e) =>
                    setSpecialForm({ ...specialForm, subjectId: e.target.value })
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-transparent transition"
                  required
                >
                  <option value="" disabled>Seleccione materia</option>
                  {subjects
                    .slice()
                    .sort((a, b) => a.course.localeCompare(b.course))
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        #{s.id} {s.course} - {s.teacher}
                      </option>
                    ))}
                </select>

              </div>

              {/* Fecha */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Fecha
                </label>
                <input
                  type="date"
                  value={specialForm.date}
                  onChange={(e) =>
                    setSpecialForm({ ...specialForm, date: e.target.value })
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Horas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    value={specialForm.startTime}
                    onChange={(e) =>
                      setSpecialForm({
                        ...specialForm,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Hora Fin
                  </label>
                  <input
                    type="time"
                    value={specialForm.endTime}
                    onChange={(e) =>
                      setSpecialForm({
                        ...specialForm,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Aula */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Aula
                  </label>
                  <select
                    value={specialForm.classroomId}
                    onChange={(e) =>
                      setSpecialForm({
                        ...specialForm,
                        classroomId: e.target.value,
                      })
                    }
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] transition"
                    required
                  >
                    <option value="" disabled>Seleccione aula</option>
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sesión */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Sesión
                  </label>
                  <select
                    value={specialForm.sesion}
                    onChange={(e) =>
                      setSpecialForm({ ...specialForm, sesion: e.target.value })
                    }
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] transition"
                    required
                  >
                    <option value="" disabled>Seleccione sesión</option>
                    {["INTRODUCCIÓN", "REPROGRAMACIÓN"]
                      .sort((a, b) => a.localeCompare(b))
                      .map((sesion) => (
                        <option key={sesion} value={sesion}>
                          {sesion}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* FOOTER */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md cursor-pointer"
                >
                  Crear sesión
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SpecialSessionModal;
