const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return {};
  const credentials = btoa(`${user.username}:${user.password}`);
  return { "Authorization": `Basic ${credentials}` };
};

export const getAllSubjects = async () => {
  const res = await fetch(`${API}/subjects`, { headers: getAuthHeader() });
  if (!res.ok) throw new Error("Error obteniendo materias");
  return await res.json();
};

export const createSubject = async (data) => {
  const res = await fetch(`${API}/subjects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando materia");
  return await res.json();
};

export const updateSubject = async (id, data) => {
  const res = await fetch(`${API}/subjects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando materia");
  return await res.json();
};

export const deleteSubject = async (id) => {
  const res = await fetch(`${API}/subjects/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Error eliminando materia");
};

// subjectService.js
export const createSubjectWithMultipleSchedules = async (data) => {
  const res = await fetch(`${API}/subject-sessions/multi`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando asignatura con múltiples horarios");
  return await res.json();
};

export const getSchedulesBySubjectSession = async (id) => {
  const res = await fetch(`${API}/subject-sessions/${id}/schedules`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Error obteniendo horarios de la asignatura");
  return await res.json();
};


export default {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  createSubjectWithMultipleSchedules,
  getSchedulesBySubjectSession,
};
