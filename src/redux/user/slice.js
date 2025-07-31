import { createSlice } from "@reduxjs/toolkit";
import { addToSaved, fetchOwnArticles, fetchSavedArticles, fetchUserInfo, removeFromSaved } from "./operations";
import { isAnyOf } from "@reduxjs/toolkit";
import { createArticle, deleteArticle, updateArticle } from "../articles/operations";

const initialState = {
  userInfo: {
    id: null,
    name: null,
    avatarUrl: null
  },
  savedArticles: [],
  ownArticles: [],
  isLoading: false,
  error: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.savedArticles = action.payload;
      })
      .addCase(fetchOwnArticles.fulfilled, (state, action) => {
        state.ownArticles = action.payload;
      })
      .addCase(addToSaved.fulfilled, (state, action) => {
        state.savedArticles.push(action.payload);
      })
      .addCase(removeFromSaved.fulfilled, (state, action) => {
        state.savedArticles = state.savedArticles.filter((article) => article.id !== action.payload);
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.ownArticles.unshift(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.ownArticles.findIndex((article) => article.id === updatedArticle.id);
        if (index !== -1) {
          state.ownArticles[index] = updatedArticle;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.ownArticles = state.ownArticles.filter((article) => article.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchUserInfo.pending,
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
      )
      .addMatcher(
        isAnyOf(
          fetchUserInfo.fulfilled,
          fetchSavedArticles.fulfilled,
          fetchOwnArticles.fulfilled,
          addToSaved.fulfilled,
          removeFromSaved.fulfilled,
          createArticle.fulfilled,
          updateArticle.fulfilled,
          deleteArticle.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  }
})

export const userReducer = slice.reducer;