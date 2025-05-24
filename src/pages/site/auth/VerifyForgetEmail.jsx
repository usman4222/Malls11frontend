import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import { Label } from "@/components/SiteComponents/ui/label";
import loginImage from "@/assets/images/Landingpage/logo-edited.png";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyForgetEmail() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [tempToken, setTempToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const urlToken = searchParams.get("tempToken");
        const storedToken = localStorage.getItem("tempToken");

        if (storedEmail && (urlToken || storedToken)) {
            setEmail(storedEmail);
            setTempToken(urlToken || storedToken);
        } else {
            toast.error("Verification info not found. Please register again.");
            navigate("/register");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp || !email || !tempToken) return;

        try {
            setIsLoading(true);
            const res = await axios.post(
                `${backendUrl}/auth/forget-password/verifyOtp/?tempToken=${tempToken}`,
                {
                    email,
                    otp,
                }
            );

            if (res.data?.success === true) {
                toast.success(res.data.message);
                navigate(`/auth/forget-password/reset-password?tempToken=${tempToken}`);

            } else {
                toast.error(res.data.message || "Verification failed");
            }
        } catch (err) {
            console.log(err);

            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };


    const handleResendOtp = async () => {
        if (!email) {
            toast.error("Email not found.");
            return;
        }

        try {
            setIsResending(true);
            const res = await axios.post(
                `${backendUrl}/auth/forget-password/resendOtp?tempToken=${tempToken}`,
                { email },

            );

            if (res.data?.success) {
                toast.success(res.data.message || "OTP resent successfully!");
                if (res.data.data?.newTempToken) {
                    setTempToken(res.data.data.newTempToken);
                    localStorage.setItem("tempToken", res.data.data.newTempToken);
                }
            } else {
                toast.error(res.data.message || "Failed to resend OTP");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to resend OTP");
        } finally {
            setIsResending(false);
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
                <div className="p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-black sm:text-3xl">Verify Email</h1>
                        <p className="mt-2 text-sm text-gray-400">Enter the OTP sent to your email</p>
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

                        <div className="space-y-2">
                            <Label className="text-black">Email</Label>
                            <Input value={email} readOnly className="text-black bg-gray-100" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="otp" className="text-black">
                                OTP
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="pl-10 border-gray-600 text-black"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleResendOtp}
                            disabled={isResending}
                            className="text-sm font-medium text-green-600 hover:text-green-700"
                        >
                            {isResending ? "Resending OTP..." : "Resend OTP"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
