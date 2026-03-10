import { useEffect, useState } from "react";
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../../services/subjectService";
import { getAllCourses } from "../../services/courseService";
import { getAllTeachers } from "../../services/teacherService";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ courseId: "", duracionSemanas: "", teacherId: "" });
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllSubjects();
      const cursos = await getAllCourses();
      const docentes = await getAllTeachers();
      setSubjects(data);
      setCourses(cursos);
      setTeachers(docentes);
    } catch (error) {
      console.error("Error cargando datos:", error);
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
      const payload = {
        courseId: Number(form.courseId),
        teacherId: Number(form.teacherId),
        duracionSemanas: Number(form.duracionSemanas),
      };
      if (editing) {
        await updateSubject(editing.id, payload);
      } else {
        await createSubject(payload);
      }
      setForm({ courseId: "", duracionSemanas: "", teacherId: "" });
      setEditing(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando materia:", error);
    }
  };

  const handleEdit = (subject) => {
    setEditing(subject);
    setForm({
      courseId: subject.courseId,
      duracionSemanas: subject.duracionSemanas,
      teacherId: subject.teacherId,
    });
    setShowModal(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta materia?")) {
      try {
        await deleteSubject(id);
        fetchData();
      } catch (error) {
        console.error("Error eliminando materia:", error);
      }
    }
  };

  if (loading) return <p>Cargando materias...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">
          Gestión de Materias
        </h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ courseId: "", duracionSemanas: "", teacherId: "" });
            setShowModal(true);
          }}
          className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          + Nueva Materia
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[rgb(43,57,143)] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Curso</th>
              <th className="px-4 py-2 text-left">Duración</th>
              <th className="px-4 py-2 text-left">Docente</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, index) => (
              <tr key={s.id || index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{s.course}</td>
                <td className="px-4 py-2">{s.duracionSemanas} semana(s)</td>
                <td className="px-4 py-2">{s.teacher}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {subjects.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No hay materias registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editing ? "Editar Materia" : "Nueva Materia"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Curso
                </label>
                <select
                  name="courseId"
                  value={form.courseId}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione curso</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duración (semanas)
                </label>
                <input
                  type="number"
                  name="duracionSemanas"
                  value={form.duracionSemanas}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Docente
                </label>
                <select
                  name="teacherId"
                  value={form.teacherId}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione docente</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre}
                    </option>
                  ))}
                </select>
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

export default SubjectList;
