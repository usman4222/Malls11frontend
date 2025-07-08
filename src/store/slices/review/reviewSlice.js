import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null,
    review: null,
    allReviews: [],
    freelancerReviews: [], 
    singleReview: null,
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        // Create Review
        CREATE_REVIEW_REQUEST: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        CREATE_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            state.review = action.payload;
        },
        CREATE_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },


        GET_FREELANCER_REVIEWS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_FREELANCER_REVIEWS_SUCCESS: (state, action) => {
            state.loading = false;
            state.freelancerReviews = action.payload;
        },
        GET_FREELANCER_REVIEWS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // Get All Reviews
        GET_ALL_REVIEWS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_ALL_REVIEWS_SUCCESS: (state, action) => {
            state.loading = false;
            state.allReviews = action.payload;
        },
        GET_ALL_REVIEWS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Get Single Review
        GET_SINGLE_REVIEW_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_SINGLE_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.singleReview = action.payload;
        },
        GET_SINGLE_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,

    GET_FREELANCER_REVIEWS_REQUEST,
    GET_FREELANCER_REVIEWS_SUCCESS,
    GET_FREELANCER_REVIEWS_FAIL,

    GET_SINGLE_REVIEW_REQUEST,
    GET_SINGLE_REVIEW_SUCCESS,
    GET_SINGLE_REVIEW_FAIL,

    CLEAR_REVIEW_STATE,
} = reviewSlice.actions;


export default reviewSlice.reducer;
