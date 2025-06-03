import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null,
    clientProposal: [], // changed from null to array for mapping
};

const clientProposalSlice = createSlice({
    name: "clientProposal",
    initialState,
    reducers: {
        // Fetch all client proposals
        GET_ALL_CLIENT_PROPOSAL_REQUEST: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        GET_ALL_CLIENT_PROPOSAL_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            state.clientProposal = action.payload;
        },
        GET_ALL_CLIENT_PROPOSAL_FAIL: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },

        // Update a single proposal's status
        UPDATE_CLIENT_PROPOSAL_STATUS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        UPDATE_CLIENT_PROPOSAL_STATUS_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            const updatedProject = action.payload;
            state.clientProposal = state.clientProposal.map((p) =>
                p._id === updatedProject._id ? updatedProject : p
            );
            state.error = null;
        },
        UPDATE_CLIENT_PROPOSAL_STATUS_FAIL: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

export const {
    GET_ALL_CLIENT_PROPOSAL_REQUEST,
    GET_ALL_CLIENT_PROPOSAL_SUCCESS,
    GET_ALL_CLIENT_PROPOSAL_FAIL,

    
    UPDATE_CLIENT_PROPOSAL_STATUS_REQUEST,
    UPDATE_CLIENT_PROPOSAL_STATUS_SUCCESS,
    UPDATE_CLIENT_PROPOSAL_STATUS_FAIL,
} = clientProposalSlice.actions;

export default clientProposalSlice.reducer;
