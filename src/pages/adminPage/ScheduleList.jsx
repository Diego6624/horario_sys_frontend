import { useEffect, useState } from "react";
import {
  getAllSchedules,
  createSchedule,
} from "../../services/scheduleService";
import { getAllClassrooms } from "../../services/classroomService";
import { getAllSubjects } from "../../services/subjectService";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    sesion: "",
    classroomId: "",
    subjectId: "",
  });
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getAllSchedules();
      console.log("Schedules:", data);
      setSchedules(data);

      const aulas = await getAllClassrooms();
      console.log("Classrooms:", aulas);
      setClassrooms(aulas);

      const subs = await getAllSubjects();
      console.log("Subjects:", subs);
      setSubjects(subs);
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        dayOfWeek: form.dayOfWeek,
        startTime: form.startTime,
        endTime: form.endTime,
        sesion: form.sesion,
        classroomId: Number(form.classroomId),
        subjectId: Number(form.subjectId),
      };
      await createSchedule(payload);
      setMessage("✅ Bloque creado correctamente");
      setForm({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        sesion: "",
        classroomId: "",
        subjectId: "",
      });
      fetchData();
    } catch (err) {
      setMessage("❌ Error creando bloque");
      console.error("Error creando horario:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este bloque?")) {
      try {
        // Aquí deberías implementar deleteSchedule en tu service
        // await deleteSchedule(id);
        setMessage("✅ Bloque eliminado correctamente");
        fetchData();
      } catch (err) {
        setMessage("❌ Error eliminando bloque");
        console.error("Error eliminando horario:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">
        Gestión de Bloques
      </h2>

      {message && <p className="text-sm font-semibold">{message}</p>}

      {/* Listado */}
      <ul className="space-y-3">
        {schedules.map((s, index) => (
          <li
            key={s.id || index}
            className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3"
          >
            <div>
              <p className="font-semibold">
                {s.dayOfWeek} | {s.startTime} - {s.endTime}
              </p>
              <p className="text-sm text-gray-500">
                {s.course} ({s.teacher}) - Aula: {s.classroom} | Sesión: {s.sesion}
              </p>
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Formulario */}
      <form
        onSubmit={handleCreate}
        className="bg-white shadow-md rounded-lg p-4 space-y-4"
      >
        <div>
          <label className="block font-semibold">Día</label>
          <input
            name="dayOfWeek"
            value={form.dayOfWeek}
            onChange={handleChange}
            placeholder="Ej. MONDAY"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Inicio</label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Fin</label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Sesión</label>
          <input
            name="sesion"
            value={form.sesion}
            onChange={handleChange}
            placeholder="Ej. M1"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Aula</label>
          <select
            name="classroomId"
            value={form.classroomId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione aula</option>
            {classrooms.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Materia</label>
          <select
            name="subjectId"
            value={form.subjectId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione materia</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.course} ({s.teacher})
              </option>
            ))}
          </select>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Bloque
        </button>
      </form>
    </div>
  );
};

export default ScheduleList;
