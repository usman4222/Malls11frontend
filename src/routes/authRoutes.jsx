import { Route } from 'react-router-dom';
import LoginForm from '../pages/site/auth/LoginPage';
import SignUpForm from '../pages/site/auth/SignupPage';
import ForgetPassword from '../pages/site/auth/forgetPassword';
import VerifyForgetEmail from '../pages/site/auth/VerifyForgetEmail';
import VerifyAccountEmail from '../pages/site/auth/VerifyAccountEmail';
import ChangePassword from '../pages/site/auth/ChangePassword';
import ResetPassword from '../pages/site/auth/ResetPassword';
// import Test from "../pages/site/auth/test"

const authRoutes = () => ([
    <Route path="/login" element={<LoginForm />} key="login" />,
    <Route path="/register" element={<SignUpForm />} key="register" />,
    <Route path="/auth/register/verify-account" element={<VerifyAccountEmail />} key="verify-account" />,
    <Route path="/auth/forget-password/verifyOtp" element={<VerifyForgetEmail />} key="verify-otp" />,
    <Route path="/forget-password" element={<ForgetPassword />} key="forget-password" />,
    <Route path="/change-password" element={<ChangePassword />} key="change-password" />,
    <Route path="/auth/forget-password/reset-password" element={<ResetPassword />} key="reset-password" />,
    // <Route path="/test" element={<Test />} key="test" />,
]);

export default authRoutes;
