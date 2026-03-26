const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) return {};
  return { "Authorization": `Bearer ${user.token}` };
};

export const getAllClassrooms = async () => {
  const res = await fetch(`${API}/classrooms`, { headers: getAuthHeader() });
  if (!res.ok) throw new Error("Error obteniendo aulas");
  return await res.json();
};

export const createClassroom = async (data) => {
  const res = await fetch(`${API}/classrooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando aula");
  return await res.json();
};
