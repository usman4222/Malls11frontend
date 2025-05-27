import { Routes, Route } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import AuthLayout from "./AuthLayout";
import ClientLayout from "./ClientLayout";
import authRoutes from "../authRoutes";
import siteRoutes from "../commonRoutes";
import clientRoutes from "../clientRoutes";
import FreelancerLayout from "./FreelancerLayout ";
import freelancerRoutes from "../freelancerRoutes";
import { ProtectedRoute } from "../ProtectedRoute";
import { AuthProtectedRoute } from "./AuthProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Site Routes */}
      <Route element={<CommonLayout />}>{siteRoutes()}</Route>

      {/* Auth Routes */}
      <Route
        element={
          <AuthProtectedRoute>
            <AuthLayout />
          </AuthProtectedRoute>
        }
      >
        {authRoutes()}
      </Route>

      {/* Client Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        {clientRoutes()}
      </Route>

      {/* Freelancer Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["freelancer"]}>
            <FreelancerLayout />
          </ProtectedRoute>
        }
      >
        {freelancerRoutes()}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
