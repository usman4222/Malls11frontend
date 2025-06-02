import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/authUtils';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const { token, tokenExpiry } = useSelector((state) => state.user);

    const isAuthenticated = token && checkAuth(tokenExpiry);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
