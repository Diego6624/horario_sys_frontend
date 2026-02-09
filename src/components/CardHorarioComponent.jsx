const CardHorarioComponent = ({ aula, docente, curso, horario, sesion }) => {
    return (
        <div className="
            flex-1
            bg-slate-800
            rounded-2xl
            shadow-2xl
            border border-slate-700
            flex
            flex-col
            min-w-[260px]
            h-full
        ">

            {/* HEADER */}
            <div className="
                bg-gradient-to-r
                from-blue-600
                to-blue-500
                text-center
                py-5
                px-10
                rounded-t-2xl
            ">
                <h2 className="text-3xl font-bold tracking-wide leading-tight">
                    {aula}
                </h2>
            </div>

            {/* BODY */}
            <div className="p-6 flex flex-col gap-6 flex-grow text-[1.1vw]">
                <Info label="DOCENTE" value={docente} />
                <Info label="CURSO" value={curso} />
                <Info label="HORARIO" value={horario} />
                <Info label="SESIÓN" value={sesion} />
            </div>
        </div>
    );
};

export default CardHorarioComponent;

/* Subcomponente interno */
const Info = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-slate-400 font-semibold tracking-wide">
            {label}
        </span>
        <span className="font-medium leading-snug">
            {value}
        </span>
    </div>
);