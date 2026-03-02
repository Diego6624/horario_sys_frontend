const API = import.meta.env.VITE_API_URL;

// Listar aulas
export const getAllClassrooms = async () => {
  const res = await fetch(`${API}/api/classrooms`);
  if (!res.ok) throw new Error("Error obteniendo aulas");
  return await res.json();
};

// Crear aula
export const createClassroom = async (data) => {
  const res = await fetch(`${API}/api/classrooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando aula");
  return await res.json();
};

export default {
  getAllClassrooms,
  createClassroom,
};
