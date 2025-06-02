import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: null,
    loading: false,
    error: null,
};

const singleProjectSlice = createSlice({
    name: "singleProject",
    initialState,
    reducers: {
        GET_PROJECT_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_PROJECT_SUCCESS: (state, action) => {
            state.loading = false;
            state.project = action.payload;
        },
        GET_PROJECT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_PROJECT: (state) => {
            state.project = null;
            state.loading = false;
            state.error = null;
        }
    },
});

export const {
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL,
    CLEAR_PROJECT,
} = singleProjectSlice.actions;

export default singleProjectSlice.reducer;
