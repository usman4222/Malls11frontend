import { toast } from "react-toastify";
import { logoutUser } from "../actions/profile/profileAction";

export const handleLogout = async (dispatch, token) => {
  try {
    await dispatch(logoutUser(token));
    toast.success("Logout successful!");
  } catch (error) {
    toast.error(error?.message || "Logout failed. Please try again.");
  }
};
