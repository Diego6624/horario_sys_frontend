import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";

const BRAND = "rgb(43,57,143)";

const CourseEditModal = ({ show, onClose, onSubmit, form, handleChange, editing, loading }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >

          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold" style={{ color: BRAND }}>
                {editing ? "Editar Curso" : "Nuevo Curso"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {editing ? "Modifica los datos del curso" : "Completa la información para registrar un curso"}
              </p>
            </div>
            <button type="button" onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1 rounded-lg hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className="px-5 py-5 space-y-5">

            {/* NOMBRE */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Nombre del curso
              </label>
              <div className="relative">
                <BookOpen size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Power BI"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none transition
                    focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-transparent placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-1">
              <button type="button" onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition cursor-pointer">
                Cancelar
              </button>
              <button type="submit" disabled={loading}
                className="w-full sm:w-auto text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                style={{ background: BRAND }}>
                {loading
                  ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  : editing ? "Actualizar" : "Crear"
                }
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CourseEditModal;