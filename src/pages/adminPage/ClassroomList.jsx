import { useEffect, useState } from "react";
import { getAllClassrooms, createClassroom } from "../../services/classroomService";

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [newName, setNewName] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllClassrooms();
      setClassrooms(data);
    } catch (err) {
      console.error("Error cargando aulas:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      await createClassroom({ nombre: newName });
      setNewName("");
      fetchData();
    } catch (err) {
      console.error("Error creando aula:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Gestión de Aulas</h2>
      <ul className="list-disc pl-6">
        {classrooms.map((c) => (
          <li key={c.id}>{c.nombre}</li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre del aula"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Aula
        </button>
      </div>
    </div>
  );
};

export default ClassroomList;
