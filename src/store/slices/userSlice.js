import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  error: null,
  loading: false,
  tokenExpiry: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Register actions
    REGISTER_USER_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.currentUser = {
        email: action.payload.email,
        userId: action.payload.userId,
      };
      state.loading = false;
      state.error = null;
    },
    REGISTER_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login actions
    LOGIN_USER_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      console.log("Login success payload:", action.payload);
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.tokenExpiry;
      state.loading = false;
      state.error = null;
    },
    LOGIN_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //profile actions
    COMPLETE_PROFILE_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    COMPLETE_PROFILE_SUCCESS: (state, action) => {
      // Update currentUser with additional profile info
      state.currentUser = {
        ...state.currentUser,
        ...action.payload, // includes updated profile data
      };
      state.loading = false;
      state.error = null;
    },
    COMPLETE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    // ✅ Get user profile actions
    GET_PROFILE_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    GET_PROFILE_SUCCESS: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    GET_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    // ✅ Update profile actions
    UPDATE_PROFILE_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
      state.loading = false;
      state.error = null;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    // Add to reducers in createSlice:
    CLIENT_VERIFICATION_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    CLIENT_VERIFICATION_SUCCESS: (state, action) => {
      // Update only the verification part of the profile
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
        profile_status: "completed",
      };
      state.loading = false;
      state.error = null;
    },
    CLIENT_VERIFICATION_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },



    // ✅ Delete profile actions
    DELETE_PROFILE_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    DELETE_PROFILE_SUCCESS: (state) => {
      state.currentUser = null;
      state.token = null;
      state.tokenExpiry = null;
      state.loading = false;
      state.error = null;
    },
    DELETE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    // Logout actions
    LOGOUT_SUCCESS: (state) => {
      state.currentUser = null;
      state.token = null;
      state.tokenExpiry = null;
      state.loading = false;
      state.error = null;
    },
    LOGOUT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  COMPLETE_PROFILE_REQUEST,
  COMPLETE_PROFILE_SUCCESS,
  COMPLETE_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  CLIENT_VERIFICATION_REQUEST,
  CLIENT_VERIFICATION_SUCCESS,
  CLIENT_VERIFICATION_FAIL,
  DELETE_PROFILE,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} = userSlice.actions;

export default userSlice.reducer;