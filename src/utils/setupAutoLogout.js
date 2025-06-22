import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired, setupAutoLogout } from "./authUtils";
import { LOGOUT_SUCCESS } from "../store/slices/userSlice";

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const tokenExpiry = useSelector((state) => state.user.tokenExpiry);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) return;

    if (isTokenExpired(tokenExpiry)) {
      dispatch(LOGOUT_SUCCESS());
    } else {
      setupAutoLogout(tokenExpiry, dispatch);
    }
  }, [tokenExpiry, token, dispatch]);
};

export default useAutoLogout;
