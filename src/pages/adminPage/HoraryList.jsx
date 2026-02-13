import { useEffect, useState } from "react";
import {
    getAllHoraries,
    toggleHorary,
} from "../../services/horaryService";

import HoraryEditModal from "../../components/HoraryEditModal";
import LoaderComponent from "../../components/LoaderComponent";

const HoraryList = () => {
    const [horaries, setHoraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const fetchData = async () => {
        setLoading(true);

        try {
            const data = await getAllHoraries();
            setHoraries(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // 👁️ Toggle mostrar / ocultar
    const handleToggle = async (id) => {
        try {
            await toggleHorary(id);
            fetchData(); // recargar lista
        } catch (error) {
            console.error("Error cambiando estado:", error);
        }
    };

    if (loading) return <LoaderComponent />;

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                    Gestión de Horarios
                </h2>

            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {horaries.map((h) => (
                    <div
                        key={h.id}
                        className={`rounded-xl shadow p-5 border hover:shadow-lg transition${h.enabled? "bg-white" : "bg-gray-200 opacity-60"}`}
                    >
                        <h3 className="font-bold text-lg text-indigo-600 mb-2">
                            Aula {h.numLab}
                        </h3>

                        <p><b>Docente:</b> {h.nameDocente || "—"}</p>
                        <p><b>Curso:</b> {h.nameCurso || "—"}</p>
                        <p><b>Horario:</b> {h.horario || "—"}</p>
                        <p><b>Sesión:</b> {h.numSesion || "—"}</p>

                        {/* BOTONES */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">

                            <button
                                onClick={() => setSelected(h)}
                                className="w-full sm:flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleToggle(h.id)}
                                className={`w-full sm:flex-1 py-2 rounded-lg text-white transition
                                    ${h.enabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                            >
                                {h.enabled ? "Ocultar" : "Mostrar"}
                            </button>

                        </div>

                    </div>
                ))}
            </div>

            {/* MODALES */}

            {selected && (
                <HoraryEditModal
                    horary={selected}
                    onClose={() => setSelected(null)}
                    onUpdated={fetchData}
                />
            )}
        </>
    );
};

export default HoraryList;
