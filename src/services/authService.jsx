const AUTH = import.meta.env.VITE_AUTH_URL;

// ===============================
// 🔑 Login
// ===============================
export const login = async (credentials) => {
  const res = await fetch(`${AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Error en login");

  const data = await res.json();

  // Guardar usuario + token en localStorage
  localStorage.setItem("user", JSON.stringify(data));

  return data;
};

// ===============================
// 🚪 Logout
// ===============================
export const logout = () => {
  localStorage.removeItem("user");
};

// ===============================
// 👤 Obtener usuario actual
// ===============================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ===============================
// 🛡️ Header con token
// ===============================
export const getAuthHeader = () => {
  const user = getCurrentUser();
  if (!user || !user.token) return {};
  return { "Authorization": `Bearer ${user.token}` };
};
