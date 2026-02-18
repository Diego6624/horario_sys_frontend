import {
  User,
  BookOpen,
  Clock,
  CalendarDays,
  Circle,
} from "lucide-react";

const CardHorarioComponent = ({
  aula,
  docente,
  curso,
  horario,
  sesion,
  estado,
}) => {

  const isOcupado =
    estado?.toLowerCase() === "ocupado";

  return (
    <div
      className={`
        rounded-xl shadow-md flex flex-col w-full h-full
        border-2 transition
        ${isOcupado ? "border-red-400" : "border-green-500"}
        ${!isOcupado ? "bg-gray-100" : "bg-white"}
      `}
    >

      {/* HEADER */}
      <div className="relative text-center py-2 px-4 border-b border-black">

        <h2 className="text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-black">
          Aula {aula}
        </h2>

        {/* PUNTO ESTADO */}
        <Circle
          size={16}
          className={`
            absolute right-3 top-3
            ${isOcupado
              ? "fill-red-500 text-red-500"
              : "fill-green-500 text-green-500"}
          `}
        />

      </div>

      {/* BODY */}
      <div className="relative p-4 grid grid-cols-2 grid-rows-2 gap-6 flex-grow">

          {/* Linea vertical */}
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-black -translate-x-1/2" />
        
        <Info
          icon={<User size={22} />}
          label="Docente"
          value={docente}
        />

        <Info
          icon={<BookOpen size={22} />}
          label="Curso"
          value={curso}
        />

        <Info
          icon={<Clock size={22} />}
          label="Horario"
          value={horario}
        />

        <Info
          icon={<CalendarDays size={22} />}
          label="Sesión"
          value={sesion}
        />

      </div>

    </div>
  );
};

export default CardHorarioComponent;

// Subcomponente Info
const Info = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">

    <div className="flex items-center gap-2 text-blue-600 font-semibold uppercase tracking-wide text-xs sm:text-sm md:text-md xl:text-lg">
      {icon}
      {label}
    </div>

    <span className="font-medium text-gray-800 text-sm sm:text-base md:text-lg xl:text-xl">
      {value || "—"}
    </span>
  </div>
);
