import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/SiteComponents/ui/button"
import { Input } from "@/components/SiteComponents/ui/input"
import { Label } from "@/components/SiteComponents/ui/label"
import loginImage from "@/assets/images/Landingpage/logo-edited.png"
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "@/actions/users/UserAction"
import { useAuth } from "@/hooks/useAuth"

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user, token } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            setIsLoading(true);

            const data = await changePassword({ currentPassword, newPassword, token });

            if (data?.success) {
                toast.success("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                navigate("/profile");
            } else {
                console.log(data?.message);

                toast.error(data?.message || "Failed to change password");
            }
        } catch (error) {
            console.error("error", error);
            const message =
                error.response?.data?.message || error.message || "Failed to change password";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F0EFEC] flex items-center justify-center h-[100vh]">
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-black sm:text-3xl">Change Password</h1>
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
                            <Label htmlFor="currentPassword" className="text-black">
                                Current Password
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Current Password"
                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-black">
                                New Password
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

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
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Changing..." : "Change Password"}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default ChangePassword