import { useEffect, useState } from "react";
import {
  updateHorary,
  getStatuses
} from "../services/horaryService";

const HoraryEditModal = ({ horary, onClose, onUpdated }) => {

  const [statuses, setStatuses] = useState([]);

  const [form, setForm] = useState({
    nameDocente: horary.nameDocente || "",
    nameCurso: horary.nameCurso || "",
    horario: horary.horario || "",
    numSesion: horary.numSesion || "",
    statusId: horary.status?.id || ""
  });

  // ===============================
  // 📦 Cargar estados
  // ===============================
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getStatuses();
        setStatuses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatuses();
  }, []);

  // ===============================
  // ✏️ Cambios form
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ===============================
  // 💾 Submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        nameDocente: form.nameDocente,
        nameCurso: form.nameCurso,
        horario: form.horario,
        numSesion: form.numSesion,
        status: {
          id: Number(form.statusId)
        }
      };

      await updateHorary(horary.numLab, payload);

      await onUpdated();
      onClose();

    } catch (err) {
      console.error("Error actualizando:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-xl"
      >

        <h2 className="text-xl font-bold text-center">
          Editar Aula {horary.numLab}
        </h2>

        {/* DOCENTE */}
        <div>
          <label className="text-sm font-semibold">Docente</label>
          <input
            name="nameDocente"
            value={form.nameDocente}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* CURSO */}
        <div>
          <label className="text-sm font-semibold">Curso</label>
          <input
            name="nameCurso"
            value={form.nameCurso}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* HORARIO */}
        <div>
          <label className="text-sm font-semibold">Horario</label>
          <input
            name="horario"
            value={form.horario}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* SESION */}
        <div>
          <label className="text-sm font-semibold">Sesión</label>
          <input
            name="numSesion"
            value={form.numSesion}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* ESTADO 🔥 */}
        <div>
          <label className="text-sm font-semibold">Estado</label>

          <select
            name="statusId"
            value={form.statusId}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >

            {statuses.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}

          </select>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-2 pt-2">

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>

        </div>
      </form>
    </div>
  );
};

export default HoraryEditModal;