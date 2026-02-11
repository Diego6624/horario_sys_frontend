import { useNavigate } from "react-router-dom";

const AdminComponent = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div>

      <h1>Panel Admin</h1>

      <button onClick={logout}>
        Cerrar sesión
      </button>

    </div>
  );
};

export default AdminComponent;
