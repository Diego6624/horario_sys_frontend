import { BookOpen, Layers, Clock, Calendar, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "rgb(43,57,143)";

const TeacherSubjectsModal = ({ show, onClose, selectedTeacher, subjects }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* HEADER CON GRADIENTE */}
          <div className={`relative h-25 bg-[${BRAND}]`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            
            {/* FOTO FLOTANTE */}
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-3 border-white shadow-xl bg-gray-100">
                {selectedTeacher?.photoUrl ? (
                  <img
                    src={selectedTeacher.photoUrl}
                    alt={selectedTeacher.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={40} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CUERPO DEL PERFIL */}
          <div className="pt-16 px-8 pb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedTeacher?.nombre || "Docente no identificado"}
                </h2>
                <p className="text-indigo-600 font-medium flex items-center gap-1.5 mt-1">
                  <BookOpen size={16} />
                  Docente Académico
                </p>
              </div>
              
              <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold">Cursos</span>
                <span className="text-xl font-black text-slate-800">{subjects.length}</span>
              </div>
            </div>
          </div>

          <hr className="mx-8 border-slate-100" />

          {/* LISTA DE CURSOS */}
          <div className="p-8 overflow-y-auto grow">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Layers size={16} />
              Cursos Asignados
            </h4>

            <div className="grid gap-3">
              {subjects.length > 0 ? (
                subjects.map((s) => (
                  <motion.div 
                    key={s.id}
                    whileHover={{ x: 5 }}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-white flex items-center text-[${BRAND}] justify-center shadow-sm transition-colors`}>
                        <span className="font-bold text-sm">{s.id}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-700 group-hover:text-indigo-900 transition-colors">
                          {s.course}
                        </h5>
                        <p className="text-xs text-slate-500">{s.modulo || "Módulo General"}</p>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 flex items-center gap-4 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-slate-400" />
                        {s.duracionSemanas ? `${s.duracionSemanas} sem.` : "—"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-slate-400" />
                        {s.fechaInicio || "Pendiente"}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <Layers size={40} className="text-slate-300 mb-2" />
                  <p className="text-slate-500 font-medium">Sin cursos asignados aún</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeacherSubjectsModal;