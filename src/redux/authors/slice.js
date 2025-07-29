import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { selectNameFilter } from '../redux/filtersSlice';
import { fetchAuthors, authorItem } from "./operations";
import { logOutThunk } from "../auth/operations";

const slice = createSlice({
  name: "authors",
  initialState: {
    items: [],
    loading: false,
    loadingApp: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(authorItem.fulfilled, (state, action) => {
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
        isAnyOf(fetchAuthors.pending, authorItem.pending),
        (state) => {
          state.loadingApp = true;
          state.error = null;
        }
      )
      // .addMatcher(isAnyOf(authorItem.pending), (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })

      .addMatcher(
        isAnyOf(fetchAuthors.rejected, authorItem.rejected),
        (state, action) => {
          state.loading = false;
          state.loadingApp = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchAuthors.fulfilled, authorItem.fulfilled),
        (state) => {
          state.error = null;
          state.loading = false;
          state.loadingApp = false;
        }
      );
  },
});

export default slice.reducer;
