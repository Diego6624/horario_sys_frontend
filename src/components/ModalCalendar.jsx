import {
  User,
  MapPin,
  Clock,
  BookText,
  ListOrdered,
  X,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import { updateScheduleEstado } from "../services/scheduleService";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ModalCalendar = ({ event, onClose, refreshSchedules }) => {
  if (!event) return null;

  const [loading, setLoading] = useState(false);

  const handleChangeEstado = async (nuevoEstado) => {
    try {
      setLoading(true);
      await updateScheduleEstado(event.id, nuevoEstado);
      await refreshSchedules();
      onClose();
    } catch (err) {
      console.error("Error actualizando clase:", err);
    } finally {
      setLoading(false);
    }
  };

  const isCancelado = event.estado === "Cancelado";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* HEADER */}
        <div
          className={`flex justify-between items-center px-6 py-4 ${isCancelado
            ? "bg-red-700"
            : "bg-[rgb(43,57,143)]"
            }`}
        >
          <div className="flex items-center gap-3">
            <CalendarDays size={22} className="text-white" />

            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-semibold text-white">
                {event.course.toUpperCase()}
              </h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-white/20 text-white border-white/30">
            {isCancelado ? "Cancelada" : "Activa"}
          </span>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Docente */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <User className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Docente</p>
                <p className="font-semibold text-gray-800">{event.teacher}</p>
              </div>
            </div>

            {/* Módulo */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <BookText className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Módulo</p>
                <p className="font-semibold text-gray-800">{event.modulo || "N/A"}</p>
              </div>
            </div>

            {/* Sesión */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <ListOrdered className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Sesión</p>
                <p className="font-semibold text-gray-800">{event.sesion || "N/A"}</p>
              </div>
            </div>

            {/* Horario */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <Clock className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Horario</p>
                <p className="font-semibold text-gray-800">{event.hora}</p>
              </div>
            </div>

            {/* 🔹 Fecha de la sesión */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <CalendarDays className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Fecha de sesión</p>
                <p className="font-semibold text-gray-800">
                  {event.fechaSesion
                    ? new Date(event.fechaSesion).toISOString().split("T")[0]
                    : "—"}
                </p>
              </div>
            </div>


            {/* Aula */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <MapPin className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Aula</p>
                <p className="font-semibold text-gray-800">{event.aula}</p>
              </div>
            </div>

          </div>


        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-300 bg-gray-50">

          {/* SWITCH PRO */}
          <div className="flex items-center space-x-3">

            <Switch
              id="estado-clase"
              checked={!isCancelado}
              disabled={loading}
              onCheckedChange={(checked) => {
                const nuevoEstado = checked ? "Libre" : "Cancelado";
                handleChangeEstado(nuevoEstado);
              }}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />

            <Label htmlFor="estado-clase" className="text-sm font-medium">
              {loading
                ? "Actualizando..."
                : !isCancelado
                  ? "Clase activa"
                  : "Clase cancelada"}
            </Label>

          </div>

          {/* BOTÓN CERRAR */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition flex items-center gap-2"
          >
            <X size={18} />
            Cerrar
          </button>

        </div>

      </div>
    </div>
  );
};

export default ModalCalendar;