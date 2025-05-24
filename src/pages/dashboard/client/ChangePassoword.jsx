import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "@/actions/users/UserAction";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/SiteComponents/ui/form";
import { Form } from "../../../components/SiteComponents/ui/form";


const ChangePassword = () => {
    // Show/hide password states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const user = useSelector((state) => state.user || null);
    const token = user?.token;

    // Initialize react-hook-form
    const form = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { watch, handleSubmit, setError, clearErrors } = form;

    // Watch the newPassword and confirmPassword for validation
    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data) => {
        // Manual validation for matching passwords
        if (data.newPassword !== data.confirmPassword) {
            setError("confirmPassword", { type: "manual", message: "Passwords don't match" });
            return;
        } else {
            clearErrors("confirmPassword");
        }

        try {
            setIsLoading(true);
            const response = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                token,
            });

            if (response?.success) {
                toast.success("Password changed successfully!");
                form.reset(); // reset form fields
                navigate("/profile");
            } else {
                toast.error(response?.message || "Failed to change password");
            }
        } catch (error) {
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
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-black sm:text-3xl">Change Password</h1>
                    </div>

                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Current Password Field */}
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    placeholder="Current Password"
                                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                                    id="currentPassword"
                                                />
                                            </FormControl>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* New Password Field */}
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="New Password"
                                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                                    id="newPassword"
                                                />
                                            </FormControl>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password Field */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm Password"
                                                    className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
                                                    id="confirmPassword"
                                                />
                                            </FormControl>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Changing..." : "Change Password"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
