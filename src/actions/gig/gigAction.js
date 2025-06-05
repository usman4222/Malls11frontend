import axiosInstance from "../../utils/axiosInstance";
import { CREATE_GIG_FAIL, CREATE_GIG_REQUEST, CREATE_GIG_SUCCESS, DELETE_GIG_FAIL, DELETE_GIG_REQUEST, DELETE_GIG_SUCCESS, GET_ALL_FREELANCER_GIGS_FAIL, GET_ALL_FREELANCER_GIGS_REQUEST, GET_ALL_FREELANCER_GIGS_SUCCESS, GET_GIG_FAIL, GET_GIG_REQUEST, GET_GIG_SUCCESS } from "../../store/slices/gig/gigSlice";


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




export const getAllFreelancerGigs = () => async (dispatch) => {
    try {
        dispatch(GET_ALL_FREELANCER_GIGS_REQUEST());
        const { data } = await axiosInstance.get('/gig/my-gigs');

        dispatch(GET_ALL_FREELANCER_GIGS_SUCCESS(data.gigs));

        return data.gigs;
    } catch (error) {
        dispatch(GET_ALL_FREELANCER_GIGS_FAIL(error.message || "Failed to fetch projects"));

        throw error
    }
};

export const getSingleGig = (gigId) => async (dispatch) => {
    try {
        dispatch(GET_GIG_REQUEST());

        const { data } = await axiosInstance.get(`/gig/get-single-gig/${gigId}`);

        dispatch(GET_GIG_SUCCESS(data.gig));

        return data.gig;
    } catch (error) {
        dispatch(GET_GIG_FAIL(error.response?.data?.message || error.message));
        throw error;
    }
};


export const deleteGig = (gigId) => async (dispatch) => {

    dispatch(DELETE_GIG_REQUEST());

    try {
        const { data } = await axiosInstance.delete(`/gig/delete-gig/${gigId}`);

        dispatch(DELETE_GIG_SUCCESS(data.data));
    } catch (error) {
        dispatch(
            DELETE_GIG_FAIL(
                error.response?.data?.message || "Failed to update project status"
            )
        );
    }
};