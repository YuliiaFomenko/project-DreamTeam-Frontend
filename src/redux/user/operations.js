import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitAPI } from "../auth/operations";

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', 
  async (userId, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(`/users/${userId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  })

export const fetchSavedArticles = createAsyncThunk('user/fetchSavedArticles',
  async (_, thunkAPI) => {
    try {
      const { data } = await goitAPI.get("/bookmarks");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const fetchOwnArticles = createAsyncThunk('user/fetchOwnArticles',
  async (userId, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(`/users/${userId}/articles`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const addToSaved = createAsyncThunk('user/addToSaved',
  async (articleId, thunkAPI) => {
    try {
      const { data } = await goitAPI.post(`/bookmarks/add/${articleId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const removeFromSaved = createAsyncThunk('user/removeFromSaved',
  async (articleId, thunkAPI) => {
    try {
      await goitAPI.delete(`/bookmarks/remove/${articleId}`);
      return articleId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
