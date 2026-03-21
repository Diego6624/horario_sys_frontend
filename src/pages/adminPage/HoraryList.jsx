import { useEffect, useState } from "react";
import { getAllSchedules, createSchedule } from "../../services/scheduleService";
import { getAllSubjects } from "../../services/subjectService";
import { getAllClassrooms } from "../../services/classroomService";
import LoaderComponent from "../../components/LoaderComponent";
import CalendarView from "../../components/CalendarView";
import SpecialSessionModal from "./components/SpecialSessionModal";

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

      <SpecialSessionModal
        show={showSpecialModal}
        onClose={() => setShowSpecialModal(false)}
        onSubmit={handleSpecialSubmit}
        specialForm={specialForm}
        setSpecialForm={setSpecialForm}
        subjects={subjects}
        classrooms={classrooms}
      />
    </div>
  );
};

export default HoraryList;
