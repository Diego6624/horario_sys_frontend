const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) return {};
  return { "Authorization": `Bearer ${user.token}` };
};

export const getAllTeachers = async () => {
  const res = await fetch(`${API}/teachers`, { headers: getAuthHeader() });
  if (!res.ok) throw new Error("Error obteniendo docentes");
  return await res.json();
};

export const createTeacher = async (data) => {
  const res = await fetch(`${API}/teachers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando docente");
  return await res.json();
};

export const getSubjectsByTeacher = async (id) => {
  const res = await fetch(`${API}/teachers/${id}/subjects`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Error obteniendo materias del docente");
  return await res.json();
};

export const updateTeacher = async (id, data) => {
  const res = await fetch(`${API}/teachers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando docente");
  return await res.json();
};

export const uploadTeacherPhoto = async (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/teachers/${id}/photo`, {
    method: "POST",
    headers: { ...getAuthHeader() },
    body: formData,
  });

  if (!res.ok) throw new Error("Error subiendo foto del docente");
  return await res.json();
};

export default { getAllTeachers, createTeacher, updateTeacher, uploadTeacherPhoto };