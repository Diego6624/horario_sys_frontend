const API = import.meta.env.VITE_API_URL;

// Listar bloques
export const getAllSchedules = async () => {
  const res = await fetch(`${API}/api/schedules`);
  if (!res.ok) throw new Error("Error obteniendo bloques");
  return await res.json();
};

// Crear bloque
export const createSchedule = async (data) => {
  const res = await fetch(`${API}/api/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando bloque");
  return await res.json();
};

export default {
  getAllSchedules,
  createSchedule,
};
