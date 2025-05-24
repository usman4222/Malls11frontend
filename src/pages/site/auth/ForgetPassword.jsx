import React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/SiteComponents/ui/button"
import { Input } from "@/components/SiteComponents/ui/input"
import { Label } from "@/components/SiteComponents/ui/label"
import { Checkbox } from "@/components/SiteComponents/ui/checkbox"
import loginImage from "@/assets/images/Landingpage/logo-edited.png"
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgetPassword, loginUser } from "@/actions/users/UserAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await dispatch(forgetPassword(email));

            if (!response?.success) {
                toast.error(response?.message || "Failed to send reset link");
                return;
            }

            const urlParams = new URL(response.verificationUrl).searchParams;
            const tempToken = urlParams.get("tempToken");

            localStorage.setItem("email", email);
            localStorage.setItem("tempToken", tempToken);

            toast.success("OTP sent successfully! Check your email.");
            setEmail("");

            window.location.href = response.verificationUrl;
        } catch (error) {
            console.error("error", error);
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to send reset link";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <div className="bg-[#F0EFEC] flex items-center justify-center h-[100vh] ">
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
            >
                <div className=" max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-black sm:text-3xl">Forget Password</h1>
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
                        <p className="mt-2 text-sm text-gray-400 text-center">Please enter the email address you'd like your password reset information sent to</p>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-black">
                                Email
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Request Reset Link"}
                        </Button>

                        <div className="text-center text-sm text-gray-400">
                            Remember Password?{" "}
                            <a href="/login" className="font-medium text-gray-300 hover:text-black">
                                login
                            </a>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

