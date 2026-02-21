import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_AUTH_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        alert("Credenciales incorrectas");
        return;
      }

      const data = await res.json();

      // ✅ Guardar usuario
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/admin");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Logo / título */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Systematic
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Acceso al panel administrativo
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="text"
              name="username"
              placeholder="ejemplo@correo.com"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Ingresar
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Systematic. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
