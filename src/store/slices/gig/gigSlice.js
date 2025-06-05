import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingGigs: false,
  gigs: [],
  errorGigs: null,

  creatingGig: false,
  createdGig: null,
  errorCreateGig: null,
};

const gigSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {
    // Get All Gigs
    GET_ALL_GIGS_REQUEST: (state) => {
      state.loadingGigs = true;
      state.errorGigs = null;
    },
    GET_ALL_GIGS_SUCCESS: (state, action) => {
      state.loadingGigs = false;
      state.gigs = action.payload;
      state.errorGigs = null;
    },
    GET_ALL_GIGS_FAIL: (state, action) => {
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
  },
});

export const {
  GET_ALL_GIGS_REQUEST,
  GET_ALL_GIGS_SUCCESS,
  GET_ALL_GIGS_FAIL,

  
  CREATE_GIG_REQUEST,
  CREATE_GIG_SUCCESS,
  CREATE_GIG_FAIL,
} = gigSlice.actions;

export default gigSlice.reducer;
