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
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import SubjectTable from "./components/SubjectTable";
import { toast } from "react-toastify";

const BRAND = "rgb(43,57,143)";

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
  
  // Estados para Búsqueda y Paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Lógica de filtrado
  const filteredSubjects = subjects.filter(
    (s) =>
      s.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.id).includes(searchTerm)
  );

  // Lógica de Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  // Genera el rango de páginas visibles (máximo 5)
  const getPageRange = () => {
    const delta = 2;
    const range = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) range.push(i);
    return range;
  };

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
    <div className="space-y-5">
      {/* ── HEADER ── */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: BRAND }}>
            Gestión de Materias
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {filteredSubjects.length} materia{filteredSubjects.length !== 1 ? "s" : ""} encontrada{filteredSubjects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center w-full md:w-auto gap-2 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer text-md"
          style={{ background: BRAND }}
        >
          <p className="w-full md:w-auto">+ Nueva Materia</p>
        </button>
      </div>

      {/* ── BUSCADOR ── */}
      <div className="flex items-center gap-2 bg-white shadow-sm rounded-xl px-3 py-2.5 border border-gray-200 w-full max-w-sm">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Buscar por curso o ID..."
          value={searchTerm}
          onChange={(e) => { 
            setSearchTerm(e.target.value); 
            setCurrentPage(1); // Reseteamos la página al buscar
          }}
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* ── TABLA ── */}
      <SubjectTable
        subjects={currentItems}
        loading={loading}
        onView={handleViewSubject}
        onEdit={handleEdit}
        onDelete={handleDelete}
        totalItems={filteredSubjects.length}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
      />

      {/* ── PAGINACIÓN ── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-4">
          {/* Anterior */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Puntos izquierda */}
          {getPageRange()[0] > 1 && (
            <>
              <PageBtn n={1} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
              {getPageRange()[0] > 2 && (
                <span className="px-1 text-gray-400 text-sm">…</span>
              )}
            </>
          )}

          {/* Rango central */}
          {getPageRange().map((n) => (
            <PageBtn key={n} n={n} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
          ))}

          {/* Puntos derecha */}
          {getPageRange().at(-1) < totalPages && (
            <>
              {getPageRange().at(-1) < totalPages - 1 && (
                <span className="px-1 text-gray-400 text-sm">…</span>
              )}
              <PageBtn n={totalPages} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
            </>
          )}

          {/* Siguiente */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* ── MODALES ── */}
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

// ── Botón de página ──────────────────────────────────────────────────────────
const PageBtn = ({ n, current, onClick, brand }) => (
  <button
    onClick={() => onClick(n)}
    className="w-8 h-8 rounded-lg text-sm font-semibold transition cursor-pointer border"
    style={
      current === n
        ? { background: brand, color: "white", borderColor: brand }
        : { background: "white", color: "#374151", borderColor: "#e5e7eb" }
    }
  >
    {n}
  </button>
);