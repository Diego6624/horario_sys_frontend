const CardHorarioComponent = ({ aula, docente, curso, horario, sesion }) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col w-full h-full">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-center py-3 px-4 rounded-t-xl">
                <h2 className="text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-white">
                    Aula {aula}
                </h2>

            </div>

            {/* BODY */}
            <div className="p-4 flex flex-col gap-3 flex-grow">
                <Info label="Docente" value={docente} />
                <Info label="Curso" value={curso} />
                <Info label="Horario" value={horario} />
                <Info label="Sesión" value={sesion} />
            </div>
        </div>

    );
};

export default CardHorarioComponent;

// Subcomponente Info
const Info = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-gray-500 font-semibold uppercase tracking-wide text-xs sm:text-sm">
            {label}
        </span>
        <span className="font-medium text-gray-800 text-sm sm:text-base md:text-lg xl:text-xl"> 
            {value} 
        </span>
    </div>
);
