import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../utils/authUtils";

export const AuthProtectedRoute = ({ children }) => {
  const { token, tokenExpiry } = useSelector((state) => state.user);
  const isAuthenticated = token && checkAuth(tokenExpiry);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
