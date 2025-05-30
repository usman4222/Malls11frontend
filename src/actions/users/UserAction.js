import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_SUCCESS } from "../../store/slices/userSlice"
import axios from "axios";
import { decodeToken } from "../../utils/tokenUtils";
import axiosInstance from "../../utils/axiosInstance";

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const { data } = await axiosInstance.post(
            "/auth/register-user",
            userData
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: {
                email: data.email,
                userId: data.userId,
            },
        });
        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || "Registration failed. Please try again.";

        dispatch({
            type: REGISTER_USER_FAIL,
            payload: errorMessage,
        });

        throw error;
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const { data } = await axiosInstance.post(
            "/auth/login",
            { email, password },
        );
        
        const decoded = decodeToken(data.token);

        const tokenExpiry = decoded.exp ? decoded.exp * 1000 : null;


        dispatch(
            LOGIN_USER_SUCCESS({
                user: data.user,
                token: data.token,
                tokenExpiry
            })
        );

        return data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || "Login failed. Please try again.";
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: errorMessage,
        });

        throw error;
    }
};


export const forgetPassword = (email) => async () => {
    try {

        const { data } = await axiosInstance.post(
            "/auth/forget-password",
            { email }
        );

        return data;
    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message || "Something went wrong. Try again.",
        };
    }
};



export const resetPassword = async ({ email, newPassword, tempToken }) => {
    try {
        const response = await axiosInstance.post(
            `/auth/forget-password/reset-password/?tempToken=${tempToken}`,
            { email, newPassword }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data || { message: "An error occurred" };
    }
};


export const changePassword = async ({ currentPassword, newPassword, token }) => {
    try {
        const response = await axiosInstance.put(
            "/auth/change-password",
            {
                currentPassword,
                newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};