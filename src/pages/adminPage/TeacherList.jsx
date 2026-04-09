import { useEffect, useState } from "react";
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  getSubjectsByTeacher,
} from "../../services/teacherService";
import LoaderComponent from "@/components/LoaderComponent";
import TeacherSubjectModal from "./components/TeacherSubjectModal";
import TeacherEditModal from "./components/TeacherEditModal";
import { Eye, Pencil, Search, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

const BRAND = "rgb(43,57,143)";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingViewId, setLoadingViewId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);
  const [form, setForm] = useState({ nombre: "" });
  const [editing, setEditing] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ── LÓGICA DE FILTRADO Y PAGINACIÓN ──
  const filteredTeachers = teachers.filter(
    (t) =>
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(t.id).includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const getPageRange = () => {
    const delta = 2;
    const range = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) range.push(i);
    return range;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error cargando docentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSave(true);
    try {
      if (editing) {
        await updateTeacher(editing.id, form);
        toast.success("Docente actualizado correctamente");
      } else {
        await createTeacher(form);
        toast.success("Docente creado correctamente");
      }
      setForm({ nombre: "" });
      setEditing(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando docente:", error);
      toast.error("Error guardando docente");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditing(teacher);
    setForm({ nombre: teacher.nombre });
    setShowModal(true);
  };

  const handleViewSubjects = async (teacher) => {
    setLoadingViewId(teacher.id);
    try {
      const data = await getSubjectsByTeacher(teacher.id);
      setSubjects(data);
      setSelectedTeacher(teacher);
      setShowSubjectsModal(true);
    } catch (error) {
      console.error("Error obteniendo materias del docente:", error);
      toast.error("Error cargando materias del docente");
    } finally {
      setLoadingViewId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* ── HEADER ── */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: BRAND }}>
            Gestión de Docentes
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {filteredTeachers.length} docente{filteredTeachers.length !== 1 ? "s" : ""} encontrado{filteredTeachers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ nombre: "" }); setShowModal(true); }}
          className="flex items-center w-full md:w-auto gap-2 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer text-md"
          style={{ background: BRAND }}
        >
          <p className="w-full md:w-auto">+ Nuevo Docente</p>
        </button>
      </div>

      {/* ── BUSCADOR ── */}
      <div className="flex items-center gap-2 bg-white shadow-sm rounded-xl px-3 py-2.5 border border-gray-200 w-full max-w-sm focus-within:ring-2 focus-within:ring-[rgb(43,57,143)] focus-within:border-transparent transition-all">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>

      {/* ── TABLA ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr style={{ background: BRAND }}>
                <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest w-16">
                  ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest">
                  Nombre
                </th>
                <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest w-44">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="3" className="py-10">
                    <LoaderComponent />
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Users size={32} strokeWidth={1.5} />
                      <p className="text-sm">No se encontraron docentes</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((t) => (
                  <tr key={t.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-mono font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                        #{t.id}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-md font-medium text-gray-800">
                      {t.nombre}
                    </td>
                    <td className="px-5 py-3.5 flex gap-2">
                      {/* Botón Ver */}
                      <button
                        onClick={() => handleViewSubjects(t)}
                        disabled={loadingViewId === t.id}
                        className="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer"
                        style={{
                          color: "#059669",
                          borderColor: `rgba(5, 150, 105, 0.3)`,
                          background: "rgba(5, 150, 105, 0.04)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#059669";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#059669";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(5, 150, 105, 0.04)";
                          e.currentTarget.style.color = "#059669";
                          e.currentTarget.style.borderColor = "rgba(5, 150, 105, 0.3)";
                        }}
                      >
                        {loadingViewId === t.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        ) : (
                          <>
                            <Eye size={16} />
                            <span className="hidden sm:inline">Ver</span>
                          </>
                        )}
                      </button>

                      {/* Botón Editar */}
                      <button
                        onClick={() => handleEdit(t)}
                        className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
                        style={{
                          color: BRAND,
                          borderColor: `rgba(43,57,143,0.3)`,
                          background: "rgba(43,57,143,0.04)",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = BRAND;
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = BRAND;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "rgba(43,57,143,0.04)";
                          e.currentTarget.style.color = BRAND;
                          e.currentTarget.style.borderColor = "rgba(43,57,143,0.3)";
                        }}
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── INFO FOOTER ── */}
        {!loading && filteredTeachers.length > 0 && (
          <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Mostrando{" "}
              <span className="font-semibold text-gray-600">
                {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredTeachers.length)}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-gray-600">{filteredTeachers.length}</span>
            </p>
          </div>
        )}
      </div>

      {/* ── PAGINACIÓN ── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {getPageRange()[0] > 1 && (
            <>
              <PageBtn n={1} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
              {getPageRange()[0] > 2 && <span className="px-1 text-gray-400 text-sm">…</span>}
            </>
          )}

          {getPageRange().map((n) => (
            <PageBtn key={n} n={n} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
          ))}

          {getPageRange().at(-1) < totalPages && (
            <>
              {getPageRange().at(-1) < totalPages - 1 && <span className="px-1 text-gray-400 text-sm">…</span>}
              <PageBtn n={totalPages} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
            </>
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* ── MODALES ── */}
      <TeacherEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        editing={editing}
        loading={loadingSave}
      />

      <TeacherSubjectModal
        show={showSubjectsModal}
        onClose={() => setShowSubjectsModal(false)}
        selectedTeacher={selectedTeacher}
        subjects={subjects}
      />
    </div>
  );
};

// ── Botón de página ──────────────────────────────────────────────────────────
const PageBtn = ({ n, current, onClick, brand }) => (
  <button
    onClick={() => onClick(n)}
    className="w-8 h-8 rounded-lg text-sm font-semibold transition cursor-pointer border"
    style={
      current === n
        ? { background: brand, color: "white", borderColor: brand }
        : { background: "white", color: "#374151", borderColor: "#e5e7eb" }
    }
  >
    {n}
  </button>
);

export default TeacherList;