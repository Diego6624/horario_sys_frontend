import { Eye, Pencil, Trash2 } from "lucide-react";
import LoaderComponent from "../../../components/LoaderComponent";
import { useState } from "react";
import SubjectDeleteModal from "./SubjectDeleteModal";

const BRAND = "rgb(43,57,143)";

const SubjectTable = ({
  subjects = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
  // Props para el paginador visual en el footer de la tabla
  totalItems = 0,
  indexOfFirstItem = 0,
  indexOfLastItem = 0,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleDeleteClick = (subject) => {
    setSubjectToDelete(subject);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      onDelete(subjectToDelete.id);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr style={{ background: BRAND }}>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest w-16">
                ID
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest">
                Curso
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest">
                Docente
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest">
                Duración
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest w-64">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5">
                  <LoaderComponent />
                </td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  No se encontraron materias
                </td>
              </tr>
            ) : (
              subjects.map((s, index) => (
                <tr
                  key={s.id || index}
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                      #{s.id}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-md font-medium text-gray-800">
                    {s.course}
                  </td>

                  <td className="px-5 py-3.5 text-md font-medium text-gray-800">
                    {s.teacher}
                  </td>

                  <td className="px-5 py-3.5 text-md font-medium text-gray-800">
                    {s.duracionSemanas} semana{s.duracionSemanas !== 1 ? "s" : ""}
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      {/* Botón Ver */}
                      <button
                        onClick={() => onView(s)}
                        className="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer"
                        style={{
                          color: "#059669",
                          borderColor: `rgba(5, 150, 105, 0.3)`,
                          background: "rgba(5, 150, 105, 0.04)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#059669";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#059669";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(5, 150, 105, 0.04)";
                          e.currentTarget.style.color = "#059669";
                          e.currentTarget.style.borderColor = "rgba(5, 150, 105, 0.3)";
                        }}
                      >
                        <Eye size={16} />
                        <span className="hidden sm:inline">Ver</span>
                      </button>

                      {/* Botón Editar */}
                      <button
                        onClick={() => onEdit(s)}
                        className="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer"
                        style={{
                          color: BRAND,
                          borderColor: `rgba(43,57,143,0.3)`,
                          background: "rgba(43,57,143,0.04)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = BRAND;
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = BRAND;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(43,57,143,0.04)";
                          e.currentTarget.style.color = BRAND;
                          e.currentTarget.style.borderColor = "rgba(43,57,143,0.3)";
                        }}
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Editar</span>
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDeleteClick(s)}
                        className="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer"
                        style={{
                          color: "#dc2626",
                          borderColor: `rgba(220, 38, 38, 0.3)`,
                          background: "rgba(220, 38, 38, 0.04)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#dc2626";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#dc2626";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(220, 38, 38, 0.04)";
                          e.currentTarget.style.color = "#dc2626";
                          e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
                        }}
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── INFO FOOTER ── */}
      {!loading && totalItems > 0 && (
        <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Mostrando{" "}
            <span className="font-semibold text-gray-600">
              {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, totalItems)}
            </span>{" "}
            de <span className="font-semibold text-gray-600">{totalItems}</span>
          </p>
        </div>
      )}

      {/* Modal de confirmación */}
      <SubjectDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        subject={subjectToDelete}
      />
    </div>
  );
};

export default SubjectTable;