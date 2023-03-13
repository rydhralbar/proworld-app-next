import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  token: null,
  isLogin: false,
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
    setIsLogin: (state, payload) => {
      state.isLogin = payload;
    },
  },
});

export const { setProfile, setToken, setIsLogin } = authSlice.actions;

export default authSlice.reducer;
