import { createSlice } from "@reduxjs/toolkit";
import {
  addToSaved,
  fetchOwnArticles,
  fetchSavedArticles,
  fetchTopAuthors,
  fetchUserInfo,
  removeFromSaved,
} from "./operations";
import { isAnyOf } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  updateArticle,
} from "../articles/operations";

const initialState = {
  users: {},
  savedArticles: [],
  savedArticlesPagination: {
    page: 1,
    perPage: 12,
    totalItems: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
  ownArticles: [],
  ownArticlesPagination: {
    page: 1,
    perPage: 12,
    totalItems: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
  topAuthors: [],
  topAuthorsPagination: {
    page: 1,
    perPage: 20,
    totalItems: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const user = action.payload.data;
        state.users[user._id] = user;
        state.isLoading = false;
      })
      .addCase(fetchTopAuthors.fulfilled, (state, action) => {
        state.topAuthors = action.payload.data.data;
        state.topAuthorsPagination = {
          page: action.payload.data.page,
          perPage: action.payload.data.perPage,
          totalItems: action.payload.data.totalItems,
          totalPages: action.payload.data.totalPages,
          hasPreviousPage: action.payload.data.hasPreviousPage,
          hasNextPage: action.payload.data.hasNextPage,
        };
        state.isLoading = false;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.savedArticles = action.payload.data.data;
        state.savedArticlesPagination = {
          page: action.payload.data.page,
          perPage: action.payload.data.perPage,
          totalItems: action.payload.data.totalItems,
          totalPages: action.payload.data.totalPages,
          hasPreviousPage: action.payload.data.hasPreviousPage,
          hasNextPage: action.payload.data.hasNextPage,
        };
        state.isLoading = false;
      })
      .addCase(fetchOwnArticles.fulfilled, (state, action) => {
        state.ownArticles = action.payload.data.data;
        state.ownArticlesPagination = {
          page: action.payload.data.page,
          perPage: action.payload.data.perPage,
          totalItems: action.payload.data.totalItems,
          totalPages: action.payload.data.totalPages,
          hasPreviousPage: action.payload.data.hasPreviousPage,
          hasNextPage: action.payload.data.hasNextPage,
        };
        state.isLoading = false;
      })
      .addCase(addToSaved.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromSaved.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.ownArticles.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.ownArticles.findIndex(
          (article) => article.id === updatedArticle.id
        );
        if (index !== -1) {
          state.ownArticles[index] = updatedArticle;
        }
        state.isLoading = false;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.ownArticles = state.ownArticles.filter(
          (article) => article.id !== action.payload
        );
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchUserInfo.pending,
          fetchTopAuthors.pending,
          fetchSavedArticles.pending,
          fetchOwnArticles.pending,
          addToSaved.pending,
          removeFromSaved.pending,
          createArticle.pending,
          updateArticle.pending,
          deleteArticle.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchUserInfo.rejected,
          fetchTopAuthors.rejected,
          fetchSavedArticles.rejected,
          fetchOwnArticles.rejected,
          addToSaved.rejected,
          removeFromSaved.rejected,
          createArticle.rejected,
          updateArticle.rejected,
          deleteArticle.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const userReducer = slice.reducer;
