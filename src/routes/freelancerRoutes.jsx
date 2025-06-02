import { Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardComponents/DashboardLayout";
import { freelancerRoutesConfig } from "../config/freelancerRoutesConfig";
import { RoleBaseProtection } from "./protectedRoutes/RoleBaseProtection";

const freelancerRoutes = () => (
    <Route
        path="/freelancer-dashboard"
        element={
            <RoleBaseProtection allowedRoles={["freelancer"]}>
                <DashboardLayout />
            </RoleBaseProtection>
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
