import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  createdProject: null,
  clientProjects: [],
  loadingProjects: false,
  errorProjects: null,
  singleProposal: null,
  loadingSingleProposal: false,
  errorSingleProposal: null,
  projectProposals: [],
  loadingProjectProposals: false,
  errorProjectProposals: null,
  singleProject: null,
  loadingSingleProject: false,
  errorSingleProject: null,

};

const projectSlice = createSlice({
  name: "clientProject",
  initialState,
  reducers: {
    // Create Project
    CREATE_PROJECT_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    CREATE_PROJECT_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
      state.createdProject = action.payload;
      state.error = null;
    },
    CREATE_PROJECT_FAIL: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    RESET_PROJECT_STATE: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.createdProject = null;
    },

    // Get Client Projects
    GET_CLIENT_PROJECTS_REQUEST: (state) => {
      state.loadingProjects = true;
      state.errorProjects = null;
    },
    GET_CLIENT_PROJECTS_SUCCESS: (state, action) => {
      state.loadingProjects = false;
      state.clientProjects = action.payload;
      state.errorProjects = null;
    },
    GET_CLIENT_PROJECTS_FAIL: (state, action) => {
      state.loadingProjects = false;
      state.errorProjects = action.payload;
    },
    RESET_CLIENT_PROJECTS_STATE: (state) => {
      state.loadingProjects = false;
      state.errorProjects = null;
      state.clientProjects = [];
    },

    // Delete Project
    DELETE_CLIENT_PROJECT_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    DELETE_CLIENT_PROJECT_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
      state.clientProjects = state.clientProjects.filter(
        (p) => p._id !== action.payload
      );
      state.error = null;
    },
    DELETE_CLIENT_PROJECT_FAIL: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Update Project Status
    UPDATE_CLIENT_PROJECT_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    UPDATE_CLIENT_PROJECT_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
      const updatedProject = action.payload;
      state.clientProjects = state.clientProjects.map((p) =>
        p._id === updatedProject._id ? updatedProject : p
      );
      state.error = null;
    },
    UPDATE_CLIENT_PROJECT_FAIL: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    // Update Project Visibility
    UPDATE_CLIENT_PROJECT_VISIBILITY_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    UPDATE_CLIENT_PROJECT_VISIBILITY_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = true;
      const updatedProject = action.payload;
      state.clientProjects = state.clientProjects.map((p) =>
        p._id === updatedProject._id ? updatedProject : p
      );
      state.error = null;
    },
    UPDATE_CLIENT_PROJECT_VISIBILITY_FAIL: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },


    // Get Single Proposal
    GET_SINGLE_PROPOSAL_REQUEST: (state) => {
      state.loadingSingleProposal = true;
      state.errorSingleProposal = null;
      state.singleProposal = null;
    },
    GET_SINGLE_PROPOSAL_SUCCESS: (state, action) => {
      state.loadingSingleProposal = false;
      state.singleProposal = action.payload;
      state.errorSingleProposal = null;
    },
    GET_SINGLE_PROPOSAL_FAIL: (state, action) => {
      state.loadingSingleProposal = false;
      state.singleProposal = null;
      state.errorSingleProposal = action.payload;
    },


    // Get Single Project
    GET_SINGLE_PROJECT_REQUEST: (state) => {
      state.loadingSingleProject = true;
      state.errorSingleProject = null;
      state.singleProject = null;
    },
    GET_SINGLE_PROJECT_SUCCESS: (state, action) => {
      state.loadingSingleProject = false;
      state.singleProject = action.payload;
      state.errorSingleProject = null;
    },
    GET_SINGLE_PROJECT_FAIL: (state, action) => {
      state.loadingSingleProject = false;
      state.singleProject = null;
      state.errorSingleProject = action.payload;
    },


    // Get All Proposals for a Project
    GET_PROJECT_PROPOSALS_REQUEST: (state) => {
      state.loadingProjectProposals = true;
      state.errorProjectProposals = null;
    },
    GET_PROJECT_PROPOSALS_SUCCESS: (state, action) => {
      state.loadingProjectProposals = false;
      state.projectProposals = action.payload;
      state.errorProjectProposals = null;
    },
    GET_PROJECT_PROPOSALS_FAIL: (state, action) => {
      state.loadingProjectProposals = false;
      state.errorProjectProposals = action.payload;
    },

  },
});

export const {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  RESET_PROJECT_STATE,

  GET_CLIENT_PROJECTS_REQUEST,
  GET_CLIENT_PROJECTS_SUCCESS,
  GET_CLIENT_PROJECTS_FAIL,
  RESET_CLIENT_PROJECTS_STATE,

  DELETE_CLIENT_PROJECT_REQUEST,
  DELETE_CLIENT_PROJECT_SUCCESS,
  DELETE_CLIENT_PROJECT_FAIL,

  UPDATE_CLIENT_PROJECT_REQUEST,
  UPDATE_CLIENT_PROJECT_SUCCESS,
  UPDATE_CLIENT_PROJECT_FAIL,

  UPDATE_CLIENT_PROJECT_VISIBILITY_REQUEST,
  UPDATE_CLIENT_PROJECT_VISIBILITY_SUCCESS,
  UPDATE_CLIENT_PROJECT_VISIBILITY_FAIL,

  GET_SINGLE_PROPOSAL_REQUEST,
  GET_SINGLE_PROPOSAL_SUCCESS,
  GET_SINGLE_PROPOSAL_FAIL,

  GET_PROJECT_PROPOSALS_REQUEST,
  GET_PROJECT_PROPOSALS_SUCCESS,
  GET_PROJECT_PROPOSALS_FAIL,

  GET_SINGLE_PROJECT_REQUEST,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_FAIL
  
} = projectSlice.actions;

export default projectSlice.reducer;
