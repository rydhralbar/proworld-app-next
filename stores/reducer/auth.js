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
  },
});

export const { setProfile, setToken } = authSlice.actions;

export default authSlice.reducer;
