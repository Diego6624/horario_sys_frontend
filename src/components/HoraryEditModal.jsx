import { useState } from "react";
import { updateHorary } from "../services/horaryService";

const HoraryEditModal = ({ horary, onClose, onUpdated }) => {

    // 👇 Solo campos editables
    const [form, setForm] = useState({
        nameDocente: horary.nameDocente || "",
        nameCurso: horary.nameCurso || "",
        horario: horary.horario || "",
        numSesion: horary.numSesion || "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateHorary(horary.numLab, form);

            await onUpdated();

            onClose();
        } catch (err) {
            console.error(err);
        }
    }

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