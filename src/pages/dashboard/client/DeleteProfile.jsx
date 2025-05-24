import { useState } from "react";
import { Button } from "@/components/SiteComponents/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/SiteComponents/ui/input";
import { useDispatch } from "react-redux";
import { deleteUserProfile } from "../../../actions/profile/profileAction";
import { useAuth } from "@/hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteProfile() {
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!password.trim()) {
      toast.error("Password is required to delete your profile.");
      return;
    }

    if (window.confirm("Are you sure you want to delete your profile?")) {
      const result = await dispatch(deleteUserProfile(password));

      console.log("Delete profile result:", result);
      

      if (result?.success) {
        toast.success("Profile deleted successfully!");
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    }
  };



  return (
    <div className="sm:p-14 p-6 bg-[#F0EFEC] h-full">
      <ToastContainer />
      <h1 className="sm:text-3xl text-2xl font-bold">Delete Profile</h1>
      <div className="border p-6 mt-6 bg-white rounded-sm">
        <p className="text-sm text-gray-500">Are you sure! You want to delete your profile</p>
        <p className="pt-2 text-[14px]">This cannot be undone!</p>
        <p className="text-[14px] pt-6 font-medium">Please enter your login Password to confirm:</p>
        <Input
          type="password"
          placeholder="Password"
          required
          className="my-2 mt-2 py-5 sm:w-[500px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button onClick={handleDelete} className="bg-red-500 p-6 py-6 mt-4">
            Delete Profile <ArrowUpRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProfile;
