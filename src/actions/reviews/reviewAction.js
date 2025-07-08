import { CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_FREELANCER_REVIEWS_FAIL, GET_FREELANCER_REVIEWS_REQUEST, GET_FREELANCER_REVIEWS_SUCCESS } from "../../store/slices/review/reviewSlice";
import axiosInstance from "../../utils/axiosInstance";

export const createReview = (reviewData) => async (dispatch) => {
    dispatch(CREATE_REVIEW_REQUEST());

    try {
        const { data } = await axiosInstance.post(`/review/create-review`, reviewData);

        dispatch(CREATE_REVIEW_SUCCESS(data.reviews));

        return data.reviews;
    } catch (error) {
        dispatch(
            CREATE_REVIEW_FAIL(
                error.response?.data?.message || "Failed to create review. Please try again."
            )
        );
        throw error;
    }
};



export const getFreelancerReviews = (Id) => async (dispatch) => {
    dispatch(GET_FREELANCER_REVIEWS_REQUEST());

    try {
        const { data } = await axiosInstance.get(`/review/freelancer-reviews/${Id}`);

        dispatch(GET_FREELANCER_REVIEWS_SUCCESS(data));

        return data;
    } catch (error) {
        dispatch(
            GET_FREELANCER_REVIEWS_FAIL(
                error.response?.data?.message || "Failed to fetch freelancer reviews. Please try again."
            )
        );
        throw error;
    }
};
