import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { selectNameFilter } from '../redux/filtersSlice';
import { fetchAuthors, fetchAuthorById } from "./operations";
import { logOutThunk } from "../auth/operations";

const slice = createSlice({
  name: "authors",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    loadingApp: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.items = action.payload.authors;
        state.total = action.payload.total;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (author) => author.id !== action.payload
        );
      })
      // ===================================================================
      .addCase(logOutThunk.fulfilled, (state) => {
        state.loadingApp = false;
        state.error = null;
        state.items = [];
      })
      // ===================================================================

      .addMatcher(
        isAnyOf(fetchAuthors.pending, fetchAuthorById.pending),
        (state) => {
          state.loadingApp = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(fetchAuthors.rejected, fetchAuthorById.rejected),
        (state, action) => {
          state.loading = false;
          state.loadingApp = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchAuthors.fulfilled, fetchAuthorById.fulfilled),
        (state) => {
          state.error = null;
          state.loading = false;
          state.loadingApp = false;
        }
      );
  },
});

export default slice.reducer;
