import { logoutUser } from "../actions/profile/profileAction";

export const isTokenExpired = (tokenExpiry) => {
    if (!tokenExpiry) return true; 

    const currentTime = Date.now();
    return currentTime >= tokenExpiry; 
};

export const checkAuth = (tokenExpiry) => {
  return !isTokenExpired(tokenExpiry);
};

export const setupAutoLogout = (tokenExpiry, dispatch) => {
    if (!tokenExpiry) return;

    const timeLeft = tokenExpiry - Date.now();

    if (timeLeft <= 0) {
        dispatch(logoutUser());
        return;
    }

    const timerId = setTimeout(() => {
        dispatch(logoutUser());
        // optional redirect
    }, timeLeft);

    return timerId;
};
