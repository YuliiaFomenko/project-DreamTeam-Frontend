import { createSlice } from "@reduxjs/toolkit";
import {
  logInThunk,
  logOutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";
import { addToSaved, removeFromSaved } from "../user/operations.js";

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
  pendingRegistration: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // нові reducers
    setPendingRegistration(state, action) {
      state.pendingRegistration = action.payload;
    },
    clearPendingRegistration(state) {
      state.pendingRegistration = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.registrationStatus = action.payload.status;
        state.isRefreshing = false;
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.user.id = action.payload.data.currentUser._id;
        state.user.name = action.payload.data.currentUser.name;
        state.user.email = action.payload.data.currentUser.email;
        state.user.avatarUrl = action.payload.data.currentUser.avatarUrl;
        state.user.savedArticlesIDs =
          action.payload.data.currentUser.savedArticles;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logOutThunk.fulfilled, () => initialState)
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user.id = action.payload.data.currentUser._id;
        state.user.name = action.payload.data.currentUser.name;
        state.user.email = action.payload.data.currentUser.email;
        state.user.avatarUrl = action.payload.data.currentUser.avatarUrl;
        state.user.savedArticlesIDs =
          action.payload.data.currentUser.savedArticles;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(addToSaved.fulfilled, (state, action) => {
        state.user.savedArticlesIDs = action.payload.data.savedArticles;
      })
      .addCase(removeFromSaved.fulfilled, (state, action) => {
        state.user.savedArticlesIDs = action.payload.data.savedArticles;
      })
      .addCase(logInThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logInThunk.rejected, (state) => {
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

// експорт нових action'ів
export const { setPendingRegistration, clearPendingRegistration } =
  slice.actions;
export const authReducer = slice.reducer;
