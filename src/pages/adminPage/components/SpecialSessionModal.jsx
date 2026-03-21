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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
          >
            <h3 className="text-lg font-bold mb-4">Nueva Clase Especial</h3>
            <form onSubmit={onSubmit} className="space-y-3">
              {/* Materia */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Materia</label>
                <select
                  value={specialForm.subjectId}
                  onChange={(e) => setSpecialForm({ ...specialForm, subjectId: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione materia</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.course} - {s.teacher}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  value={specialForm.date}
                  onChange={(e) => setSpecialForm({ ...specialForm, date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Horas */}
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
                  <input
                    type="time"
                    value={specialForm.startTime}
                    onChange={(e) => setSpecialForm({ ...specialForm, startTime: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="block text-sm font-medium text-gray-700">Hora Fin</label>
                  <input
                    type="time"
                    value={specialForm.endTime}
                    onChange={(e) => setSpecialForm({ ...specialForm, endTime: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              {/* Aula */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Aula</label>
                <select
                  value={specialForm.classroomId}
                  onChange={(e) => setSpecialForm({ ...specialForm, classroomId: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione aula</option>
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Sesión */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Sesión</label>
                <select
                  value={specialForm.sesion}
                  onChange={(e) => setSpecialForm({ ...specialForm, sesion: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione sesión</option>
                  <option value="REPROGRAMACIÓN">REPROGRAMACIÓN</option>
                  <option value="INTRODUCCIÓN">INTRODUCCIÓN</option>
                </select>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Crear
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
