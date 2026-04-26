import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { User, ImagePlus, X } from "lucide-react";
import { useState } from "react";

const BRAND = "rgb(43,57,143)";

const TeacherEditModal = ({ show, onClose, onSubmit, form, setForm, handleChange, editing, loading }) => {
  const [preview, setPreview] = useState(null);

  if (!show) return null;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, file });
    setPreview(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setForm({ ...form, file: null });
    setPreview(null);
  };

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

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold" style={{ color: BRAND }}>
                {editing ? "Editar Docente" : "Nuevo Docente"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {editing
                  ? "Modifica la información del docente"
                  : "Completa los datos para registrar un docente"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1 rounded-lg hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={onSubmit} className="px-5 py-5 space-y-5">

            {/* NOMBRE */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Nombre del docente
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <Input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Félix Ramos"
                  required
                  className="pl-9 h-10 text-sm border-gray-200 rounded-xl
                    focus-visible:ring-2 focus-visible:ring-[rgb(43,57,143)] focus-visible:ring-offset-0
                    focus-visible:border-transparent placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* FOTO */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Foto del docente
              </label>

              {/* Preview si hay imagen */}
              {preview ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {form.file?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {form.file ? (form.file.size / 1024).toFixed(1) + " KB" : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-red-500 transition cursor-pointer p-1 rounded-lg hover:bg-red-50 shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                /* Zona de upload */
                <label
                  className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[rgb(43,57,143)] hover:bg-blue-50/40 transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "rgba(43,57,143,0.08)" }}
                  >
                    <ImagePlus size={16} style={{ color: BRAND }} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold" style={{ color: BRAND }}>
                      Seleccionar imagen
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG hasta 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* ── FOOTER ── */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                style={{ background: BRAND }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
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