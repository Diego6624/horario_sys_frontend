import { useEffect, useState } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
} from "../../services/courseService";
import CourseEditModal from "./components/CourseEditModal";
import LoaderComponent from "@/components/LoaderComponent";
import { Search, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

const BRAND = "rgb(43,57,143)";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: "" });
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredCourses = courses.filter(
    (c) =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(c.id).includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Genera el rango de páginas visibles (máximo 5)
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
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error cargando cursos:", error);
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
        await updateCourse(editing.id, form);
        toast.success("Curso actualizado correctamente");
      } else {
        await createCourse(form);
        toast.success("Curso creado correctamente");
      }
      setForm({ nombre: "" });
      setEditing(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error guardando curso:", error);
      toast.error("Error guardando curso");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleEdit = (course) => {
    setEditing(course);
    setForm({ nombre: course.nombre });
    setShowModal(true);
  };

  return (
    <div className="space-y-5">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: BRAND }}>
            Gestión de Cursos
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {filteredCourses.length} curso{filteredCourses.length !== 1 ? "s" : ""} encontrado{filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ nombre: "" }); setShowModal(true); }}
          className="flex items-center w-full md:w-auto gap-2 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer text-md"
          style={{ background: BRAND }}
        >
          <p className="w-full md:w-auto">+ Nuevo Curso</p>
        </button>
      </div>

      {/* ── BUSCADOR ── */}
      <div className="flex items-center gap-2 bg-white shadow-sm rounded-xl px-3 py-2.5 border border-gray-200 w-full max-w-sm">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* ── TABLA ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr style={{ background: BRAND }}>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest w-16">
                ID
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest">
                Nombre
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold text-white/80 uppercase tracking-widest w-28">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="3">
                  <LoaderComponent />
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-5 py-10 text-center text-sm text-gray-400">
                  No se encontraron cursos
                </td>
              </tr>
            ) : (
              currentItems.map((c, idx) => (
                <tr
                  key={c.id}
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                      #{c.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-md font-medium text-gray-800">
                    {c.nombre}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleEdit(c)}
                      className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition cursor-pointer"
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

        {/* ── INFO FOOTER ── */}
        {!loading && filteredCourses.length > 0 && (
          <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Mostrando{" "}
              <span className="font-semibold text-gray-600">
                {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredCourses.length)}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-gray-600">{filteredCourses.length}</span>
            </p>
          </div>
        )}
      </div>

      {/* ── PAGINACIÓN ── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5">

          {/* Anterior */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Puntos izquierda */}
          {getPageRange()[0] > 1 && (
            <>
              <PageBtn n={1} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
              {getPageRange()[0] > 2 && (
                <span className="px-1 text-gray-400 text-sm">…</span>
              )}
            </>
          )}

          {/* Rango central */}
          {getPageRange().map((n) => (
            <PageBtn key={n} n={n} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
          ))}

          {/* Puntos derecha */}
          {getPageRange().at(-1) < totalPages && (
            <>
              {getPageRange().at(-1) < totalPages - 1 && (
                <span className="px-1 text-gray-400 text-sm">…</span>
              )}
              <PageBtn n={totalPages} current={currentPage} onClick={setCurrentPage} brand={BRAND} />
            </>
          )}

          {/* Siguiente */}
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

      {/* ── MODAL ── */}
      <CourseEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        editing={editing}
        loading={loadingSave}
      />
    </div>
  );
};

export default CourseList;

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