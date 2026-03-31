import { useEffect, useState } from "react";
import CardHorarioComponent from "../../components/CardHorarioComponent";
import LoaderComponent from "../../components/LoaderComponent";
import { connectSocket, disconnectSocket } from "../../services/socketService";
import { getCurrentSchedules } from "../../services/scheduleService";
import { getAllSubjectsPublic } from "../../services/subjectService";
import useClock from "../../hooks/useClock";
import useTimeTheme from "../../hooks/useTimeTheme";

const HoraryComponent = () => {
  const [horarios, setHorarios] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const time = useClock();
  const theme = useTimeTheme();

  const isDark = theme === "dark";

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const schs = await getCurrentSchedules();
      const subs = await getAllSubjectsPublic();
      setHorarios(schs);
      setSubjects(subs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
    connectSocket((data) => setHorarios(data));
    return () => disconnectSocket();
  }, []);

  const timeStr = time.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [hh, mm] = timeStr.split(":");

  const tokens = isDark
    ? {
      pageBg: "#060c1f",
      bg: "bg-[url('/image/bg_imageDark.png')]",
      imgOpacity: "opacity-20",
      radial:"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(43,57,143,0.35) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59,130,246,0.15) 0%, transparent 60%)",
      gridColor: "rgba(99,179,237,1)",
      headerBg: "rgba(6, 12, 31, 0.75)",
      headerBorder: "rgba(99,179,237,0.12)",
      headerShadow: "0 1px 0 rgba(99,179,237,0.08)",
      logoBg: "bg-gradient-to-br from-blue-500/30 to-blue-500/10 backdrop-blur-sm border border-blue-500/20",
      title: "#e2e8f0",
      turnoBg: "rgba(59,130,246,0.15)",
      turnoBorder: "rgba(59,130,246,0.3)",
      turnoText: "#93c5fd",
      clockBg: "rgba(59,130,246,0.08)",
      clockBorder: "rgba(59,130,246,0.18)",
      clockText: "#e2e8f0",
      clockSep: "#60a5fa",
      legendText: "#94a3b8",
      footerBg: "rgba(6,12,31,0.75)",
      footerBorder: "rgba(99,179,237,0.1)",
    }
    : {
      pageBg: "linear-gradient(160deg, #dce8ff 0%, #eef2fb 40%, #f5f0ff 100%)",
      bg: "bg-[url('/image/bg_image.png')]",
      imgOpacity: "opacity-80",
      radial: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(219,234,254,0.45) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(191,219,254,0.3) 0%, transparent 60%)",
      gridColor: "rgba(59,130,246,0.8)",
      headerBg: "bg-white/70 backdrop-blur-xs border border-blue-500/10",
      headerBorder: "rgba(59,130,246,0.15)",
      headerShadow: "0 1px 0 rgba(59,130,246,0.08), 0 2px 12px rgba(0,0,0,0.06)",
      logoBg: "transparent",
      title: "#1e3a8a",
      turnoBg: "rgba(29,78,216,0.08)",
      turnoBorder: "rgba(29,78,216,0.25)",
      turnoText: "#1d4ed8",
      clockBg: "#1e3a8a",
      clockBorder: "#1e3a8a",
      clockText: "#e0f2fe",
      clockSep: "#1e3a8a",
      legendText: "#475569",
      footerBg: "rgba(255,255,255,0.85)",
      footerBorder: "rgba(59,130,246,0.12)",
    };

  return (
    <div
      className="relative w-screen min-h-screen flex flex-col overflow-hidden"
      style={{ background: tokens.pageBg, transition: "background 0.8s ease" }}
    >
      {/* Imagen de fondo */}
      <div className={`absolute inset-0 bg-cover bg-center ${tokens.imgOpacity} ${tokens.bg}`} />

      {/* Gradiente radial */}
      <div className="absolute inset-0" style={{ background: tokens.radial, transition: "background 0.8s ease" }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isDark ? 0.04 : 0.05,
          backgroundImage: `linear-gradient(${tokens.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${tokens.gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transition: "opacity 0.8s ease",
        }}
      />

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HEADER ── */}
        <div
          className="flex-shrink-0"
          style={{
            background: tokens.headerBg,
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${tokens.headerBorder}`,
            boxShadow: tokens.headerShadow,
            transition: "background 0.6s ease",
          }}
        >
          {/* MOBILE */}
          <div className="flex md:hidden justify-between items-center px-4 py-3">
            <img
              src="/image/logo_systematic.png"
              className="h-8 sm:h-10 rounded-md px-1.5 py-0.5"
              style={{
                background: isDark ? "rgba(255,255,255,0.92)" : "transparent",
                transition: "background 0.6s ease",
              }}
            />
            <span
              className="text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: tokens.turnoBg,
                border: `1px solid ${tokens.turnoBorder}`,
                color: tokens.turnoText,
              }}
            >
              TURNO {horarios[0]?.turno || "—"}
            </span>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 items-center gap-4 px-6 py-4">

            {/* Logo */}
            <div>
              <img
                src="/image/logo_systematic.png"
                className="h-10 sm:h-12 rounded-lg px-2 py-1"
                style={{
                  background: isDark ? "rgba(255,255,255,0.92)" : "transparent",
                  transition: "background 0.6s ease",
                }}
              />
            </div>

            {/* Título */}
            <div className="text-center">
              <h1
                className="text-lg sm:text-xl xl:text-2xl font-black uppercase"
                style={{ color: tokens.title, letterSpacing: "0.12em", transition: "color 0.6s ease" }}
              >
                Distribución de Aulas
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-0.5 rounded-full"
                  style={{
                    background: tokens.turnoBg,
                    border: `1px solid ${tokens.turnoBorder}`,
                    color: tokens.turnoText,
                  }}
                >
                  TURNO {horarios[0]?.turno || "—"}
                </span>
              </div>
            </div>

            {/* Reloj */}
            <div className="flex justify-end items-center gap-1">
              <ClockSegment value={hh} tokens={tokens} />
              <span className="text-2xl xl:text-3xl font-black leading-none mb-1" style={{ color: tokens.clockSep }}>:</span>
              <ClockSegment value={mm} tokens={tokens} />
            </div>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="flex-1 p-4 sm:p-4.5 pt-4 flex flex-col gap-4">
          {loading ? (
            <LoaderComponent />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 uppercase">
              {horarios.map((h) => {
                const subject = subjects.find((s) => s.course === h.course);
                return (
                  <CardHorarioComponent
                    key={h.id || h.classroom}
                    theme={theme}
                    aula={h.classroom}
                    docente={h.teacher || "—"}
                    curso={h.course || "—"}
                    horario={h.startTime ? `${h.startTime} - ${h.endTime}` : "—"}
                    sesion={
                      subject?.modulo && h.sesion
                        ? `${subject.modulo} - ${h.sesion}`
                        : h.sesion || "—"
                    }
                    estado={h.estado}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoraryComponent;

const ClockSegment = ({ value, tokens }) => (
  <div
    className="rounded-lg px-2 py-1 text-center"
    style={{
      background: tokens.clockBg,
      border: `1px solid ${tokens.clockBorder}`,
      minWidth: "2.8rem",
      transition: "background 0.6s ease, border-color 0.6s ease",
    }}
  >
    <span
      className="text-2xl xl:text-3xl font-black tabular-nums leading-none"
      style={{
        color: tokens.clockText,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.05em",
        transition: "color 0.6s ease",
      }}
    >
      {value}
    </span>
  </div>
);
