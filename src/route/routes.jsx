import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";

// 📺 Público
import HoraryComponent from "../pages/publicPage/HoraryComponent";
import NotFoundComponent from "../pages/publicPage/NotFoundComponent";

// 🔐 Admin
import AdminComponent from "../pages/adminPage/AdminComponent";
import LoginComponent from "../pages/adminPage/LoginComponent";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFoundComponent />}>

      {/* 📺 TV Pública */}s
      <Route index element={<HoraryComponent />} />

      {/* 🔐 LOGIN */}
      <Route path="/admin/login" element={<LoginComponent />} />

      {/* 🔒 PANEL ADMIN PROTEGIDO */}
      <Route
        path="/admin"
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
