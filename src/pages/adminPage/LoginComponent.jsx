import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
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
        "https://horario-sys-backend.onrender.com/api/auth/login",
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

      // 🧠 Guardar token
      localStorage.setItem("token", data.token);

      // 🔁 Redirigir al panel
      navigate("/admin");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login Admin</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
