import React, { useState } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/SiteComponents/ui/button"
import { Input } from "@/components/SiteComponents/ui/input"
import { Label } from "@/components/SiteComponents/ui/label"
import loginImage from "@/assets/images/Landingpage/logo-edited.png"
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from "@/actions/users/UserAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await dispatch(registerUser(formData));

      if (response.success === true) {
        const urlParams = new URL(response.verificationUrl).searchParams;
        const tempToken = urlParams.get("tempToken");

        localStorage.setItem("email", response.email);
        localStorage.setItem("tempToken", tempToken);

        toast.success("Verify your Email!");
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
          role: "freelancer",
        });

        window.location.href = response.verificationUrl;

      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-[#F0EFEC] flex items-center justify-center py-20">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-black sm:text-3xl">Sign Up</h1>
            <p className="mt-2 text-sm text-gray-400">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={loginImage}
              alt="Logo"
              className="mx-auto h-12 w-auto mb-4"
            />

            <div>
              <Label htmlFor="fullName" className="text-black">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                className="text-black placeholder:text-gray-400"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="username" className="text-black">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe123"
                className="text-black placeholder:text-gray-400"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-black">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 text-black placeholder:text-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-black">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 text-black placeholder:text-gray-400"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="role" className="text-black">Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md text-black bg-white border-black focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </Button>
            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-gray-300 hover:text-black">
                Login
              </a>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="text-gray-900 hover:underline">Terms</a>,{" "}
              <a href="#" className="text-gray-900 hover:underline">Data Policy</a>, and{" "}
              <a href="#" className="text-gray-900 hover:underline">Cookies Policy</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
