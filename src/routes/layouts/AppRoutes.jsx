import { Routes, Route } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import AuthLayout from './AuthLayout';
import ClientLayout from './ClientLayout';
import authRoutes from "../authRoutes"
import siteRoutes from '../commonRoutes';
import clientRoutes from '../clientRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            {/* Public / Site Routes */}
            <Route element={<CommonLayout />}>
                {siteRoutes()}
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
                {authRoutes()}
            </Route>

            {/* Client Routes */}
            <Route element={<ClientLayout />}>
                {clientRoutes()}
            </Route>
        </Routes>
    );
};

export default AppRoutes;
