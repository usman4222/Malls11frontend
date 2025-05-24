import { CREATE_PROJECT_FAIL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS } from "../../store/slices/client/projectSlice";
import axiosInstance from "../../utils/axiosInstance";

export const createProject = (formData) => async (dispatch) => {
    try {
        dispatch(CREATE_PROJECT_REQUEST());

        const data = await axiosInstance.post(
            "/project/create-project", formData
        );
        dispatch(CREATE_PROJECT_SUCCESS(data));

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete profile";
        dispatch(CREATE_PROJECT_FAIL(errorMessage));
        console.log("errorMessage", errorMessage);

        // return { success: false, message: errorMessage };
        // console.log(errorMessage);

    }
};