const CardHorarioAdminComponent = ({ aula, docente, curso, horario, sesion, estado }) => {
  const estadoClass =
    estado === "Libre" ? "badge badge-success" : "badge badge-info";

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="card-title">{aula}</h2>
          <span className={estadoClass}>{estado}</span>
        </div>

        {/* Info */}
        <p><span className="font-semibold">Docente:</span> {docente || "—"}</p>
        <p><span className="font-semibold">Curso:</span> {curso || "—"}</p>
        <p><span className="font-semibold">Horario:</span> {horario || "—"}</p>
        <p><span className="font-semibold">Sesión:</span> {sesion || "—"}</p>
      </div>
    </div>
  );
};

export default CardHorarioAdminComponent;