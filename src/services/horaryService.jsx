const API = import.meta.env.VITE_API_URL;

// ===============================
// 📺 HORARIES
// ===============================

// Horarios activos (solo habilitados)
export const getHoraries = async () => {
  const res = await fetch(`${API}/api/horaries`);
  if (!res.ok) throw new Error("Error obteniendo horarios");
  return await res.json();
};

// Estados (desde StatusController)
export const getStatuses = async () => {
  const res = await fetch(`${API}/api/horaries/status`);
  if (!res.ok) throw new Error("Error obteniendo estados");
  return await res.json();
};

// Todos los horarios (admin)
export const getAllHoraries = async () => {
  const res = await fetch(`${API}/api/horaries/all`);
  if (!res.ok) throw new Error("Error obteniendo todos los horarios");
  return await res.json();
};

// Buscar por aula
export const getHoraryByClassroom = async (id) => {
  const res = await fetch(`${API}/api/horaries/classroom/${id}`);
  if (!res.ok) throw new Error("No se encontró el aula");
  return await res.json();
};

// Buscar por día
export const getHoraryByDay = async (day) => {
  const res = await fetch(`${API}/api/horaries/day/${day}`);
  if (!res.ok) throw new Error("Error obteniendo horarios por día");
  return await res.json();
};

// Crear horario
export const createHorary = async (data) => {
  const res = await fetch(`${API}/api/horaries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando horario");
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

// Toggle habilitar/deshabilitar
export const toggleHorary = async (id) => {
  const res = await fetch(`${API}/api/horaries/toggle/${id}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Error cambiando habilitación");
  return await res.json();
};

// Turno actual
export const getCurrentShift = async () => {
  const res = await fetch(`${API}/api/horaries/current-shift`);
  if (!res.ok) throw new Error("Error obteniendo turno actual");
  return await res.text();
};

// ===============================
// 🏫 CLASSROOMS
// ===============================

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

// ===============================
// 📚 SCHEDULES
// ===============================

// Crear bloque semanal
export const createSchedule = async (data) => {
  const res = await fetch(`${API}/api/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando bloque");
  return await res.json();
};

// ===============================
// 🔄 HEALTH CHECK
// ===============================
export const connectHealth = `${API}/ping`;

export default {
  getHoraries,
  getAllHoraries,
  getHoraryByClassroom,
  getHoraryByDay,
  createHorary,
  changeStatus,
  toggleHorary,
  getCurrentShift,
  createClassroom,
  createSchedule,
  connectHealth,
};
