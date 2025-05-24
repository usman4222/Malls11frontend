import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import { Label } from "@/components/SiteComponents/ui/label";
import loginImage from "@/assets/images/Landingpage/logo-edited.png";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "@/actions/users/UserAction";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const tempToken = searchParams.get("tempToken");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !tempToken) {
      toast.error("Session expired. Please try again.");
      return navigate("/forget-password");
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const data = await resetPassword({ email, newPassword, tempToken });

      if (data.success) {
        toast.success("Password reset successful!");
        localStorage.removeItem("email");
        localStorage.removeItem("tempToken");
        navigate("/login");
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F0EFEC] flex items-center justify-center h-screen">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-black sm:text-3xl">
              Reset Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={loginImage}
              alt="Logo"
              className="mx-auto h-12 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 text-center">
              Please enter your new password below.
            </p>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                New Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  className="pl-10 text-black placeholder:text-gray-400"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-black">
                Confirm Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="pl-10 text-black placeholder:text-gray-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>

            <div className="text-center text-sm text-gray-400">
              <a href="/login" className="font-medium text-gray-300 hover:text-black">
                Back to login
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
