import { useEffect, useState } from "react";
import { createHorary, getStatuses } from "../../../services/horaryService";
import { getAllClassrooms } from "../../../services/classroomService";
import { getAllSchedules } from "../../../services/scheduleService";

const CreateHoraryForm = ({ onCreated }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [form, setForm] = useState({
    classroomId: "",
    scheduleId: "",
    statusId: "",
    enabled: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cls = await getAllClassrooms();
        const sch = await getAllSchedules();
        const sts = await getStatuses();
        setClassrooms(cls);
        setSchedules(sch);
        setStatuses(sts);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        classroom: { id: Number(form.classroomId) },
        schedule: { id: Number(form.scheduleId) },
        status: { id: Number(form.statusId) },
        enabled: form.enabled
      };
      await createHorary(payload);
      if (onCreated) onCreated(); // refresca lista si se pasa callback
      setForm({ classroomId: "", scheduleId: "", statusId: "", enabled: true });
    } catch (err) {
      console.error("Error creando horario:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Crear Horario</h2>

      <div>
        <label className="block font-semibold">Aula</label>
        <select name="classroomId" value={form.classroomId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Seleccione aula</option>
          {classrooms.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Bloque</label>
        <select name="scheduleId" value={form.scheduleId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Seleccione bloque</option>
          {schedules.map((s) => (
            <option key={s.id} value={s.id}>
              {s.dayOfWeek} {s.startTime} - {s.endTime}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Estado</label>
        <select name="statusId" value={form.statusId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Seleccione estado</option>
          {statuses.map((st) => (
            <option key={st.id} value={st.id}>{st.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Crear
      </button>
    </form>
  );
};

export default CreateHoraryForm;
