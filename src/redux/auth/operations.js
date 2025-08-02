import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const goitAPI = axios.create({
  baseURL: "https://project-dreamteam-backend.onrender.com",
  withCredentials: true,
}); //створення індивідуального екземпляра axios, який вже налаштований з baseURL

function setAuthHeader(token) {
  goitAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // goitAPI.interceptors.request.use(
  //   (config) => {
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
}

const clearAuthHeader = () => {
  goitAPI.defaults.headers.common["Authorization"] = "";
  //delete goitAPI.defaults.headers.common["Authorization"];
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    try {
      const response = await goitAPI.post("/auth/register", body);
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logInThunk = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    try {
      const response = await goitAPI.post("/auth/login", body);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await goitAPI.post("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await goitAPI.get("/auth/refresh");
      const accessToken = response.data.accessToken;
      setAuthHeader(accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
