const API = import.meta.env.VITE_API_URL;

// Helper para armar el header Authorization
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return {};
  const credentials = btoa(`${user.username}:${user.password}`);
  return { "Authorization": `Basic ${credentials}` };
};

export const getAllSchedules = async () => {
  const res = await fetch(`${API}/schedules`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error("Error obteniendo horarios");
  return await res.json();
};

export const getSchedulesByDay = async (day) => {
  const res = await fetch(`${API}/schedules/day/${day}`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error("Error obteniendo horarios por día");
  return await res.json();
};

export const getSchedulesByClassroom = async (id) => {
  const res = await fetch(`${API}/schedules/classroom/${id}`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error("Error obteniendo horarios por aula");
  return await res.json();
};

export const getSchedulesBySubject = async (id) => {
  const res = await fetch(`${API}/schedules/subject/${id}`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error("Error obteniendo horarios por materia");
  return await res.json();
};

export const getCurrentSchedules = async () => {
  const res = await fetch(`${API}/schedules/current`, {
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error("Error obteniendo estado actual");
  return await res.json();
};

export const createSchedule = async (data) => {
  const res = await fetch(`${API}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando horario");
  return await res.json();
};

export const updateSchedule = async (id, data) => {
  const res = await fetch(`${API}/schedules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando horario");
  return await res.json();
};

export const updateScheduleEstado = async (id, estado) => {
  const res = await fetch(`${API}/schedules/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error("Error actualizando estado");
  return await res.json();
};

export default {
  getAllSchedules,
  createSchedule,
  getSchedulesByDay,
  getSchedulesByClassroom,
  getSchedulesBySubject,
  getCurrentSchedules,
  updateSchedule,
};
