import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return children;
  }

  // Admin
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Vendor / Manager inactive
  if (user.status !== "active") {
    return <Navigate to="/account-status" replace />;
  }

  // Vendor
  if (user.role === "vendor") {
    return <Navigate to="/vendor" replace />;
  }

  // Manager
  return <Navigate to="/manager" replace />;
};

export default PublicRoute;