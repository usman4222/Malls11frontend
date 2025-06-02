import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null,
    clientProposal: null,
};

const clientProposalSlice = createSlice({
    name: "clientProposal",
    initialState,
    reducers: {
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
        }
    },
});

export const {
    GET_ALL_CLIENT_PROPOSAL_REQUEST,
    GET_ALL_CLIENT_PROPOSAL_SUCCESS,
    GET_ALL_CLIENT_PROPOSAL_FAIL,
} = clientProposalSlice.actions;

export default clientProposalSlice.reducer;
