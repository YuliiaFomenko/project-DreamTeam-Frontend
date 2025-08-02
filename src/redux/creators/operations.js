import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopCreators = createAsyncThunk(
  'creators/fetchTopCreators',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('https://project-dreamteam-backend.onrender.com/top-authors');
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
