import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // ✅ Safely parse userInfo
  let userInfo = null;
  try {
    const storedData = localStorage.getItem("userInfo");
    userInfo = storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("❌ Error parsing userInfo:", error);
    return <Navigate to="/login" replace />;
  }

  // ✅ Check token
  if (!userInfo?.token) {
    console.warn("⚠️ No token found");
    return <Navigate to="/login" replace />;
  }

  // ✅ Check isAdmin from multiple possible locations
  const isAdmin = userInfo?.user?.isAdmin || userInfo?.isAdmin || false;

  if (!isAdmin) {
    console.warn("⚠️ User is not admin", { userInfo, isAdmin });
    return <Navigate to="/" replace />;
  }

  console.log("✅ Admin access granted");
  return children;
}
