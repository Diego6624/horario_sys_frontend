import { useEffect, useState } from "react";
import { getAllSchedules, createSchedule } from "../../services/scheduleService";
import { getAllSubjects } from "../../services/subjectService";
import { getAllClassrooms } from "../../services/classroomService";
import LoaderComponent from "../../components/LoaderComponent";
import CalendarView from "../../components/CalendarView";

const HoraryList = () => {
  const [schedules, setSchedules] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [specialForm, setSpecialForm] = useState({
    subjectId: "",
    classroomId: "",
    date: "",
    startTime: "",
    endTime: "",
    sesion: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const schs = await getAllSchedules();
        const subs = await getAllSubjects();
        const cls = await getAllClassrooms();
        setSchedules(schs);
        setSubjects(subs);
        setClassrooms(cls);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSpecialSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        subjectId: Number(specialForm.subjectId),
        classroomId: Number(specialForm.classroomId),
        date: specialForm.date,
        dayOfWeek: new Date(specialForm.date)
          .toLocaleDateString("es-ES", { weekday: "long" })
          .toUpperCase(),
        startTime: specialForm.startTime,
        endTime: specialForm.endTime,
        sesion: specialForm.sesion
      };


      await createSchedule(payload);
      setShowSpecialModal(false);
      const schs = await getAllSchedules();
      setSchedules(schs);
    } catch (err) {
      console.error("Error creando clase especial:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">Calendario</h2>
        <button
          onClick={() => setShowSpecialModal(true)}
          className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          + Nueva sesión
        </button>
      </div>

      <div className="w-auto h-auto">
        {loading ? (
          <LoaderComponent />
        ) : (
          <CalendarView schedules={schedules} subjects={subjects} />
        )}
      </div>

      {showSpecialModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Nueva Clase Especial</h3>
            <form onSubmit={handleSpecialSubmit} className="space-y-3">
              {/* Materia */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Materia</label>
                <select
                  value={specialForm.subjectId}
                  onChange={(e) => setSpecialForm({ ...specialForm, subjectId: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione materia</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.course} - {s.teacher}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  value={specialForm.date}
                  onChange={(e) => setSpecialForm({ ...specialForm, date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Horas */}
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
                  <input
                    type="time"
                    value={specialForm.startTime}
                    onChange={(e) => setSpecialForm({ ...specialForm, startTime: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="block text-sm font-medium text-gray-700">Hora Fin</label>
                  <input
                    type="time"
                    value={specialForm.endTime}
                    onChange={(e) => setSpecialForm({ ...specialForm, endTime: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              {/* Aula */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Aula</label>
                <select
                  value={specialForm.classroomId}
                  onChange={(e) => setSpecialForm({ ...specialForm, classroomId: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione aula</option>
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Sesión */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Sesión</label>
                <select
                  value={specialForm.sesion}
                  onChange={(e) => setSpecialForm({ ...specialForm, sesion: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Seleccione sesión</option>
                  <option value="REPROGRAMACIÓN">REPROGRAMACIÓN</option>
                  <option value="INTRODUCCIÓN">INTRODUCCIÓN</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSpecialModal(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[rgb(43,57,143)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoraryList;
