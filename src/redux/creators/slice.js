import { createSlice } from '@reduxjs/toolkit';
import { fetchTopCreators } from './operations';

const creatorsSlice = createSlice({
  name: 'creators',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTopCreators.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopCreators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopCreators.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default creatorsSlice.reducer;
