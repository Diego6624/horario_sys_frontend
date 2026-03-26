import { User, BookOpen, Clock, CalendarDays } from "lucide-react";

const CardHorarioComponent = ({
  aula,
  docente,
  curso,
  horario,
  sesion,
  estado,
}) => {
  const estadoLower = estado?.toLowerCase();

  const config = {
    libre: "bg-gray-400 border-gray-400",
    "en clase": "bg-blue-500 border-blue-500",
    "siguiente clase": "bg-orange-500 border-orange-500",
    completado: "bg-green-500 border-green-500",
  };

  const styles = config[estadoLower] || "bg-gray-400 border-gray-400";

  const bgColor = styles.split(" ")[0];
  const borderColor = styles.split(" ")[1];

  return (
    <div className={`bg-white/90 backdrop-blur rounded-2xl p-4 sm:p-5 md:p-6 shadow-md border-l-4 ${borderColor} hover:shadow-lg transition h-full flex flex-col justify-between`}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[rgb(43,57,143)]">
          Aula {aula}
        </h2>

        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${bgColor} animate-pulse`} />
          <span className="text-sm text-gray-500 capitalize">
            {estado}
          </span>
        </div>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm md:text-base">

        <Info icon={<User />} label="Docente" value={docente} />
        <Info icon={<BookOpen />} label="Curso" value={curso} />
        <Info icon={<Clock />} label="Horario" value={horario} />
        <Info icon={<CalendarDays />} label="Sesión" value={sesion} />

      </div>
    </div>
  );
};

export default CardHorarioComponent;

const Info = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1 min-h-[60px] sm:min-h-[70px]">

    <div className="flex items-center gap-1 sm:gap-2 text-blue-600 font-semibold text-[10px] sm:text-xs uppercase">
      {icon}
      {label}
    </div>

    <p className="text-gray-800 text-sm sm:text-lg md:text-xl font-medium leading-tight line-clamp-2">
      {value || "—"}
    </p>

  </div>
);