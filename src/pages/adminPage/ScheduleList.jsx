import { useEffect, useState } from "react";
import { getAllSchedules, createSchedule } from "../../services/scheduleService";
import { getAllClassrooms } from "../../services/classroomService";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    docente: "",
    curso: "",
    sesion: "",
    classroomId: ""   // nuevo campo
  });

  const fetchData = async () => {
    try {
      const data = await getAllSchedules();
      setSchedules(data);
      const aulas = await getAllClassrooms();
      setClassrooms(aulas);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      // enviar classroom como objeto con id
      const payload = {
        ...form,
        classroom: { id: form.classroomId }
      };
      await createSchedule(payload);
      setForm({ dayOfWeek: "", startTime: "", endTime: "", docente: "", curso: "", sesion: "", classroomId: "" });
      fetchData();
    } catch (err) {
      console.error("Error creando bloque:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Gestión de Bloques</h2>
      <ul className="list-disc pl-6">
        {schedules.map((s) => (
          <li key={s.id}>
            {s.dayOfWeek} {s.startTime} - {s.endTime} | {s.curso} ({s.docente}) Aula: {s.classroom?.nombre}
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <input name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} placeholder="Día" className="border p-2 rounded w-full" />
        <input name="startTime" value={form.startTime} onChange={handleChange} placeholder="Inicio (HH:mm)" className="border p-2 rounded w-full" />
        <input name="endTime" value={form.endTime} onChange={handleChange} placeholder="Fin (HH:mm)" className="border p-2 rounded w-full" />
        <input name="docente" value={form.docente} onChange={handleChange} placeholder="Docente" className="border p-2 rounded w-full" />
        <input name="curso" value={form.curso} onChange={handleChange} placeholder="Curso" className="border p-2 rounded w-full" />
        <input name="sesion" value={form.sesion} onChange={handleChange} placeholder="Sesión" className="border p-2 rounded w-full" />

        {/* Selector de aula */}
        <select name="classroomId" value={form.classroomId} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Seleccionar Aula</option>
          {classrooms.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
          Crear Bloque
        </button>
      </div>
    </div>
  );
};

export default ScheduleList;
