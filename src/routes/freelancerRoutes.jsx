import { Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardComponents/DashboardLayout";
import { freelancerRoutesConfig } from "../config/freelancerRoutesConfig";
import { ProtectedRoute } from "./ProtectedRoute";

const freelancerRoutes = () => (
    <Route
        path="/freelancer-dashboard"
        element={
            <ProtectedRoute allowedRoles={["freelancer"]}>
                <DashboardLayout />
            </ProtectedRoute>
        }
        key="dashboard-layout"
    >
        {freelancerRoutesConfig.map(({ path, component }) => (
            <Route
                key={path}
                path={path === "/freelancer-dashboard" ? "" : path.replace("/freelancer-dashboard/", "")}
                element={component}
            />
        ))}
    </Route>
);

export default freelancerRoutes;
