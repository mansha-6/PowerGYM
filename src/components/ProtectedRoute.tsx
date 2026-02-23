
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "member";
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Replace with a nice spinner later
  }

  if (!user) {
    // Redirect to landing or login selector
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "admin" && !isAdmin) {
    // User is logged in but not admin
    return <Navigate to="/member" replace />;
  }

  if (requiredRole === "member" && isAdmin) {
    // Admin trying to access member routes? Allow or redirect.
    // For now, let admins access everything or redirect to admin dash
    return <Outlet />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
