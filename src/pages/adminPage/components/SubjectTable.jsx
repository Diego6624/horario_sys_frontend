import { Eye, Pencil, Trash2 } from "lucide-react";
import LoaderComponent from "../../../components/LoaderComponent";
import { useState } from "react";
import SubjectDeleteModal from "./SubjectDeleteModal";

const SubjectTable = ({
  subjects = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
  getRemainingWeeks,
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
    <div className="w-full max-w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-[800px] w-full text-md">
        <thead className="bg-[rgb(43,57,143)] text-white">
          <tr>
            <th className="px-3 sm:px-4 py-2 text-left">ID</th>
            <th className="px-3 sm:px-4 py-2 text-left">Curso</th>
            <th className="px-3 sm:px-4 py-2 text-left">Docente</th>
            <th className="px-3 sm:px-4 py-2 text-left">Duración</th>
            <th className="px-3 sm:px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">
                <LoaderComponent />
              </td>
            </tr>
          ) : (
            <>
              {subjects.map((s, index) => (
                <tr
                  key={s.id || index}
                  className="border-b hover:bg-gray-50 border-gray-300"
                >
                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {s.id}
                  </td>

                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {s.course}
                  </td>

                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {s.teacher}
                  </td>

                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    {getRemainingWeeks(s)} semana(s)
                  </td>

                  <td className="px-3 sm:px-4 py-2">
                    <div className="flex gap-2 sm:gap-3 whitespace-nowrap">
                      <button
                        onClick={() => onView(s)}
                        className="flex items-center gap-1 sm:gap-2 text-green-600 border border-green-600 px-2 sm:px-3 py-1 rounded hover:bg-green-600 hover:text-white transition cursor-pointer"
                      >
                        <Eye size={16} />
                        <span className="hidden sm:inline">Ver</span>
                      </button>

                      <button
                        onClick={() => onEdit(s)}
                        className="flex items-center gap-1 sm:gap-2 text-blue-600 border border-blue-600 px-2 sm:px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition cursor-pointer"
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Editar</span>
                      </button>

                      <button
                        onClick={() => handleDeleteClick(s)}
                        className="flex items-center gap-1 sm:gap-2 text-red-600 border border-red-600 px-2 sm:px-3 py-1 rounded hover:bg-red-600 hover:text-white transition cursor-pointer"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {subjects.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No se encontraron materias
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>

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
