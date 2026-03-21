import { useEffect, useState } from "react";
import {
  getAllSubjects,
  createSubjectWithMultipleSchedules,
  updateSubject,
  deleteSubject,
  getSchedulesBySubjectSession,
} from "../../services/subjectService";
import { getAllCourses } from "../../services/courseService";
import { getAllTeachers } from "../../services/teacherService";
import { getAllClassrooms } from "../../services/classroomService";
import LoaderComponent from "@/components/LoaderComponent";
import SubjectDetailModal from "./components/SubjectDetailModal";
import SubjectEditModal from "./components/SubjectEditModal";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";

const emptySchedule = {
  dayOfWeek: "",
  startTime: "",
  endTime: "",
  classroomId: "",
};

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = subjects.filter(
    (s) =>
      s.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.id).includes(searchTerm)
  );

  const getRemainingWeeks = (subject) => {
    if (!subject.fechaInicio || !subject.duracionSemanas) return subject.duracionSemanas;

    const startDate = new Date(subject.fechaInicio);
    const today = new Date();

    const diffMs = today - startDate;
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

    const remaining = subject.duracionSemanas - diffWeeks;

    return remaining > 0 ? remaining : 0;
  };


  const [form, setForm] = useState({
    courseId: "",
    duracionSemanas: 1,
    teacherId: "",
    modulo: "",
    schedules: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllSubjects();
      const cursos = await getAllCourses();
      const docentes = await getAllTeachers();
      const aulas = await getAllClassrooms();
      setSubjects(data);
      setCourses(cursos);
      setTeachers(docentes);
      setClassrooms(aulas);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------- Helpers ----------
  const openNewModal = () => {
    setEditing(null);
    setForm({ courseId: "", duracionSemanas: 1, teacherId: "", schedules: [] });
    setShowModal(true);
  };

  const handleViewSubject = async (subject) => {
    try {
      const data = await getSchedulesBySubjectSession(subject.id); // 👈 ahora sí definido
      setSchedules(data);
      setSelectedSubject(subject);
      setShowSubjectModal(true);
    } catch (error) {
      console.error("Error obteniendo sesiones:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addScheduleRow = () => {
    setForm({ ...form, schedules: [...form.schedules, { ...emptySchedule }] });
  };

  const updateScheduleRow = (index, key, value) => {
    const newSchedules = [...form.schedules];
    newSchedules[index] = { ...newSchedules[index], [key]: value };
    setForm({ ...form, schedules: newSchedules });
  };

  const removeScheduleRow = (index) => {
    const newSchedules = [...form.schedules];
    newSchedules.splice(index, 1);
    setForm({ ...form, schedules: newSchedules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const payload = {
          teacherId: Number(form.teacherId),
          courseId: Number(form.courseId),
          duracionSemanas: Number(form.duracionSemanas),
          modulo: form.modulo,
          schedules: form.schedules.map((s) => ({
            dayOfWeek: (s.dayOfWeek || "").toUpperCase(),
            startTime: s.startTime,
            endTime: s.endTime,
            classroomId: Number(s.classroomId),
          })),
        };

        await updateSubject(editing.id, payload);
        alert("Materia actualizada.");
      }
      else {
        const payload = {
          teacherId: Number(form.teacherId),
          courseId: Number(form.courseId),
          duracionSemanas: Number(form.duracionSemanas),
          modulo: form.modulo,
          schedules: form.schedules.map((s) => ({
            dayOfWeek: (s.dayOfWeek || "").toUpperCase(),
            startTime: s.startTime,
            endTime: s.endTime,
            classroomId: Number(s.classroomId),
          })),
        };

        await createSubjectWithMultipleSchedules(payload);
        alert("Materia creada correctamente con múltiples horarios.");
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando materia:", error);
      alert("Error guardando materia.");
    }
  };

  const handleEdit = (subject) => {
    setEditing(subject);
    setForm({
      courseId: subject.courseId || "",
      duracionSemanas: subject.duracionSemanas || 1,
      teacherId: subject.teacherId || "",
      modulo: subject.modulo || "",
      schedules: subject.schedules || [],
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">Gestión de Materias</h2>
        <button
          onClick={openNewModal}
          className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          + Nueva Materia
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white shadow-sm rounded-lg px-3 py-2 border w-full max-w-md">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por curso o ID..."
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
              <th className="px-4 py-2 text-left">Curso</th>
              <th className="px-4 py-2 text-left">Docente</th>
              <th className="px-4 py-2 text-left">Duración</th>
              <th className="px-4 py-2 text-left">Acciones</th>
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
                {filteredSubjects.map((s, index) => (
                  <tr key={s.id || index} className="border-b hover:bg-gray-50 border-gray-300">
                    <td className="px-4 py-2">{s.id}</td>
                    <td className="px-4 py-2">{s.course}</td>
                    <td className="px-4 py-2">{s.teacher}</td>
                    <td className="px-4 py-2">{getRemainingWeeks(s)} semana(s)</td>
                    <td className="px-4 py-2 flex gap-3">
                      {/* Botón Ver */}
                      <button
                        onClick={() => handleViewSubject(s)}
                        className="flex items-center gap-2 text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition cursor-pointer"
                      >
                        <Eye size={16} className="w-5 h-5"/>
                        <span className="hidden sm:inline">Ver</span>
                      </button>
                      {/* Botón Editar */}
                      <button
                        onClick={() => handleEdit(s)}
                        className="flex items-center gap-2 text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition cursor-pointer"
                      >
                        <Pencil size={16} className="w-4 h-4"/>
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="flex items-center gap-2 text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition cursor-pointer"
                      >
                        <Trash2 size={16} className="w-4 h-4"/>
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredSubjects.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                      No se encontraron materias
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <SubjectEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        editing={editing}
        courses={courses}
        teachers={teachers}
        classrooms={classrooms}
        addScheduleRow={addScheduleRow}
        updateScheduleRow={updateScheduleRow}
        removeScheduleRow={removeScheduleRow}
      />

      <SubjectDetailModal
        show={showSubjectModal}
        onClose={() => setShowSubjectModal(false)}
        selectedSubject={selectedSubject}
        schedules={schedules}
      />
    </div>
  );
};

export default SubjectList;