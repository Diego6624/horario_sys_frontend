import { useEffect, useState } from "react";
import {
    getAllHoraries,
    toggleHorary,
    changeStatus,
    getStatuses,
} from "../../services/horaryService";

import HoraryEditModal from "../../components/HoraryEditModal";
import LoaderComponent from "../../components/LoaderComponent";

const HoraryList = () => {
    const [horaries, setHoraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [statuses, setStatuses] = useState([]);

    // ===============================
    // 📦 Cargar horarios
    // ===============================
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
    };

    // ===============================
    // 📦 Cargar estados
    // ===============================
    const fetchStatuses = async () => {
        try {
            const data = await getStatuses();
            setStatuses(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStatuses();
    }, []);

    // ===============================
    // 👁️ Toggle mostrar / ocultar
    // ===============================
    const handleToggle = async (id) => {
        try {
            await toggleHorary(id);
            fetchData();
        } catch (error) {
            console.error("Error cambiando visibilidad:", error);
        }
    };

    // ===============================
    // 🔄 Cambiar estado
    // ===============================
    const handleStatusChange = async (horaryId, statusId) => {
        if (!statusId) return;

        try {
            await changeStatus(horaryId, statusId);
            fetchData();
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
                        className="rounded-xl shadow p-5 border bg-white hover:shadow-lg transition"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-lg text-indigo-600">
                                Aula {h.numLab}
                            </h3>

                            {/* BADGE ESTADO */}
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-semibold text-white
                                    ${
                                        h.status?.name === "Disponible"
                                            ? "bg-green-500"
                                            : h.status?.name === "Ocupado"
                                            ? "bg-red-500"
                                            : "bg-gray-400"
                                    }`}
                            >
                                {h.status?.name || "Sin estado"}
                            </span>
                        </div>

                        {/* INFO */}
                        <p><b>Docente:</b> {h.nameDocente || "—"}</p>
                        <p><b>Curso:</b> {h.nameCurso || "—"}</p>
                        <p><b>Horario:</b> {h.horario || "—"}</p>
                        <p><b>Sesión:</b> {h.numSesion || "—"}</p>

                        {/* ACCIONES */}
                        <div className="flex gap-2 mt-4">

                            {/* EDITAR */}
                            <button
                                onClick={() => setSelected(h)}
                                className="w-full sm:flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Editar
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
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