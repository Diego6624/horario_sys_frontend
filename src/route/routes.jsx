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
import CreateHoraryForm from "../pages/adminPage/components/CreateHoraryForm";
import ClassroomList from "../pages/adminPage/ClassroomList";
import ScheduleList from "../pages/adminPage/ScheduleList";
import IndexAdmin from "@/pages/adminPage/IndexAdmin";

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
        <Route path="crear-horario" element={<CreateHoraryForm />} />
        <Route path="aulas" element={<ClassroomList />} />
        <Route path="bloques" element={<ScheduleList />} />
      </Route>
    </Route>
  )
);

export default router;
