import { useNavigate } from "react-router-dom";
import HoraryList from "../../pages/adminPage/HoraryList";
import { LayoutDashboard, LogOut } from "lucide-react";

const AdminComponent = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header
        className="px-6 py-4 flex justify-between items-center shadow"
        style={{ backgroundColor: "rgb(43,57,143)", color: "white" }}
      >
        <div className="flex items-center gap-2">
          <LayoutDashboard size={24} />
          <h1 className="text-xl font-bold">Panel Administrativo</h1>
        </div>
        <button
          onClick={logout}
          className="bg-white text-[rgb(43,57,143)] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </header>

      {/* CONTENIDO */}
      <main className="p-6">
        <HoraryList />
      </main>
    </div>
  );
};

export default AdminComponent;
