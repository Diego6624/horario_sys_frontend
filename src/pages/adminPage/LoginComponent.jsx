import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { toast } from "react-toastify";
import { ArrowLeft, Lock, User } from "lucide-react";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4"
      style={{ background: "#060c1f" }}
    >
      {/* Fondo con gradientes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(43,57,143,0.7) 0%, transparent 70%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 40% at 80% 110%, rgba(59,130,246,0.15) 0%, transparent 60%)",
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium">Volver</span>
      </button>

      {/* CARD */}
      <div
        className="relative w-full max-w-sm sm:max-w-md"
        style={{
          background: "rgba(10,15,35,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(43,57,143,0.2)",
          padding: "clamp(24px, 5vw, 40px)",
        }}
      >
        {/* Brillo top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(99,179,237,0.5), transparent)" }}
        />

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ background: "rgba(43,57,143,0.4)", border: "1px solid rgba(99,179,237,0.2)" }}
          >
            <Lock size={20} className="text-blue-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Systematic
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Acceso al panel administrativo
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* USERNAME */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Usuario
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                name="username"
                placeholder="ejemplo@correo.com"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={e => e.target.style.border = "1px solid rgba(99,179,237,0.5)"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Contraseña
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={e => e.target.style.border = "1px solid rgba(99,179,237,0.5)"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white flex justify-center items-center gap-2 transition-all cursor-pointer active:scale-[0.98] mt-2"
            style={{
              background: loading
                ? "rgba(43,57,143,0.5)"
                : "linear-gradient(135deg, rgb(43,57,143) 0%, rgb(59,80,180) 100%)",
              boxShadow: loading ? "none" : "0 4px 20px rgba(43,57,143,0.5)",
              border: "1px solid rgba(99,179,237,0.2)",
            }}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-slate-600 text-center mt-6">
          © {new Date().getFullYear()} Systematic. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;