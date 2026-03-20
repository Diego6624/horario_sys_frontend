import { X } from "lucide-react";

const CourseEditModal = ({ show, onClose, onSubmit, form, handleChange, editing }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {editing ? "Editar Curso" : "Nuevo Curso"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del curso
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ejm: Power BI"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              {/* Texto en desktop, ícono en mobile */}
              <span className="hidden sm:inline">Cancelar</span>
              <X size={18} className="sm:hidden" />
            </button>
            <button
              type="submit"
              className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {editing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEditModal;
