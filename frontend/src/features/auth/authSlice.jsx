import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loginLoading: false,
  checkingAuth: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loginLoading = true;
    },

    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    loginFailure: (state) => {
      state.loginLoading = false;
    },

    checkAuthSuccess: (state, action) => {
      state.checkingAuth = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      console.log(action.payload.user);
    },

    checkAuthFailure: (state) => {
      state.checkingAuth = false;
      state.user = null;
      state.isAuthenticated = false;
    },

    logout: (state) => {
      state.user = null;
      state.loginLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  checkAuthSuccess,
  checkAuthFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;