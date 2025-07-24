import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    name: '',
  },
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter.name = action.payload
    }
  },
});

export const {changeFilter} = slice.actions

export const filterReducer = slice.reducer
