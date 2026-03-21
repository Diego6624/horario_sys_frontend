import { BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TeacherSubjectsModal = ({ show, onClose, selectedTeacher, subjects }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
        >

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 bg-[rgb(43,57,143)] text-white">
            <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
              <BookOpen size={22} />
              Docente: <span className="font-bold">{selectedTeacher?.nombre}</span>
            </h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-xl transition"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 overflow-y-auto grow">
            <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-600 uppercase tracking-wide">
              <Layers size={18} className="text-blue-500" />
              Cursos asignados
            </h4>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">#</th>
                    <th className="px-4 py-3 text-left font-semibold">Curso</th>
                    <th className="px-4 py-3 text-left font-semibold">Módulo</th>
                    <th className="px-4 py-3 text-left font-semibold">Duración</th>
                    <th className="px-4 py-3 text-left font-semibold">Inicio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subjects.length > 0 ? (
                    subjects.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800">{s.id}</td>
                        <td className="px-4 py-3 font-medium text-gray-700">{s.course}</td>
                        <td className="px-4 py-3 text-gray-600">{s.modulo || "—"}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {s.duracionSemanas ? `${s.duracionSemanas} semanas` : "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{s.fechaInicio || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Layers size={28} className="text-gray-400" />
                          <p>No tiene cursos asignados</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition font-medium cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeacherSubjectsModal;