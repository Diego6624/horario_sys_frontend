import { useEffect, useState } from "react";
import { getAllSchedules } from "../../services/scheduleService";
import LoaderComponent from "../../components/LoaderComponent";
import CalendarView from "../../components/CalendarView";

const HoraryList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("Error cargando horarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(43,57,143)]">Gestión de Horarios</h2>
      </div>

      {loading ? (
        <LoaderComponent />
      ) : (
        <CalendarView schedules={schedules} />
      )}
    </div>
  );
};

export default HoraryList;
