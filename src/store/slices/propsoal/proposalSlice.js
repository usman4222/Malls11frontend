import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null,
    proposal: null,
};

const proposalSlice = createSlice({
    name: "proposal",
    initialState,
    reducers: {
        CREATE_PROPOSAL_REQUEST: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        CREATE_PROPOSAL_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            state.proposal = action.payload;
        },
        CREATE_PROPOSAL_FAIL: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        CLEAR_PROPOSAL_STATE: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.proposal = null;
        },
    },
});

export const {
    CREATE_PROPOSAL_REQUEST,
    CREATE_PROPOSAL_SUCCESS,
    CREATE_PROPOSAL_FAIL,
    CLEAR_PROPOSAL_STATE,
} = proposalSlice.actions;

export default proposalSlice.reducer;
