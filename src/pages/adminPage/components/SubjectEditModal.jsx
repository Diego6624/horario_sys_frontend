import { X, Plus, ChevronRight, ChevronLeft, Check, User, BookOpen, Calendar, Clock, MapPin, Hash, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BRAND = "rgb(43,57,143)";
const BRAND_HEX = "#2b398f";

const DAY_LABELS = {
  MONDAY: "Lunes", TUESDAY: "Martes", WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves", FRIDAY: "Viernes", SATURDAY: "Sábado", SUNDAY: "Domingo",
};

const SubjectEditModal = ({
  show, onClose, onSubmit, form, handleChange, editing,
  courses, teachers, classrooms,
  addScheduleRow, updateScheduleRow, removeScheduleRow, loading,
}) => {
  const [step, setStep] = useState(1);

  useEffect(() => { if (show) setStep(1); }, [show]);

  if (!show) return null;

  const inputStyle =
    "w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(43,57,143)] focus:border-transparent transition";
  const inputStyleDisabled =
    "w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed outline-none";

  const step1Valid = form.courseId && form.teacherId && form.modulo && form.duracionSemanas;
  const step2Valid = form.fechaInicio;

  const STEPS = editing
    ? ["Información básica"]
    : ["Información básica", "Horarios", "Resumen"];

  // Helpers para mostrar nombres en el resumen
  const courseName = courses.find(c => String(c.id) === String(form.courseId))?.nombre || "—";
  const teacherName = teachers.find(t => String(t.id) === String(form.teacherId))?.nombre || "—";
  const getClassroomName = (id) => classrooms.find(c => String(c.id) === String(id))?.nombre || "—";

  // Controla qué botón del form hace el submit real
  const isLastStep = editing || step === 3;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3">
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl mx-4 sm:mx-auto bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >

          {/* ── HEADER ── */}
          <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold" style={{ color: BRAND }}>
                  {editing ? "Editar Materia" : "Nueva Materia"}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {editing ? "Modifica los datos de la materia" : step === 3 ? "Revisa los datos antes de confirmar" : "Completa la información en los pasos"}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1">
                <X size={20} />
              </button>
            </div>

            {/* ── STEPPER ── */}
            {!editing && (
              <div className="flex items-center">
                {STEPS.map((label, idx) => {
                  const n = idx + 1;
                  const isActive = step === n;
                  const isDone = step > n;
                  return (
                    <div key={n} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                          style={{
                            background: isDone ? "#22c55e" : isActive ? BRAND : "#e5e7eb",
                            color: isDone || isActive ? "white" : "#9ca3af",
                          }}
                        >
                          {isDone ? <Check size={14} /> : n}
                        </div>
                        <span
                          className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap"
                          style={{ color: isDone ? "#22c55e" : isActive ? BRAND : "#9ca3af" }}
                        >
                          {label}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className="flex-1 mx-2 mb-4">
                          <div className="h-0.5 rounded-full transition-all duration-500"
                            style={{ background: isDone ? "#22c55e" : "#e5e7eb" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── FORM ── */}
          <form
            onSubmit={isLastStep ? onSubmit : (e) => { e.preventDefault(); setStep(s => s + 1); }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
              <AnimatePresence mode="wait">

                {/* ══ PASO 1 ══ */}
                {step === 1 && (
                  <motion.div key="step1"
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium text-gray-600">Curso</label>
                      <select name="courseId" value={form.courseId} onChange={handleChange} className={editing ? inputStyleDisabled : inputStyle} required>
                        <option value="" disabled>Seleccione curso</option>
                        {courses.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)).map(c => (
                          <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Docente</label>
                      <select name="teacherId" value={form.teacherId} onChange={handleChange} className={inputStyle} required>
                        <option value="" disabled>Seleccione docente</option>
                        {teachers.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)).map(t => (
                          <option key={t.id} value={t.id}>{t.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Módulo</label>
                        <select name="modulo" value={form.modulo} onChange={handleChange} className={inputStyle} required>
                          <option value="" disabled>Seleccione módulo</option>
                          <option value="M1">Módulo 1</option>
                          <option value="M2">Módulo 2</option>
                          <option value="M3">Módulo 3</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Duración (semanas)</label>
                        <input type="number" min={1} name="duracionSemanas" value={form.duracionSemanas}
                          onChange={handleChange} className={editing ? inputStyleDisabled : inputStyle}
                          required disabled={!!editing} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ══ PASO 2 ══ */}
                {step === 2 && !editing && (
                  <motion.div key="step2"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fecha de inicio</label>
                      <input type="date" name="fechaInicio" value={form.fechaInicio || ""}
                        onChange={handleChange} className={inputStyle} required />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-700 text-sm">Horarios de sesión</h4>
                        <button type="button" onClick={addScheduleRow}
                          className="flex items-center gap-1 text-xs font-semibold text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition shadow-sm cursor-pointer"
                          style={{ background: BRAND }}>
                          <Plus size={13} /> Agregar
                        </button>
                      </div>

                      <div className="max-h-56 overflow-y-auto pr-1 space-y-3">
                        {form.schedules.length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-4">Sin horarios — agrega al menos uno</p>
                        )}
                        {form.schedules.map((s, idx) => (
                          <div key={idx} className="relative bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                            <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg" style={{ background: BRAND }} />
                            <div className="flex justify-between items-center mb-3">
                              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Horario #{idx + 1}</p>
                              <button type="button" onClick={() => removeScheduleRow(idx)}
                                className="text-red-400 hover:text-red-600 cursor-pointer transition">
                                <X size={16} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-gray-500">Día</label>
                                <select value={s.dayOfWeek} onChange={e => updateScheduleRow(idx, "dayOfWeek", e.target.value)} className={inputStyle}>
                                  <option value="" disabled>Seleccionar</option>
                                  {Object.entries(DAY_LABELS).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">Aula</label>
                                <select value={s.classroomId} onChange={e => updateScheduleRow(idx, "classroomId", e.target.value)} className={inputStyle}>
                                  <option value="" disabled>Seleccione aula</option>
                                  {classrooms.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)).map(c => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">Hora inicio</label>
                                <input type="time" value={s.startTime} onChange={e => updateScheduleRow(idx, "startTime", e.target.value)} className={inputStyle} />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">Hora fin</label>
                                <input type="time" value={s.endTime} onChange={e => updateScheduleRow(idx, "endTime", e.target.value)} className={inputStyle} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ══ PASO 3 — RESUMEN ══ */}
                {step === 3 && !editing && (
                  <motion.div key="step3"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Banner de confirmación */}
                    <div className="rounded-xl p-4 flex items-center gap-3"
                      style={{ background: "rgba(43,57,143,0.06)", border: `1px solid rgba(43,57,143,0.15)` }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: BRAND }}>
                        <Check size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: BRAND }}>Revisa antes de confirmar</p>
                        <p className="text-xs text-gray-500">Verifica que todos los datos sean correctos</p>
                      </div>
                    </div>

                    {/* Info general */}
                    <div className="rounded-xl border border-gray-200 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-gray-100"
                        style={{ background: "rgba(43,57,143,0.04)" }}>
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND }}>
                          Información del curso
                        </p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        <SummaryRow icon={<BookOpen size={15} />} label="Curso" value={courseName} />
                        <SummaryRow icon={<User size={15} />} label="Docente" value={teacherName} />
                        <SummaryRow icon={<Layers size={15} />} label="Módulo" value={form.modulo} />
                        <SummaryRow icon={<Hash size={15} />} label="Duración" value={`${form.duracionSemanas} semana${form.duracionSemanas > 1 ? "s" : ""}`} />
                        <SummaryRow icon={<Calendar size={15} />} label="Fecha de inicio" value={form.fechaInicio || "—"} />
                      </div>
                    </div>

                    {/* Horarios */}
                    <div className="rounded-xl border border-gray-200 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"
                        style={{ background: "rgba(43,57,143,0.04)" }}>
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND }}>
                          Sesiones por semana
                        </p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                          style={{ background: BRAND }}>
                          {form.schedules.length}
                        </span>
                      </div>

                      {form.schedules.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-5">Sin horarios registrados</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-100">
                                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-gray-400">#</th>
                                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Día</th>
                                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Horario</th>
                                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-gray-400">Aula</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {form.schedules.map((s, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-2.5">
                                    <span className="text-xs font-mono font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                      {idx + 1}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 font-semibold text-gray-700">
                                    {DAY_LABELS[s.dayOfWeek] || "—"}
                                  </td>
                                  <td className="px-4 py-2.5 text-gray-600 tabular-nums">
                                    {s.startTime && s.endTime ? `${s.startTime} - ${s.endTime}` : "—"}
                                  </td>
                                  <td className="px-4 py-2.5 text-gray-600">
                                    {getClassroomName(s.classroomId)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── FOOTER ── */}
            <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-white flex flex-col-reverse sm:flex-row justify-between gap-2">

              {/* Izquierda */}
              {step === 1 || editing ? (
                <button type="button" onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition cursor-pointer text-sm">
                  Cancelar
                </button>
              ) : (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition cursor-pointer text-sm">
                  <ChevronLeft size={15} /> Atrás
                </button>
              )}

              {/* Derecha */}
              {isLastStep ? (
                <button type="submit" disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-md cursor-pointer text-sm"
                  style={{ background: BRAND }}>
                  {loading
                    ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    : editing ? "Actualizar" : "Confirmar y crear"
                  }
                </button>
              ) : (
                <button type="submit"
                  disabled={step === 1 ? !step1Valid : !step2Valid}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold transition cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: BRAND }}>
                  Siguiente <ChevronRight size={15} />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubjectEditModal;

// ── Fila del resumen ─────────────────────────────────────────────────────────
const SummaryRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between px-4 py-3">
    <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wide">
      {icon}
      {label}
    </div>
    <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%]">{value || "—"}</span>
  </div>
);