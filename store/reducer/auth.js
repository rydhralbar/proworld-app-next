import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile: (state, payload) => {
      state.profile = payload;
    },
    setToken: (state, payload) => {
      state.token = payload;
    },
    setTokenAndProfile: (state, payload) => {
      state.profile = payload.profile;
      state.token = payload.token;
    },
    removeProfile: (state) => {
      state.profile = null;
    },
    removeToken: (state) => {
      state.token = null;
    },
    removeTokenAndProfile: (state) => {
      state.token = null;
      state.profile = null;
    },
  },
});

export const {
  setProfile,
  setToken,
  setTokenAndProfile,
  removeProfile,
  removeToken,
  removeTokenAndProfile,
} = authSlice.actions;

export default authSlice.reducer;
