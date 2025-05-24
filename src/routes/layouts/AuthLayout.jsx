import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="auth-wrapper">
    <Outlet />
  </div>
);

export default AuthLayout;
