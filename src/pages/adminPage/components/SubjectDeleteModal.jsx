import { motion, AnimatePresence } from "framer-motion";

const ConfirmDeleteModal = ({ show, onClose, onConfirm, subject }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              ¿Seguro que deseas eliminar la materia{" "}
              <span className="font-semibold">{subject?.course}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
