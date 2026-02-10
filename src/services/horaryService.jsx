const API =
  "https://horario-sys-backend.onrender.com/api/horaries";

const getHoraries = async () => {

  const res = await fetch(API);

  if (!res.ok)
    throw new Error("Error obteniendo horarios");

  return await res.json();
};

export default getHoraries;
