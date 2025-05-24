import axios from "axios";
import { CLIENT_VERIFICATION_FAIL, CLIENT_VERIFICATION_REQUEST, CLIENT_VERIFICATION_SUCCESS, COMPLETE_PROFILE_FAIL, COMPLETE_PROFILE_REQUEST, COMPLETE_PROFILE_SUCCESS, DELETE_PROFILE_FAIL, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, GET_PROFILE_FAIL, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../../store/slices/userSlice";
import axiosInstance from "../../utils/axiosInstance";


let baseurl = "http://localhost:3000";

export const createUserProfile = (profileData, token) => async (dispatch, getState) => {
    try {
        dispatch(COMPLETE_PROFILE_REQUEST());

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`${baseurl}/profile/create-profile`, profileData, config);

        dispatch(COMPLETE_PROFILE_SUCCESS(data.user));

    } catch (error) {
        dispatch(
            COMPLETE_PROFILE_FAIL(
                error.response?.data?.message || error.message || "Something went wrong"
            )
        );
    }
};


export const verifyClient = (verificationData, token) => async (dispatch) => {
    try {
        dispatch(CLIENT_VERIFICATION_REQUEST());

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.put(`${baseurl}/profile/verify-profile`, verificationData, config);


        dispatch(CLIENT_VERIFICATION_SUCCESS(data));
    } catch (error) {
        dispatch(
            CLIENT_VERIFICATION_FAIL(
                error.response?.data?.message || error.message
            )
        );
    }
};



export const fetchUserProfile = (token) => async (dispatch, getState) => {
    try {
        dispatch(GET_PROFILE_REQUEST());

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.get(`${baseurl}/profile/get-user-profile`, config);

        dispatch(GET_PROFILE_SUCCESS(res.data.user));
    } catch (error) {
        dispatch(GET_PROFILE_FAIL(error.response?.data?.message || error.message));
    }
};



export const updateUserProfile = (updatedData, token) => async (dispatch, getState) => {
    try {
        dispatch(UPDATE_PROFILE_REQUEST());

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.put(`${baseurl}/profile/update-profile`, updatedData, config);
        dispatch(UPDATE_PROFILE_SUCCESS(res.data.user));
    } catch (error) {
        dispatch(UPDATE_PROFILE_FAIL(error.response?.data?.message || error.message));
    }
};



export const logoutUser = () => async (dispatch) => {
    try {
        await axiosInstance.post("/profile/logout");
        dispatch(LOGOUT_SUCCESS());
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "Logout failed";
        dispatch(LOGOUT_FAIL(errorMessage));
        throw new Error(errorMessage);
    }
};


export const deleteUserProfile = (password) => async (dispatch) => {
    try {
        dispatch(DELETE_PROFILE_REQUEST());
        await axiosInstance.delete("/profile/delete-profile", {
            data: { password },
        });

        dispatch(DELETE_PROFILE_SUCCESS());
        dispatch(logoutUser());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete profile";
        dispatch(DELETE_PROFILE_FAIL(errorMessage));
        return { success: false, message: errorMessage };
    }
};

