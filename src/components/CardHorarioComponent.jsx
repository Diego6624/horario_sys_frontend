import { User, BookOpen, Clock, CalendarDays } from "lucide-react";

const STATUS_CONFIG = {
  dark: {
    libre: {
      accent: "#94a3b8",
      glow: "rgba(148,163,184,0.3)",
      badge: "bg-slate-500/20 text-slate-300 border border-slate-500/40",
      bar: "bg-gradient-to-b from-slate-400 to-slate-500",
      dot: "bg-slate-400",
    },
    "en clase": {
      accent: "#3b82f6",
      glow: "rgba(59,130,246,0.35)",
      badge: "bg-blue-500/20 text-blue-300 border border-blue-500/40",
      bar: "bg-gradient-to-b from-blue-400 to-blue-600",
      dot: "bg-blue-400",
    },
    "siguiente clase": {
      accent: "#f97316",
      glow: "rgba(249,115,22,0.35)",
      badge: "bg-orange-500/20 text-orange-300 border border-orange-500/40",
      bar: "bg-gradient-to-b from-orange-400 to-orange-600",
      dot: "bg-orange-400",
    },
  },
  light: {
    libre: {
      accent: "#64748b",
      glow: "rgba(100,116,139,0.15)",
      badge: "bg-slate-100 text-slate-600 border border-slate-300",
      bar: "bg-gradient-to-b from-slate-400 to-slate-500",
      dot: "bg-slate-400",
    },
    "en clase": {
      accent: "#1d4ed8",
      glow: "rgba(29,78,216,0.15)",
      badge: "bg-blue-50 text-blue-700 border border-blue-200",
      bar: "bg-gradient-to-b from-blue-500 to-blue-700",
      dot: "bg-blue-500",
    },
    "en clase": {
      accent: "#1d4ed8",
      glow: "rgba(29,78,216,0.10)",
      badge: "bg-blue-50 text-blue-700 border border-blue-200",  // sin cambio
      bar: "bg-gradient-to-b from-[#60a5fa] to-[#1d4ed8]",
      dot: "bg-blue-500",
    },
  },
};

const CardHorarioComponent = ({
  aula,
  docente,
  curso,
  horario,
  sesion,
  estado,
  theme = "dark",
}) => {
  const estadoLower = estado?.toLowerCase();
  const palette = STATUS_CONFIG[theme] ?? STATUS_CONFIG.dark;
  const s = palette[estadoLower] ?? palette["libre"];
  const isDark = theme === "dark";

  const cardStyle = isDark
    ? {
      background: "rgba(10, 15, 35, 0.82)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4), 0 0 40px ${s.glow}`,
    }
    : {
      background: "rgba(255, 255, 255, 0.92)",
      border: "1px solid rgba(37,99,235,0.10)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(37,99,235,0.06)",
    };

  const labelColor = isDark ? "#64748b" : "#94a3b8";
  const valueColor = isDark ? "#e2e8f0" : "#0f172a";
  const separatorBg = isDark
    ? `linear-gradient(to right, ${s.accent}40, transparent)`
    : `linear-gradient(to right, ${s.accent}50, transparent)`;

  return (
    <div
      className="relative rounded-xl overflow-hidden h-full flex"
      style={{ ...cardStyle, transition: "background 0.6s ease, box-shadow 0.6s ease" }}
    >
      {/* Barra lateral */}
      <div className={`w-1 flex-shrink-0 ${s.bar}`} />

      {/* Contenido */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-4">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ color: labelColor }}>
              Aula
            </p>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{
                color: s.accent,
                textShadow: isDark ? `0 0 20px ${s.glow}` : "none",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {aula}
            </h2>
          </div>

          <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest ${s.badge}`}>
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`}
              style={{
                boxShadow: `0 0 6px ${s.accent}`,
                animation: estadoLower === "en clase" ? "card-pulse 1.5s infinite" : "none",
              }}
            />
            {estado}
          </div>
        </div>

        {/* Separador */}
        <div className="h-px w-full" style={{ background: separatorBg }} />

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <InfoRow icon={<User size={13} />} label="Docente" value={docente} accent={s.accent} valueColor={valueColor} />
          <InfoRow icon={<BookOpen size={13} />} label="Curso" value={curso} accent={s.accent} valueColor={valueColor} />
          <InfoRow icon={<Clock size={13} />} label="Horario" value={horario} accent={s.accent} valueColor={valueColor} />
          <InfoRow icon={<CalendarDays size={13} />} label="Sesión" value={sesion} accent={s.accent} valueColor={valueColor} />
        </div>
      </div>

      {/* Brillo decorativo */}
      <div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${s.glow}, transparent 70%)` }}
      />

      <style>{`
        @keyframes card-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default CardHorarioComponent;

const InfoRow = ({ icon, label, value, accent, valueColor }) => (
  <div className="flex flex-col gap-1.5 min-h-[56px]">
    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>
      {icon}
      {label}
    </div>
    <p className="text-sm sm:text-base font-semibold leading-snug line-clamp-2" style={{ color: valueColor }}>
      {value || "—"}
    </p>
  </div>
);