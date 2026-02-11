import { useNavigate } from "react-router-dom";
import HoraryList from "../../pages/adminPage/HoraryList";

const AdminComponent = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };


  return (
    <div className="min-h-screen bg-gray-100">


      {/* HEADER */}
      <header className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Panel Administrativo</h1>
        <button
          onClick={logout}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
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