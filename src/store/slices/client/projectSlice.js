import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  createdProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
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
  },
});

export const {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  RESET_PROJECT_STATE,
} = projectSlice.actions;

export default projectSlice.reducer;
