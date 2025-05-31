import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingFreelancers: false,
    freelancers: [],
    errorFreelancers: null,
};

const freelancerSlice = createSlice({
    name: "freelancers",
    initialState,
    reducers: {
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
    },
});

export const {
    GET_ALL_FREELANCERS_REQUEST,
    GET_ALL_FREELANCERS_SUCCESS,
    GET_ALL_FREELANCERS_FAIL,
} = freelancerSlice.actions;

export default freelancerSlice.reducer;
