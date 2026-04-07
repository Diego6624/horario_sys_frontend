import { Outlet } from "react-router-dom";
import SidebarComponent from "./components/SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";

const IndexAdmin = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        {/* Sidebar */}
        <SidebarComponent />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col bg-gray-100 min-w-0">

          {/* Header Mobile */}
          <header className="md:hidden flex justify-between items-center px-4 py-3 bg-[rgb(43,57,143)] text-white shadow-md">
            <SidebarTrigger className="p-2 rounded-lg hover:bg-white/20 transition text-white" />
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              <h1 className="text-base font-bold">Panel Administrativo</h1>
            </div>
            {/* Spacer para centrar el título */}
            <div className="w-9" />
          </header>

          <main className="p-4 sm:p-6 flex-1">
            <Outlet />
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
};

export default IndexAdmin;