import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired, setupAutoLogout } from "./authUtils";
import { logoutUser } from "../actions/profile/profileAction";

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const tokenExpiry = useSelector((state) => state.user.tokenExpiry);
  const token = useSelector((state) => state.user.token);

  const timerRef = useRef(null); 

  useEffect(() => {
    // ✅ Always clear the previous timer (even if no token)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // ✅ Avoid conditional early return that skips hook logic
    if (!token || !tokenExpiry) return;

    if (isTokenExpired(tokenExpiry)) {
      dispatch(logoutUser());
    } else {
      timerRef.current = setupAutoLogout(tokenExpiry, dispatch);
    }

    // ✅ Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [tokenExpiry, token, dispatch]);
};

export default useAutoLogout;
