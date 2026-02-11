import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  // ❌ No logueado → Login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Logueado → Panel
  return children;
};

export default PrivateRoute;
