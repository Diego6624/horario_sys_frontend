import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";

/* 🌐 PUBLIC */
import HoraryComponent from "../pages/publicPage/HoraryComponent";
import NotFoundComponent from "../pages/publicPage/NotFoundComponent";

/* 🔐 AUTH */
import LoginComponent from "../pages/adminPage/LoginComponent";
import PrivateRoute from "./privateRoute";

/* 🛠️ ADMIN */
import HoraryList from "../pages/adminPage/HoraryList";
import ScheduleList from "../pages/adminPage/ScheduleList";
import IndexAdmin from "@/pages/adminPage/IndexAdmin";

// nuevas páginas
import TeacherList from "../pages/adminPage/TeacherList";
import CourseList from "../pages/adminPage/CourseList";
import SubjectList from "../pages/adminPage/SubjectList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>

      {/* PUBLICO */}
      <Route index element={<HoraryComponent />} />

      {/* LOGIN */}
      <Route path="admin/login" element={<LoginComponent />} />

      {/* ADMIN */}
      <Route
        path="admin"
        element={
          <PrivateRoute>
            <IndexAdmin />
          </PrivateRoute>
        }
      >
        <Route index element={<HoraryList />} />
        <Route path="horarios" element={<HoraryList />} />
        <Route path="bloques" element={<ScheduleList />} />

        {/* nuevas rutas */}
        <Route path="docentes" element={<TeacherList />} />
        <Route path="cursos" element={<CourseList />} />
        <Route path="materias" element={<SubjectList />} />
      </Route>
    </Route>
  )
);

export default router;
