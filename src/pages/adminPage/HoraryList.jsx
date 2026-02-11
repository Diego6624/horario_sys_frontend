import { useEffect, useState } from "react";
import {
    getHoraries,
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
            const data = await getHoraries();
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
                        className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition"
                    >
                        <h3 className="font-bold text-lg text-indigo-600 mb-2">
                            Aula {h.numLab}
                        </h3>

                        <p><b>Docente:</b> {h.nameDocente || "—"}</p>
                        <p><b>Curso:</b> {h.nameCurso || "—"}</p>
                        <p><b>Horario:</b> {h.horario || "—"}</p>
                        <p><b>Sesión:</b> {h.numSesion || "—"}</p>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => setSelected(h)}
                                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Editar
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
