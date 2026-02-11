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
import AdminComponent from "../pages/adminPage/AdminComponent";

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
            <AdminComponent />
          </PrivateRoute>
        }
      />

    </Route>
  )
);

export default router;