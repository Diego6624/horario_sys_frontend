import { useEffect, useState } from "react";
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  getSubjectsByTeacher,
} from "../../services/teacherService";
import LoaderComponent from "@/components/LoaderComponent";
import TeacherSubjectModal from "./components/TeacherSubjectModal";
import TeacherEditModal from "./components/TeacherEditModal";
import { Eye, Pencil, Search } from "lucide-react";
import { toast } from "react-toastify";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);
  const [form, setForm] = useState({ nombre: "" });
  const [editing, setEditing] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // 🔹 Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error cargando docentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateTeacher(editing.id, form);
        toast.success("Docente actualizado correctamente");
      } else {
        await createTeacher(form);
        toast.success("Docente creado correctamente");
      }
      setForm({ nombre: "" });
      setEditing(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando docente:", error);
      toast.error("Error guardando docente");
    }
  };


  const handleEdit = (teacher) => {
    setEditing(teacher);
    setForm({ nombre: teacher.nombre });
    setShowModal(true);
  };

  const handleViewSubjects = async (teacher) => {
    try {
      const data = await getSubjectsByTeacher(teacher.id);
      setSubjects(data);
      setSelectedTeacher(teacher);
      setShowSubjectsModal(true);
    } catch (error) {
      console.error("Error obteniendo materias del docente:", error);
      toast.error("Error cargando materias del docente");
    }
  };


  // 🔹 Filtrar docentes por nombre o ID
  const filteredTeachers = teachers.filter(
    (t) =>
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(t.id).includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">
          Gestión de Docentes
        </h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ nombre: "" });
            setShowModal(true);
          }}
          className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          + Nuevo Docente
        </button>
      </div>

      {/* 🔹 Input de búsqueda */}
      <div className="flex items-center gap-2 bg-white shadow-sm rounded-lg px-3 py-2 border w-full max-w-md">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[rgb(43,57,143)] text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">
                  <LoaderComponent />
                </td>
              </tr>
            ) : (
              <>
                {filteredTeachers.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b hover:bg-gray-50 border-gray-300"
                  >
                    <td className="px-4 py-2">{t.id}</td>
                    <td className="px-4 py-2">{t.nombre}</td>
                    <td className="px-4 py-2 flex gap-2">
                      {/* Botón Ver */}
                      <button
                        onClick={() => handleViewSubjects(t)}
                        className="flex gap-2 items-center justify-center text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition cursor-pointer"
                      >
                        <Eye size={16} className="w-5 h-5" />
                        <span className="hidden sm:inline">Ver</span>
                      </button>
                      {/* Botón Editar */}
                      <button
                        onClick={() => handleEdit(t)}
                        className="flex gap-2 items-center justify-center text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition cursor-pointer"
                      >
                        <Pencil size={16} className="w-4 h-4" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTeachers.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No se encontraron docentes
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <TeacherEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        editing={editing}
      />

      <TeacherSubjectModal
        show={showSubjectsModal}
        onClose={() => setShowSubjectsModal(false)}
        selectedTeacher={selectedTeacher}
        subjects={subjects}
      />
    </div>
  );
};

export default TeacherList;
