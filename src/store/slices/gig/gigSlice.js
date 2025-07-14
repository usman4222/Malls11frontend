import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingGigs: false,
    gigs: [],
    errorGigs: null,

    creatingGig: false,
    createdGig: null,
    errorCreateGig: null,

    gig: null,
    loading: false,
    error: null
};

const gigSlice = createSlice({
    name: "gigs",
    initialState,
    reducers: {
        // Get All Gigs
        GET_MY_GIGS_REQUEST: (state) => {
            state.loadingGigs = true;
            state.errorGigs = null;
        },
        GET_MY_GIGS_SUCCESS: (state, action) => {
            state.loadingGigs = false;
            state.gigs = action.payload;
            state.errorGigs = null;
        },
        GET_MY_GIGS_FAIL: (state, action) => {
            state.loadingGigs = false;
            state.errorGigs = action.payload;
        },


        // Get User Gigs
        GET_USER_GIGS_REQUEST: (state) => {
            state.loadingGigs = true;
            state.errorGigs = null;
        },
        GET_USER_GIGS_SUCCESS: (state, action) => {
            state.loadingGigs = false;
            state.gigs = action.payload;
            state.errorGigs = null;
        },
        GET_USER_GIGS_FAIL: (state, action) => {
            state.loadingGigs = false;
            state.errorGigs = action.payload;
        },


        // Create Gig
        CREATE_GIG_REQUEST: (state) => {
            state.creatingGig = true;
            state.createdGig = null;
            state.errorCreateGig = null;
        },
        CREATE_GIG_SUCCESS: (state, action) => {
            state.creatingGig = false;
            state.createdGig = action.payload;
            state.errorCreateGig = null;
        },
        CREATE_GIG_FAIL: (state, action) => {
            state.creatingGig = false;
            state.errorCreateGig = action.payload;
        },

        // Get Single Gig
        GET_GIG_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },
        GET_GIG_SUCCESS: (state, action) => {
            console.log("GET_GIG_SUCCESS", action.payload);
            
            state.loading = false;
            state.gig = action.payload;
        },
        GET_GIG_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // Update Gig Status
        CHANGE_GIG_STATUS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        CHANGE_GIG_STATUS_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = true;
            const updatedGig = action.payload;
            state.gigs = state.gigs.map((g) =>
                g._id === updatedGig._id ? updatedGig : g
            );
            state.error = null;
        },
        CHANGE_GIG_STATUS_FAIL: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },



        // Delete Gig
        DELETE_GIG_REQUEST: (state) => {
            state.loadingGigs = true;
            state.errorGigs = null;
        },
        DELETE_GIG_SUCCESS: (state, action) => {
            state.loadingGigs = false;
            state.gigs = state.gigs.filter(
                (p) => p._id !== action.payload
            );
            state.errorGigs = null;
        },
        DELETE_GIG_FAIL: (state, action) => {
            state.loadingGigs = false;
            state.errorGigs = action.payload;
        },
    },
});

export const {
    GET_MY_GIGS_REQUEST,
    GET_MY_GIGS_SUCCESS,
    GET_MY_GIGS_FAIL,

    CREATE_GIG_REQUEST,
    CREATE_GIG_SUCCESS,
    CREATE_GIG_FAIL,

    GET_GIG_REQUEST,
    GET_GIG_SUCCESS,
    GET_GIG_FAIL,

    GET_USER_GIGS_REQUEST,
    GET_USER_GIGS_SUCCESS,
    GET_USER_GIGS_FAIL,

    CHANGE_GIG_STATUS_REQUEST,
    CHANGE_GIG_STATUS_SUCCESS,
    CHANGE_GIG_STATUS_FAIL,


    DELETE_GIG_REQUEST,
    DELETE_GIG_SUCCESS,
    DELETE_GIG_FAIL,

} = gigSlice.actions;

export default gigSlice.reducer;
