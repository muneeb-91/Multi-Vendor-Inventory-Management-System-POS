import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Vendor / Manager not active
  if (
    user.role !== "admin" &&
    user.status !== "active"
  ) {
    return <Navigate to="/account-status" replace />;
  }

  return children;
};

export default ProtectedRoute;