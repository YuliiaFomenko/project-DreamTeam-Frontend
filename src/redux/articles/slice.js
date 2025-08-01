import { createSlice } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  fetchArticleById,
  fetchArticles,
  fetchPopular,
  updateArticle,
} from "./operations";
import { isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  popularArticles: [],
  selectedArticle: null,
  totalArticles: 0,
  totalPopular: 0,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "articles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.data.data;
        state.totalArticles = action.payload.data.totalItems;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popularArticles = action.payload.data.data;
        state.totalPopular = action.payload.data.totalItems;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.selectedArticle = action.payload;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.unshift(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.articles.findIndex(
          (article) => article.id === updatedArticle.id
        );
        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }
        if (state.selectedArticle?.id === updatedArticle.id) {
          state.selectedArticle = updatedArticle;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== action.payload
        );
        if (state.selectedArticle?.id === action.payload) {
          state.selectedArticle = null;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchArticles.pending,
          fetchArticleById.pending,
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
          fetchArticles.rejected,
          fetchArticleById.rejected,
          createArticle.rejected,
          updateArticle.rejected,
          deleteArticle.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchArticles.fulfilled,
          fetchArticleById.fulfilled,
          createArticle.fulfilled,
          updateArticle.fulfilled,
          deleteArticle.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const articlesReducer = slice.reducer;
