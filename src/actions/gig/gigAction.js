import axiosInstance from "../../utils/axiosInstance";
import { CREATE_GIG_FAIL, CREATE_GIG_REQUEST, CREATE_GIG_SUCCESS } from "../../store/slices/gig/gigSlice";


export const createGig = (formData) => async (dispatch) => {
    try {
        dispatch(CREATE_GIG_REQUEST());

        const data = await axiosInstance.post("/gig/create-gig", formData);
        dispatch(CREATE_GIG_SUCCESS(data));

        console.log("create gig data", data.data);

        return data.data;  
    } catch (error) {
        const errorMessage = error.response?.data?.data?.message || "Failed Gig creation";
        dispatch(CREATE_GIG_FAIL(errorMessage));
        console.log("errorMessage", errorMessage);
        throw error;
    }
};
