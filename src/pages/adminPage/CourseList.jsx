import { useEffect, useState } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
} from "../../services/courseService";
import LoaderComponent from "@/components/LoaderComponent";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: "" });
  const [editing, setEditing] = useState(null);

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
          className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          + Nuevo Curso
        </button>
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

                {courses.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{c.id}</td>
                    <td className="px-4 py-2">{c.nombre}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="text-blue-600 hover:bg-blue-600 hover:text-white focus border border-blue-600 px-3 py-1 rounded cursor-pointer transition"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td className="px-4 py-2 text-center text-gray-500" colSpan="3">
                      No hay cursos registrados
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editing ? "Editar Curso" : "Nuevo Curso"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del curso
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancelar
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
      )}
    </div>
  );
};

export default CourseList;
