import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitAPI } from "../auth/operations";

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async (_, thunkAPI) => {
    try {
      const response = await goitAPI.get("/authors");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAuthorById = createAsyncThunk(
  "authors/fetchAuthorById",
  async (id, thunkAPI) => {
    try {
      const response = await goitAPI.get(`/authors/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
