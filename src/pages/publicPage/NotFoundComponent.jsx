const NotFoundComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
    bg-linear-to-br from-[rgb(43,57,143)] via-[rgb(55,65,170)] to-[rgb(99,102,241)] text-white px-4">

      {/* CARD */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 
      rounded-2xl shadow-2xl p-10 text-center max-w-md w-full">

        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-2">404</h1>

        <h2 className="text-xl font-semibold mb-2">
          Página no encontrada
        </h2>

        <p className="text-sm text-white/80 mb-6">
          La página que estás buscando no existe o fue movida.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => window.location.href = "/"}
          className="bg-white text-[rgb(43,57,143)] px-6 py-2 rounded-lg 
          font-semibold hover:bg-gray-100 transition shadow-md hover:shadow-lg cursor-pointer"
        >
          Volver al inicio
        </button>
      </div>

      {/* FOOTER */}
      <p className="text-xs text-white/70 mt-6">
        © {new Date().getFullYear()} Systematic
      </p>
    </div>
  );
};

export default NotFoundComponent;