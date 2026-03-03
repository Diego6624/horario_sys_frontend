import { NavLink, useNavigate } from "react-router-dom";
import {
  Calendar,
  PlusCircle,
  Layers,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navLink = [
  { to: "/admin/horarios", icon: Calendar, label: "Horarios" },
  { to: "/admin/crear-horario", icon: PlusCircle, label: "Crear Horario" },
  { to: "/admin/bloques", icon: Layers, label: "Bloques" },
];

const SidebarComponent = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Sidebar collapsible="offcanvas">

      {/* CONTENEDOR REAL CON COLOR */}
      <div className="flex flex-col h-full bg-[rgb(43,57,143)] text-white">

        {/* HEADER */}
        <div className="p-4 border-b border-white/20 flex justify-center items-center gap-3">
          <LayoutDashboard size={24} />
          <h2 className="text-xl font-bold uppercase">Panel Admin</h2>
        </div>

        {/* NAV */}
        <SidebarContent className="px-2 py-4 bg-[rgb(43,57,143)]">
          <SidebarGroup className="flex flex-col gap-3">
            <SidebarGroupLabel className="text-white/80 text-md font-semibold">
              Navegación
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {navLink.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-lg ${
                            isActive
                              ? "bg-white text-[rgb(43,57,143)] font-semibold"
                              : "text-white hover:bg-white/10"
                          }`
                        }
                      >
                        <Icon size={20} />
                        {item.label}
                      </NavLink>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="p-4 border-t border-white/20 bg-[rgb(43,57,143)]">
          <button
            onClick={logout}
            className="w-full text-lg font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition cursor-pointer"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </SidebarFooter>

      </div>
    </Sidebar>
  );
};

export default SidebarComponent;