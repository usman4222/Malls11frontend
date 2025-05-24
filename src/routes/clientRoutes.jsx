import { Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardComponents/DashboardLayout";
import { clientRoutesConfig } from "../config/clientRoutesConfig";
import { ProtectedRoute } from "./ProtectedRoute";

const clientRoutes = () => (
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["freelancer", "client"]}>
        <DashboardLayout />
      </ProtectedRoute>
    }
    key="dashboard-layout"
  >
    {clientRoutesConfig.map(({ path, component }) => (
      <Route
        key={path}
        path={path === "/dashboard" ? "" : path.replace("/dashboard/", "")}
        element={component}
      />
    ))}
  </Route>
);

export default clientRoutes;
