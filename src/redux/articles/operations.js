import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitAPI } from "../auth/operations";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (_, thunkAPI) => {
    try {
      const { data } = await goitAPI.get("/articles");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPopular = createAsyncThunk(
  "articles/fetchPopular",
  async (_, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(
        "/articles?sortBy=rate&sortOrder=desc&minRate=1"
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (articleId, thunkAPI) => {
    try {
      const { data } = await goitAPI.get(`/articles/${articleId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (formData, thunkAPI) => {
    try {
      const { data } = await goitAPI.post("/articles", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ articleId, formData }, thunkAPI) => {
    try {
      const { data } = await goitAPI.patch(`/articles/${articleId}`, formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId, thunkAPI) => {
    try {
      await goitAPI.delete(`/articles/${articleId}`);
      return articleId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
