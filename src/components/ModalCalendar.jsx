import { User, MapPin, Clock, BookText, ListOrdered, X } from "lucide-react";
import { useState } from "react";
import { updateScheduleEstado } from "../services/scheduleService";

const ModalCalendar = ({ event, onClose, refreshSchedules }) => {
  if (!event) return null;

  const [loading, setLoading] = useState(false);

  const handleChangeEstado = async (nuevoEstado) => {
    try {
      setLoading(true);
      await updateScheduleEstado(event.id, nuevoEstado);
      await refreshSchedules(); // refresca el calendario
      onClose(); // cierra modal
    } catch (err) {
      console.error("Error actualizando clase:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center w-auto z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-auto flex flex-col relative">

        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-min h-auto">
            <h2 className="text-2xl text-center font-bold mb-2 flex items-center gap-2 text-gray-900 w-max">
              {event.course.toUpperCase()}
            </h2>
            <hr className="border-t border-blue-400 w-full" />
          </div>
        </div>

        {/* Estado */}
        <div className="text-center mb-4">
          {event.estado === "Cancelado" ? (
            <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
              CANCELADA
            </span>
          ) : (
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
              ACTIVA
            </span>
          )}
        </div>

        {/* Grid de detalles */}
        <div className="grid grid-cols-3 gap-7 text-lg text-gray-800">
          {/* Docente */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <User size={22} className="text-blue-600" />
              <span>DOCENTE:</span>
            </div>
            <span className="font-medium">{event.teacher}</span>
          </div>

          {/* Módulo */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <BookText className="w-5 h-5 text-blue-600" />
              <span>MÓDULO:</span>
            </div>
            <span className="font-medium">{event.modulo || "N/A"}</span>
          </div>

          {/* Sesión */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <ListOrdered className="w-5 h-5 text-blue-600" />
              <span>SESIÓN:</span>
            </div>
            <span className="font-medium">{event.sesion || "N/A"}</span>
          </div>

          {/* Hora */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>HORA:</span>
            </div>
            <span className="font-medium">{event.hora}</span>
          </div>

          {/* Aula */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>AULA:</span>
            </div>
            <span className="font-medium">{event.aula}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4 gap-3">
          {event.estado === "Cancelado" ? (
            <button
              onClick={() => handleChangeEstado("Libre")}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-base cursor-pointer"
            >
              {loading ? "Reactivando..." : "Reactivar clase"}
            </button>
          ) : (
            <button
              onClick={() => handleChangeEstado("Cancelado")}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-base cursor-pointer"
            >
              {loading ? "Cancelando..." : "Cancelar clase"}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-base cursor-pointer flex items-center gap-1"
          >
            <X className="w-5 h-5 inline-block" />
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalendar;
