const API = import.meta.env.VITE_API_URL;

// Horarios activos
export const getHoraries = async () => {
  const res = await fetch(`${API}/api/horaries`);
  if (!res.ok) throw new Error("Error obteniendo horarios");
  return await res.json();
};

// Buscar por aula
export const getHoraryByAula = async (aula) => {
  const res = await fetch(`${API}/api/horaries/aula/${aula}`);
  if (!res.ok) throw new Error("No se encontró el aula");
  return await res.json();
};

// Actualizar horario
export const updateHorary = async (aula, data) => {
  const res = await fetch(`${API}/api/horaries/aula/${aula}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando horario");
  return await res.json();
};

// Todos los horarios
export const getAllHoraries = async () => {
  const res = await fetch(`${API}/api/horaries/all`);
  if (!res.ok) throw new Error("Error obteniendo horarios");
  return await res.json();
};

// Toggle
export const toggleHorary = async (id) => {
  const res = await fetch(`${API}/api/horaries/toggle/${id}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Error cambiando estado");
  return await res.json();
};

// Estados
export const getStatuses = async () => {
  const res = await fetch(`${API}/api/horaries/status`);
  if (!res.ok) throw new Error("Error obteniendo estados");
  return await res.json();
};

// Cambiar estado
export const changeStatus = async (horaryId, statusId) => {
  const res = await fetch(`${API}/api/horaries/${horaryId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ statusId: Number(statusId) }),
  });
  if (!res.ok) throw new Error("Error cambiando estado");
  return res.json();
};

// Turno actual
export const getTurn = async () => {
  const res = await fetch(`${API}/api/horaries/current-shift`);
  if (!res.ok) throw new Error("Error obteniendo turno actual");
  return await res.text();
};

// Health check
export const connecHealth = `${API}/ping`;

export default {
  getHoraries,
  getHoraryByAula,
  updateHorary,
  getAllHoraries,
  getStatuses,
  changeStatus,
  toggleHorary,
  getTurn,
  connecHealth,
};
