import { createSlice } from "@reduxjs/toolkit";
import { logInThunk, logOutThunk, refreshThunk, registerThunk } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(registerThunk.fulfilled, (state, action)=> {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })
    .addCase (logInThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })
    .addCase(logOutThunk.fulfilled, () => initialState)
    .addCase(refreshThunk.fulfilled, (state, action) => {
      state.user =action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    })
    .addCase(refreshThunk.pending, (state) => {
      state.isRefreshing = true;
    })
    .addCase(refreshThunk.rejected, (state) => {
      state.isRefreshing = false;
    })

  }
})

export const authReducer = slice.reducer;