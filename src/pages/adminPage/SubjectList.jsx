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
import SubjectDetailModal from "./components/SubjectDetailModal";
import SubjectEditModal from "./components/SubjectEditModal";
import { Search } from "lucide-react";
import SubjectTable from "./components/SubjectTable";
import { toast } from "react-toastify";

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
  const [loadingSave, setLoadingSave] = useState(false);
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

  const [form, setForm] = useState({
    courseId: "",
    duracionSemanas: 1,
    teacherId: "",
    modulo: "",
    fechaInicio: "",
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
      toast.error("Error cargando datos");
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
      const data = await getSchedulesBySubjectSession(subject.id);
      setSchedules(data);
      setSelectedSubject(subject);
      setShowSubjectModal(true);
    } catch (error) {
      console.error("Error obteniendo sesiones:", error);
      toast.error("Error obteniendo sesiones");
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
    setLoadingSave(true);
    try {
      const payload = {
        teacherId: Number(form.teacherId),
        courseId: Number(form.courseId),
        duracionSemanas: Number(form.duracionSemanas),
        modulo: form.modulo,
        fechaInicio: form.fechaInicio,
        schedules: form.schedules.map((s) => ({
          dayOfWeek: (s.dayOfWeek || "").toUpperCase(),
          startTime: s.startTime,
          endTime: s.endTime,
          classroomId: Number(s.classroomId),
        })),
      };

      if (editing) {
        await updateSubject(editing.id, payload);
        toast.success("Materia actualizada correctamente");
      } else {
        await createSubjectWithMultipleSchedules(payload);
        toast.success("Materia con múltiples horarios creada correctamente");
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando materia:", error);
      toast.error("Error guardando materia");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleEdit = (subject) => {
    setEditing(subject);
    setForm({
      courseId: subject.courseId || "",
      duracionSemanas: subject.duracionSemanas || 1,
      teacherId: subject.teacherId || "",
      modulo: subject.modulo || "",
      fechaInicio: subject.fechaInicio || "",
      schedules: subject.schedules || [],
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubject(id);
      toast.info("Materia eliminada correctamente");
      fetchData();
    } catch (error) {
      console.error("Error eliminando materia:", error);
      toast.error("Error eliminando materia");
    }
  };


  return (
    <div className="space-y-5 sm:space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[rgb(43,57,143)]">
          Gestión de Materias
        </h2>

        <button
          onClick={openNewModal}
          className="w-full sm:w-auto bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          + Nueva Materia
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="flex items-center gap-2 bg-white shadow-sm rounded-lg px-3 py-2 border w-full sm:max-w-md">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por curso o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLA */}
      <SubjectTable
        subjects={filteredSubjects}
        loading={loading}
        onView={handleViewSubject}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* MODALES */}
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
        loading={loadingSave}
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