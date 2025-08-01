import { createSlice } from "@reduxjs/toolkit";
import {
  logInThunk,
  logOutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatarUrl: null,
    savedArticlesIDs: [],
  },
  registrationStatus: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.registrationStatus = action.payload.status;
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.user.id = action.payload.currentUser._id;
        state.user.name = action.payload.currentUser.name;
        state.user.email = action.payload.currentUser.email;
        state.user.avatarUrl = action.payload.currentUser.avatarUrl;
        state.user.savedArticlesIDs = action.payload.currentUser.savedArticles;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logOutThunk.fulfilled, () => initialState)
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user.id = action.payload.currentUser._id;
        state.user.name = action.payload.currentUser.name;
        state.user.email = action.payload.currentUser.email;
        state.user.avatarUrl = action.payload.currentUser.avatarUrl;
        state.user.savedArticlesIDs = action.payload.currentUser.savedArticles;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
