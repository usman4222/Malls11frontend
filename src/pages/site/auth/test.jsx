// import React from "react"
// import { useState } from "react"
// import { Eye, EyeOff, Lock, Mail } from "lucide-react"
// import { Button } from "../../../components/SiteComponents/ui/button"
// import { Input } from "../../../components/SiteComponents/ui/input"
// import { Label } from "../../../components/SiteComponents/ui/label"
// import { Checkbox } from "../../../components/SiteComponents/ui/checkbox"
// import loginImage from "../../../assets/images/Landingpage/logo-edited.png"
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { loginUser } from "../../../actions/users/UserAction"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"

// export default function test() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("");
//     const [textarea, setTextarea] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             setIsLoading(true);
//             const response = await dispatch(loginUser(email, password));

//             if (response?.success === false) {
//                 toast.error(response?.message || "Login failed");
//                 return;
//             }

//             toast.success("Login successful!");
//             setEmail("");
//             setPassword("");

//         } catch (error) {
//             console.log("error", error);

//             const message =
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Login failed. Please try again.";
//             toast.error(message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         setEmail("");
//         setPassword("");
//         setRole("");
//         setTextarea("");
//         toast.success("Form cleared!");
//         return
//     }
//     return (
//         <div className="bg-[#F0EFEC] flex items-center justify-center h-[100vh] ">
//             <ToastContainer />
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
//             >
//                 <div className=" max-w-md rounded-lg bg-white p-8 shadow-lg">
//                     <div className="mb-6 text-center">
//                         <h1 className="text-2xl font-bold text-black sm:text-3xl">Login</h1>
//                         <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* <motion.img
//                             initial={{ scale: 0.5 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 0.5 }}
//                             src={loginImage}
//                             alt="Logo"
//                             className="mx-auto h-12 w-auto mb-4"
//                         /> */}
//                         <div className="space-y-2">
//                             <Label htmlFor="email" className="text-black">
//                                 Email
//                             </Label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                     <Mail className="h-5 w-5 text-gray-500" />
//                                 </div>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="password" className="text-black">
//                                 Password
//                             </Label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-500" />
//                                 </div>
//                                 <Input
//                                     id="password"
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="••••••••"
//                                     className="pl-10 pr-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     className="absolute inset-y-0 right-0 flex items-center pr-3"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                     {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
//                                 </button>
//                             </div>
//                         </div>

//                         <div>
//                             <Label htmlFor="role" className="text-black">Role</Label>
//                             <select
//                                 id="role"
//                                 name="role"
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 className="w-full mt-1 p-2 border rounded-md text-black bg-white border-black focus:outline-none focus:ring-1 focus:ring-gray-500"
//                             >
//                                 <option value="freelancer">Male</option>
//                                 <option value="client">Female</option>
//                                 <option value="client">other</option>
//                             </select>
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="textarea" className="text-black">
//                                 Text Area
//                             </Label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                     <Mail className="h-5 w-5 text-gray-500" />
//                                 </div>
//                                 <Input
//                                     id="textarea"
//                                     type="textarea"
//                                     placeholder="Enter your message here"
//                                     className="pl-10 border-gray-600 text-black placeholder:text-gray-400 focus-visible:ring-gray-500"
//                                     value={textarea}
//                                     onChange={(e) => setTextarea(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex gap-10">
//                             <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Signing in..." : "Sign in"}
//                             </Button>
//                             <Button onClick={handleCancel} type="cancel" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "canceling..." : "Cancel"}
//                             </Button>
//                         </div>

//                         <div className="text-center text-sm text-gray-400">
//                             Don't have an account?{" "}
//                             <a href="/register" className="font-medium text-gray-300 hover:text-black">
//                                 Sign up
//                             </a>
//                         </div>
//                     </form>
//                     {/* <div className="mt-6">
//                         <p className="text-xs leading-5 text-gray-500">
//                             By signing in, you agree to our{" "}
//                             <a href="#" className="font-medium text-gray-900 hover:underline">
//                                 Terms
//                             </a>
//                             ,{" "}
//                             <a href="#" className="font-medium text-gray-900 hover:underline">
//                                 Data Policy
//                             </a>{" "}
//                             and{" "}
//                             <a href="#" className="font-medium text-gray-900 hover:underline">
//                                 Cookies Policy
//                             </a>
//                             .
//                         </p>
//                     </div> */}
//                 </div>
//             </motion.div>
//         </div>
//     )
// }