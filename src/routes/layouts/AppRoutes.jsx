import { Routes, Route } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import AuthLayout from "./AuthLayout";
import ClientLayout from "./ClientLayout";
import authRoutes from "../authRoutes";
import siteRoutes from "../commonRoutes";
import clientRoutes from "../clientRoutes";
import FreelancerLayout from "./FreelancerLayout ";
import freelancerRoutes from "../freelancerRoutes";
import { RoleBaseProtection } from "../protectedRoutes/RoleBaseProtection";
import { AuthProtectedRoute } from "../protectedRoutes/AuthProtectedRoute";

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
          <RoleBaseProtection allowedRoles={["client"]}>
            <ClientLayout />
          </RoleBaseProtection>
        }
      >
        {clientRoutes()}
      </Route>

      {/* Freelancer Routes */}
      <Route
        element={
          <RoleBaseProtection allowedRoles={["freelancer"]}>
            <FreelancerLayout />
          </RoleBaseProtection>
        }
      >
        {freelancerRoutes()}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
