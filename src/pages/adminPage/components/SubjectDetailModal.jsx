import { School, BookOpen, User, Layers, Clock, CalendarDays } from "lucide-react";

const SubjectDetailModal = ({ show, onClose, selectedSubject, schedules }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 bg-[rgb(43,57,143)] text-white">
          <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <School size={22} />
            Materia <span className="font-bold">#{selectedSubject?.id}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto grow space-y-6">

          {/* INFO GENERAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <BookOpen className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Curso</p>
                <p className="font-semibold text-gray-800">{selectedSubject?.course}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <User className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Docente</p>
                <p className="font-semibold text-gray-800">{selectedSubject?.teacher}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <Layers className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Módulo</p>
                <p className="font-semibold text-gray-800">{selectedSubject?.modulo || "—"}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <Clock className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Duración</p>
                <p className="font-semibold text-gray-800">{selectedSubject?.duracionSemanas} semanas</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 shadow-sm md:col-span-2">
              <CalendarDays className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Fecha de inicio</p>
                <p className="font-semibold text-gray-800">{selectedSubject?.fechaInicio}</p>
              </div>
            </div>
          </div>

          {/* TABLA DE SESIONES */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-600 uppercase tracking-wide">
              <CalendarDays size={18} className="text-blue-500" />
              Sesiones de clase
            </h4>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">#</th>
                    <th className="px-4 py-3 text-left font-semibold">Día</th>
                    <th className="px-4 py-3 text-left font-semibold">Horario</th>
                    <th className="px-4 py-3 text-left font-semibold">Aula</th>
                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {schedules.length > 0 ? (
                    schedules.map((sch) => (
                      <tr key={sch.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800">{sch.sesion}</td>
                        <td className="px-4 py-3 capitalize text-gray-600">{sch.dayOfWeek}</td>
                        <td className="px-4 py-3 text-gray-600">{sch.startTime} - {sch.endTime}</td>
                        <td className="px-4 py-3 text-gray-600">{sch.classroom}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              sch.estado === "Disponible"
                                ? "bg-green-100 text-green-700"
                                : sch.estado === "Ocupado"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {sch.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <CalendarDays size={28} className="text-gray-400" />
                          <p>No hay sesiones registradas</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailModal;
