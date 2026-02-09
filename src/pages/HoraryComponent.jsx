import CardHorarioComponent from "../components/CardHorarioComponent";

const HoraryComponent = () => {

    const horarios = [
        {
            aula: "Laboratorio multiuso",
            docente: "—",
            curso: "Oratoria",
            horario: "06:00 PM - 10:00 PM",
            sesion: "Tercera Clase"
        },
        {
            aula: "Laboratorio 201",
            docente: "—",
            curso: "Excel Intermedio",
            horario: "06:00 PM - 10:00 PM",
            sesion: "Tercera Clase"
        },
        {
            aula: "Laboratorio 202",
            docente: "—",
            curso: "Excel Intermedio",
            horario: "06:00 PM - 10:00 PM",
            sesion: "Tercera Clase"
        },
        {
            aula: "Laboratorio 301",
            docente: "Cesar Raul Morales Ticona",
            curso: "Excel Profesional",
            horario: "06:00 PM - 10:00 PM",
            sesion: "Tercera Clase"
        },
        {
            aula: "Laboratorio 401",
            docente: "Christian Anthony Rodas Donayre",
            curso: "Ofimática Empresarial",
            horario: "06:00 PM - 10:00 PM",
            sesion: "Tercera Clase"
        },
        {
            aula: "Laboratorio 402",
            docente: "David Jesías Palomino García",
            curso: "Power BI",
            horario: "06:00 PM - 10:00 PM",
            sesion: "Tercera Clase"
        }
    ];

    return (
        <div className="w-screen h-screen bg-slate-900 text-white flex flex-col">

            {/* HEADER */}
            <div className="text-center py-6 border-b border-slate-700">
                <h1 className="text-5xl font-extrabold tracking-wider">
                    DISTRIBUCIÓN DE LAS AULAS DE CLASE
                </h1>
                <p className="text-2xl text-slate-300 mt-2">
                    Turno Mañana
                </p>
            </div>

            {/* CARDS ROW */}
            <div className="
            flex
            flex-wrap
            gap-6
            p-6
            overflow-hidden
        ">
                {horarios.map((h, index) => (
                    <CardHorarioComponent
                        key={index}
                        aula={h.aula}
                        docente={h.docente}
                        curso={h.curso}
                        horario={h.horario}
                        sesion={h.sesion}
                    />
                ))}
            </div>

        </div>
    );
}

export default HoraryComponent;
