import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo?.token) return <Navigate to="/login" replace />;
  if (!userInfo?.user?.isAdmin) return <Navigate to="/" replace />;

  return children;
}
