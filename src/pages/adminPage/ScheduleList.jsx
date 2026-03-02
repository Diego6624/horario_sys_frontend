import { useEffect, useState } from "react";
import { getAllSchedules, createSchedule } from "../../services/scheduleService";

const ScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [form, setForm] = useState({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        docente: "",
        curso: "",
        sesion: ""
    });

    const fetchData = async () => {
        try {
            const data = await getAllSchedules();
            setSchedules(data);
        } catch (err) {
            console.error("Error cargando bloques:", err);
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
            await createSchedule(form);
            setForm({ dayOfWeek: "", startTime: "", endTime: "", docente: "", curso: "", sesion: "" });
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
                        {s.dayOfWeek} {s.startTime} - {s.endTime} | {s.curso} ({s.docente})
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
                <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
                    Crear Bloque
                </button>
            </div>
        </div>
    );
};

export default ScheduleList;
