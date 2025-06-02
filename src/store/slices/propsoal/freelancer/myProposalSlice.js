import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null,
    freelancerProposals: [],

    singleLoading: false,
    singleProposal: null,
    singleError: null,

    updateLoading: false,
    updateSuccess: false,
    updateError: null,
};


const myProposals = createSlice({
    name: "freelancerProposals",
    initialState,
    reducers: {
        GET_MY_PROPOSALS_REQUEST: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        GET_MY_PROPOSALS_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            state.freelancerProposals = action.payload;
        },
        GET_MY_PROPOSALS_FAIL: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },


        // Update Proposal
        UPDATE_FREELANCER_PROPOSAL_REQUEST: (state) => {
            state.updateLoading = true;
            state.updateSuccess = false;
            state.updateError = null;
        },
        UPDATE_FREELANCER_PROPOSAL_SUCCESS: (state, action) => {
            state.updateLoading = false;
            state.updateSuccess = true;
            state.updateError = null;

            // Optionally update the proposal in freelancerProposals
            const index = state.freelancerProposals.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.freelancerProposals[index] = action.payload;
            }
        },
        UPDATE_FREELANCER_PROPOSAL_FAIL: (state, action) => {
            state.updateLoading = false;
            state.updateSuccess = false;
            state.updateError = action.payload;
        },

        // Clear State
        CLEAR_MY_PROPOSALS_STATE: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.freelancerProposals = [];
        },
        CLEAR_FREELANCER_UPDATE_PROPOSAL_STATE: (state) => {
            state.updateLoading = false;
            state.updateSuccess = false;
            state.updateError = null;
        },


        GET_SINGLE_PROPOSAL_REQUEST: (state) => {
            state.singleLoading = true;
            state.singleProposal = null;
            state.singleError = null;
        },
        GET_SINGLE_PROPOSAL_SUCCESS: (state, action) => {
            state.singleLoading = false;
            state.singleProposal = action.payload;
            state.singleError = null;
        },
        GET_SINGLE_PROPOSAL_FAIL: (state, action) => {
            state.singleLoading = false;
            state.singleProposal = null;
            state.singleError = action.payload;
        },


        // Delete Proposal
        WITHDRAW_FREELANCER_PROPOSAL_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        WITHDRAW_FREELANCER_PROPOSAL_SUCCESS: (state, action) => {
            state.loading = false;
            state.freelancerProposals = state.freelancerProposals.filter(
                (proposal) => proposal._id !== action.payload
            );
        },
        WITHDRAW_FREELANCER_PROPOSAL_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    GET_MY_PROPOSALS_REQUEST,
    GET_MY_PROPOSALS_SUCCESS,
    GET_MY_PROPOSALS_FAIL,
    CLEAR_MY_PROPOSALS_STATE,

    UPDATE_FREELANCER_PROPOSAL_REQUEST,
    UPDATE_FREELANCER_PROPOSAL_SUCCESS,
    UPDATE_FREELANCER_PROPOSAL_FAIL,
    CLEAR_FREELANCER_UPDATE_PROPOSAL_STATE,

    GET_SINGLE_PROPOSAL_REQUEST,
    GET_SINGLE_PROPOSAL_SUCCESS,
    GET_SINGLE_PROPOSAL_FAIL,

    WITHDRAW_FREELANCER_PROPOSAL_REQUEST,
    WITHDRAW_FREELANCER_PROPOSAL_SUCCESS,
    WITHDRAW_FREELANCER_PROPOSAL_FAIL,
} = myProposals.actions;

export default myProposals.reducer;
