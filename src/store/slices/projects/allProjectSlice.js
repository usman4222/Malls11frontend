import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    allProjects: [],
    loadingProjects: false,
    errorProjects: null,
};

const allProjectSlice = createSlice({
    name: "allProjects",
    initialState,
    reducers: {
        GET_ALL_PROJECTS_REQUEST: (state) => {
            state.loadingProjects = true;
            state.errorProjects = null;
        },
        GET_ALL_PROJECTS_SUCCESS: (state, action) => {
            state.loadingProjects = false;
            state.allProjects = action.payload;
            state.errorProjects = null;
        },
        GET_ALL_PROJECTS_FAIL: (state, action) => {
            state.loadingProjects = false;
            state.errorProjects = action.payload;
        },
    },
});

export const {
    GET_ALL_PROJECTS_REQUEST,
    GET_ALL_PROJECTS_SUCCESS,
    GET_ALL_PROJECTS_FAIL,
} = allProjectSlice.actions;

export default allProjectSlice.reducer;
