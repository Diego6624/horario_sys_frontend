import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const data = await login(form);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Inicio de sesión exitoso");
      navigate("/admin");
    } catch (error) {
      toast.error("Credenciales incorrectas");
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[rgb(43,57,143)] via-[rgb(55,65,170)] to-[rgb(99,102,241)]">

      {/* CARD */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/20">
        
        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full 
          hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft className="text-[rgb(43,57,143)]" size={20} />
        </button>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[rgb(43,57,143)] tracking-tight">
            Systematic
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Acceso al panel administrativo
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="text"
              name="username"
              placeholder="ejemplo@correo.com"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm 
              focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-[rgb(43,57,143)] outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm 
              focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-[rgb(43,57,143)] outline-none transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[rgb(43,57,143)] hover:bg-[rgb(30,45,120)] text-white py-2.5 rounded-lg font-semibold 
            transition-all duration-300 flex justify-center items-center 
            gap-2 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Systematic. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;