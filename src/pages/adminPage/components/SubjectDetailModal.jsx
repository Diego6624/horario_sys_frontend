import { School, BookOpen, User, Layers, Clock, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SubjectDetailModal = ({ show, onClose, selectedSubject, schedules }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-[rgb(43,57,143)] text-white">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold flex items-center gap-2">
                <School size={20} />
                <span>Materia</span>
              </h3>

              <div className="flex gap-1 items-center bg-white text-[rgb(43,57,143)] px-2 py-0.5 rounded text-xs sm:text-sm">
                <p className="font-medium">#{selectedSubject?.id || "—"}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-lg sm:text-xl transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="p-4 sm:p-6 overflow-y-auto grow space-y-5 sm:space-y-6">

            {/* INFO GENERAL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-sm">
                <BookOpen className="text-blue-500" size={18} />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Curso</p>
                  <p className="font-semibold text-gray-800 truncate">
                    {selectedSubject?.course}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-sm">
                <User className="text-blue-500" size={18} />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Docente</p>
                  <p className="font-semibold text-gray-800 truncate">
                    {selectedSubject?.teacher}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-sm">
                <Layers className="text-blue-500" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Módulo</p>
                  <p className="font-semibold text-gray-800">
                    {selectedSubject?.modulo || "—"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-sm">
                <Clock className="text-blue-500" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Duración</p>
                  <p className="font-semibold text-gray-800">
                    {selectedSubject?.duracionSemanas} semanas
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-sm sm:col-span-2">
                <CalendarDays className="text-blue-500" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Fecha de inicio</p>
                  <p className="font-semibold text-gray-800">
                    {selectedSubject?.fechaInicio}
                  </p>
                </div>
              </div>
            </div>

            {/* TABLA DE SESIONES */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-3 flex items-center gap-2 text-gray-600 uppercase tracking-wide">
                <CalendarDays size={16} className="text-blue-500" />
                Sesiones de clase
              </h4>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-150 w-full text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">#</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Horario</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Aula</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Día</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">Fecha</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {schedules.length > 0 ? (
                      schedules.map((sch) => (
                        <tr key={sch.id} className="hover:bg-gray-50 transition">
                          <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium text-gray-800">
                            {sch.sesion}
                          </td>

                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap">
                            {sch.startTime} - {sch.endTime}
                          </td>

                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap uppercase">
                            {sch.classroom}
                          </td>

                          <td className="px-3 sm:px-4 py-2 sm:py-3 capitalize text-gray-600">
                            {sch.dayOfWeek}
                          </td>

                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap">
                            {sch.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 sm:py-10 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <CalendarDays size={24} className="text-gray-400" />
                            <p className="text-sm">No hay sesiones registradas</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubjectDetailModal;