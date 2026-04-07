import { motion, AnimatePresence } from "framer-motion";

const TeacherEditModal = ({ show, onClose, onSubmit, form, handleChange, editing, loading }) => {
  if (!show) return null;

  const inputStyle =
    "w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-transparent transition";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3">
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 md:p-6"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[rgb(43,57,143)]">
                {editing ? "Editar Docente" : "Nuevo Docente"}
              </h3>
              <p className="text-sm text-gray-500">
                {editing
                  ? "Modifica la información del docente"
                  : "Completa los datos para registrar un docente"}
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* NOMBRE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Nombre del docente
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Félix Ramos"
                className={inputStyle}
                required
              />
            </div>

            {/* FOOTER */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  editing ? "Actualizar" : "Crear"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeacherEditModal;
