import { useSelector } from 'react-redux';
import { checkAuth } from '../utils/authUtils';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, tokenExpiry, currentUser } = useSelector((state) => state.user);

  const isAuthenticated = token && checkAuth(tokenExpiry);
  const hasRoleAccess = currentUser?.role?.some(role => allowedRoles.includes(role));

  if (!isAuthenticated || !hasRoleAccess) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
