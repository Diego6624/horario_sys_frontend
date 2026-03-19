import { useEffect, useState } from "react";
import {
  getAllSubjects,
  createSubjectWithMultipleSchedules,
  updateSubject,
  deleteSubject,
} from "../../services/subjectService";
import { getAllCourses } from "../../services/courseService";
import { getAllTeachers } from "../../services/teacherService";
import { getAllClassrooms } from "../../services/classroomService";
import LoaderComponent from "@/components/LoaderComponent";

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
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
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
                {
                  subjects.map((s, index) => (
                    <tr key={s.id || index} className="border-b hover:bg-gray-50 border-gray-300">
                      <td className="px-4 py-2">{s.id}</td>
                      <td className="px-4 py-2">{s.course}</td>
                      <td className="px-4 py-2">{s.teacher}</td>
                      <td className="px-4 py-2">{s.duracionSemanas} semana(s)</td>
                      <td className="px-4 py-2 flex gap-3">
                        <button onClick={() => handleEdit(s)} className="text-blue-600 hover:bg-blue-600 hover:text-white focus border border-blue-600 px-3 py-1 rounded cursor-pointer transition">Editar</button>
                        <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:bg-red-600 hover:text-white border border-red-600 px-3 py-1 rounded cursor-pointer transition">Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
                {subjects.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">No hay materias registradas</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-10 pb-10 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-bold mb-4">{editing ? "Editar Materia" : "Nueva Materia"}</h3>

            {/* Nueva materia */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Curso */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Curso</label>
                <select name="courseId" value={form.courseId} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required>
                  <option value="" disabled>Seleccione curso</option>
                  {courses.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>

              {/* Duración y Módulo */}
              <div className="flex w-full gap-5">

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">Duración (semanas)</label>
                  <input type="number" min={1} name="duracionSemanas" value={form.duracionSemanas} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">Módulo</label>
                  <select
                    name="modulo"
                    value={form.modulo}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="" disabled selected>Seleccione módulo</option>
                    <option value="M1">Módulo 1</option>
                    <option value="M2">Módulo 2</option>
                    <option value="M3">Módulo 3</option>
                  </select>
                </div>

              </div>

              {/* Docente */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Docente</label>
                <select name="teacherId" value={form.teacherId} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required>
                  <option value="" disabled>Seleccione docente</option>
                  {teachers.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </select>
              </div>

              {/* Horarios dinámicos */}
              {!editing && (
                <div className="bg-gray-50 p-3 rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Horarios</h4>
                    <button type="button" onClick={addScheduleRow} className="text-sm bg-[rgb(43,57,143)] text-white px-3 py-1 rounded">+ Agregar horario</button>
                  </div>

                  {form.schedules.length === 0 && (
                    <p className="text-sm text-gray-500">No hay horarios agregados. Presiona "+ Agregar horario" para añadir uno.</p>
                  )}

                  {form.schedules.map((s, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-end bg-white p-2 rounded border">
                      <div className="col-span-3">
                        <label className="text-xs font-medium">Día</label>
                        <select
                          value={s.dayOfWeek}
                          onChange={(e) => updateScheduleRow(idx, "dayOfWeek", e.target.value)}
                          className="w-full border rounded px-2 py-1"
                          required
                        >
                          <option value="" disabled>Seleccionar</option>
                          <option value="MONDAY">LUNES</option>
                          <option value="TUESDAY">MARTES</option>
                          <option value="WEDNESDAY">MIÉRCOLES</option>
                          <option value="THURSDAY">JUEVES</option>
                          <option value="FRIDAY">VIERNES</option>
                          <option value="SATURDAY">SÁBADO</option>
                          <option value="SUNDAY">DOMINGO</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="text-xs font-medium">Inicio</label>
                        <input type="time" value={s.startTime} onChange={(e) => updateScheduleRow(idx, "startTime", e.target.value)} className="w-full border rounded px-2 py-1" required />
                      </div>

                      <div className="col-span-2">
                        <label className="text-xs font-medium">Fin</label>
                        <input type="time" value={s.endTime} onChange={(e) => updateScheduleRow(idx, "endTime", e.target.value)} className="w-full border rounded px-2 py-1" required />
                      </div>

                      <div className="col-span-4">
                        <label className="text-xs font-medium">Aula</label>
                        <select value={s.classroomId} onChange={(e) => updateScheduleRow(idx, "classroomId", e.target.value)} className="w-full border rounded px-2 py-1" required>
                          <option value="">Seleccione aula</option>
                          {classrooms.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                        </select>
                      </div>

                      <div className="col-span-1 flex justify-end">
                        <button type="button" onClick={() => removeScheduleRow(idx)} className="text-red-600">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border hover:bg-gray-100">Cancelar</button>
                <button type="submit" className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
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