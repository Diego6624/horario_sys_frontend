import { useEffect, useState } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
} from "../../services/courseService";
import CourseEditModal from "./components/CourseEditModal";
import LoaderComponent from "@/components/LoaderComponent";
import { Search, Pencil } from "lucide-react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: "" });
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(
    (c) =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(c.id).includes(searchTerm)
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error cargando cursos:", error);
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
        await updateCourse(editing.id, form);
      } else {
        await createCourse(form);
      }
      setForm({ nombre: "" });
      setEditing(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando curso:", error);
    }
  };

  const handleEdit = (course) => {
    setEditing(course);
    setForm({ nombre: course.nombre });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">
          Gestión de Cursos
        </h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ nombre: "" });
            setShowModal(true);
          }}
          className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          + Nuevo Curso
        </button>
      </div>

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
                {filteredCourses.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50 border-gray-300">
                    <td className="px-4 py-2">{c.id}</td>
                    <td className="px-4 py-2">{c.nombre}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="flex items-center gap-2 text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td className="px-4 py-2 text-center text-gray-500" colSpan="3">
                      No se encontraron cursos
                    </td>
                  </tr>
                )}

              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <CourseEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        editing={editing}
      />
    </div>
  );
};

export default CourseList;
