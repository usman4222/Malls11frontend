import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  allProjects: [],
  loadingProjects: false,
  errorProjects: null,

  singleProject: null,
  loadingSingleProject: false,
  errorSingleProject: null,
};

const allProjectSlice = createSlice({
  name: "allProjects",
  initialState,
  reducers: {
    // Get All Projects
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

    // Get Single Project
    GET_SINGLE_PROJECT_REQUEST: (state) => {
      state.loadingSingleProject = true;
      state.errorSingleProject = null;
      state.singleProject = null;
    },
    GET_SINGLE_PROJECT_SUCCESS: (state, action) => {
      console.log("Single Project Data from Action:", action.payload);
      state.loadingSingleProject = false;
      state.singleProject = action.payload;
      state.errorSingleProject = null;
    },
    GET_SINGLE_PROJECT_FAIL: (state, action) => {
      state.loadingSingleProject = false;
      state.singleProject = null;
      state.errorSingleProject = action.payload;
    },
  },
});

export const {
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,

  GET_SINGLE_PROJECT_REQUEST,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_FAIL,
} = allProjectSlice.actions;

export default allProjectSlice.reducer;
