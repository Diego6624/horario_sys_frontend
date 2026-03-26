const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) return {};
  return { "Authorization": `Bearer ${user.token}` };
};

export const getAllCourses = async () => {
  const res = await fetch(`${API}/courses`, { headers: getAuthHeader() });
  if (!res.ok) throw new Error("Error obteniendo cursos");
  return await res.json();
};

export const createCourse = async (data) => {
  const res = await fetch(`${API}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando curso");
  return await res.json();
};

export const updateCourse = async (id, data) => {
  const res = await fetch(`${API}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando curso");
  return await res.json();
};

export default {
    getAllCourses,
    createCourse,
    updateCourse,
}
