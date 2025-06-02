import { Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardComponents/DashboardLayout";
import { clientRoutesConfig } from "../config/clientRoutesConfig";
import { RoleBaseProtection } from "./protectedRoutes/RoleBaseProtection";

const clientRoutes = () => (
  <Route
    path="/client-dashboard"
    element={
      <RoleBaseProtection allowedRoles={["client"]}>
        <DashboardLayout />
      </RoleBaseProtection>
    }
    key="dashboard-layout"
  >
    {clientRoutesConfig.map(({ path, component }) => (
      <Route
        key={path}
        path={
          path === "/client-dashboard"
            ? ""
            : path.replace("/client-dashboard/", "")
        }
        element={component}
      />
    ))}
  </Route>
);

export default clientRoutes;
