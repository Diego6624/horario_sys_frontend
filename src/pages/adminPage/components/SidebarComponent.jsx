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
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="bg-[rgb(43,57,143)] text-white border-none"
    >
      {/* HEADER */}
      <div className="p-4 border-b border-white/20 flex items-center gap-3">
        <LayoutDashboard size={24} />
        <h2 className="text-xl font-bold">Panel Admin</h2>
      </div>

      {/* NAV */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80">
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
                        `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-white text-[rgb(43,57,143)] font-semibold"
                            : "hover:bg-white/10"
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
      <SidebarFooter className="p-4 border-t border-white/20">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;