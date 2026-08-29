import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Wrap protected routes with this. Pass `roles` to also restrict by role
// (e.g. <RequireAuth roles={['admin']} />); omit it to just require login.
export default function RequireAuth({ roles }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
