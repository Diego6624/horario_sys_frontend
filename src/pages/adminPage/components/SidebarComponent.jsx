import { NavLink, useNavigate } from "react-router-dom";
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  User,
  BookText,
  BookOpen,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "../../../services/authService";

const navLink = [
  { to: "/admin/horarios", icon: Calendar, label: "Horarios" },
  { to: "/admin/materias", icon: BookText, label: "Materias" },
  { to: "/admin/docentes", icon: User, label: "Docentes" },
  { to: "/admin/cursos", icon: BookOpen, label: "Cursos" },
];

// ── Subcomponente que usa el hook de contexto del sidebar ────────────────────
const SidebarInner = () => {
  const navigate = useNavigate();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNav = () => {
    if (isMobile) setOpenMobile(false);
  };

  const handleLogout = () => {
    if (isMobile) setOpenMobile(false);
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full w-full bg-[rgb(43,57,143)] text-white">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/15">
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
          <LayoutDashboard size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm md:text-md font-semibold uppercase tracking-widest text-white/50 leading-none mb-0.5">
            Sistema
          </p>
          <h2 className="text-md md:text-lg font-bold text-white leading-none">
            Panel Admin
          </h2>
        </div>
      </div>

      {/* ── NAV ────────────────────────────────────────────────── */}
      <SidebarContent className="flex-1 px-3 py-4 bg-[rgb(43,57,143)] overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-[12px] md:text-[15px] font-bold tracking-[0.18em] uppercase px-2 mb-2">
            Navegación
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-0.5">
              {navLink.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={handleNav}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-lg md:text-lg font-medium ${isActive
                          ? "bg-white text-[rgb(43,57,143)] font-semibold shadow-sm"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex md:hidden justify-center items-center text-center gap-2">
                            <Icon
                              size={18}
                              className={isActive ? "text-[rgb(43,57,143)]" : "text-white/70"}
                            />
                            {item.label}
                          </div>
                          <div className="hidden md:flex justify-center items-center text-center gap-2">
                            <Icon
                              size={20}
                              className={isActive ? "text-[rgb(43,57,143)]" : "text-white/70"}
                            />
                            {item.label}
                          </div>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <SidebarFooter className="px-3 py-3 border-t border-white/15 bg-[rgb(43,57,143)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer"
        >
          <LogOut size={17} className="text-white/70" />
          Cerrar sesión
        </button>
      </SidebarFooter>

    </div>
  );
};

// ── Componente exportado ─────────────────────────────────────────────────────
const SidebarComponent = () => (
  <Sidebar collapsible="offcanvas">
    <SidebarInner />
  </Sidebar>
);

export default SidebarComponent;