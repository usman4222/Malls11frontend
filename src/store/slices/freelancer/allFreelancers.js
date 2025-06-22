import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingFreelancers: false,
    freelancers: [],
    errorFreelancers: null,

    loadingSingleFreelancer: false,
    singleFreelancer: null,
    errorSingleFreelancer: null,
};

const freelancerSlice = createSlice({
    name: "freelancers",
    initialState,
    reducers: {
        // All Freelancers
        GET_ALL_FREELANCERS_REQUEST: (state) => {
            state.loadingFreelancers = true;
            state.errorFreelancers = null;
        },
        GET_ALL_FREELANCERS_SUCCESS: (state, action) => {
            state.loadingFreelancers = false;
            state.freelancers = action.payload;
            state.errorFreelancers = null;
        },
        GET_ALL_FREELANCERS_FAIL: (state, action) => {
            state.loadingFreelancers = false;
            state.errorFreelancers = action.payload;
        },

        // Single Freelancer
        GET_SINGLE_FREELANCER_REQUEST: (state) => {
            state.loadingSingleFreelancer = true;
            state.errorSingleFreelancer = null;
            state.singleFreelancer = null;
        },
        GET_SINGLE_FREELANCER_SUCCESS: (state, action) => {
            state.loadingSingleFreelancer = false;
            state.singleFreelancer = action.payload;
            state.errorSingleFreelancer = null;
        },
        GET_SINGLE_FREELANCER_FAIL: (state, action) => {
            state.loadingSingleFreelancer = false;
            state.errorSingleFreelancer = action.payload;
        },
    },
});

export const {
    // All Freelancers
    GET_ALL_FREELANCERS_REQUEST,
    GET_ALL_FREELANCERS_SUCCESS,
    GET_ALL_FREELANCERS_FAIL,

    // Single Freelancer
    GET_SINGLE_FREELANCER_REQUEST,
    GET_SINGLE_FREELANCER_SUCCESS,
    GET_SINGLE_FREELANCER_FAIL,
} = freelancerSlice.actions;

export default freelancerSlice.reducer;
