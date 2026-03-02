import { Outlet } from "react-router-dom";
import SidebarComponent from "./components/SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

const IndexAdmin = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        {/* Sidebar */}
        <SidebarComponent />

        {/* Contenido */}
        <div className="flex-1 flex flex-col bg-gray-100">

          {/* Header Mobile */}
          <header className="md:hidden px-6 py-4 flex items-center gap-4 shadow bg-[rgb(43,57,143)] text-white">
            
            {/* Este botón controla el sidebar REAL de shadcn */}
            <SidebarTrigger>
              <Menu size={28} />
            </SidebarTrigger>

            <h1 className="text-xl font-bold">Panel Administrativo</h1>
          </header>

          <main className="p-6 flex-1">
            <Outlet />
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
};

export default IndexAdmin;