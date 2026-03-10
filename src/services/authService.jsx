const AUTH = import.meta.env.VITE_AUTH_URL;

export const login = async (credentials) => {
  const res = await fetch(`${AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Error en login");
  return await res.json();
};
