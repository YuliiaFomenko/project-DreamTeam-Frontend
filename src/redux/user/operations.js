import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitAPI } from "../auth/operations";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(`/users/${userId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTopAuthors = createAsyncThunk(
  "user/fetchTopAuthors",
  async (page, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(
        `/top-authors?page=${page}&perPage=20`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSavedArticles = createAsyncThunk(
  "user/fetchSavedArticles",
  async (page, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(`/bookmarks?page=${page}&perPage=12`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnArticles = createAsyncThunk(
  "user/fetchOwnArticles",
  async ({ userId, page }, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(
        `/users/${userId}/articles?page=${page}&perPage=12`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToSaved = createAsyncThunk(
  "user/addToSaved",
  async (articleId, thunkAPI) => {
    try {
      const { data } = await goitAPI.patch(`/bookmarks/add/${articleId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromSaved = createAsyncThunk(
  "user/removeFromSaved",
  async (articleId, thunkAPI) => {
    try {
      const { data } = await goitAPI.patch(`/bookmarks/remove/${articleId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
