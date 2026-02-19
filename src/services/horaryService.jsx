const API =
  "https://horario-sys-backend.onrender.com/api/horaries";

export const getHoraries = async () => {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Error obteniendo horarios");
  return await res.json();
};

export const getHoraryByAula = async (aula) => {
  const res = await fetch(`${API}/aula/${aula}`);
  if (!res.ok) throw new Error("No se encontró el aula");
  return await res.json();
};

export const updateHorary = async (aula, data) => {
  const res = await fetch(`${API}/aula/${aula}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error actualizando horario");
  return await res.json();
};

// ===============================
// 🛠️ ADMIN → TODOS
// ===============================
export const getAllHoraries = async () => {
  const res = await fetch(`${API}/all`);
  if (!res.ok) throw new Error("Error obteniendo horarios");
  return await res.json();
};

// ===============================
// 👁️ TOGGLE
// ===============================
export const toggleHorary = async (id) => {
  const res = await fetch(`${API}/toggle/${id}`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Error cambiando estado");
  return await res.json();
};

export const getStatuses = async () => {
  const res = await fetch(`${API}/status`);
  if (!res.ok) throw new Error("Error obteniendo estados");
  return await res.json();
};

// ===============================
// 🔄 CAMBIAR ESTADO
// ===============================
export const changeStatus = async (horaryId, statusId) => {
  const res = await fetch(
    `${API}/${horaryId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statusId: Number(statusId),
      }),
    }
  );

  if (!res.ok)
    throw new Error("Error cambiando estado");

  return res.json();
};

export const getTurn = async () => {
  const res = await fetch(`${API}/current-shift`);

  if (!res.ok) throw new Error("Error obteniendo turno actual");
  
  return await res.text();
};

export const connecHealth = `${API}/ping`

export default {
  getHoraries,
  getHoraryByAula,
  updateHorary,
  getAllHoraries,
  getStatuses,
  changeStatus,
  toggleHorary,
};

