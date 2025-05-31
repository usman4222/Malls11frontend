import axiosInstance from "../../utils/axiosInstance";
import { GET_ALL_FREELANCERS_FAIL, GET_ALL_FREELANCERS_REQUEST, GET_ALL_FREELANCERS_SUCCESS } from "../../store/slices/freelancer/allFreelancers";


export const getAllFreelancers = () => async (dispatch) => {
    try {
        dispatch(GET_ALL_FREELANCERS_REQUEST());

        const response = await axiosInstance.get('/profile/get-all-freelancers');

        console.log("response", response.data);
        

        dispatch(GET_ALL_FREELANCERS_SUCCESS(response.data.users));
    } catch (error) {
        console.error("Error fetching projects:", error);
        dispatch(GET_ALL_FREELANCERS_FAIL(error.message || "Failed to fetch projects"));
    }
};


