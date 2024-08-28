import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRegister } from '../../utils/api';


export const createCompounds = createAsyncThunk(
  'compounds/create-compounds',
  async (compoundsData, thunckApi) => {
    try {
      const { data } = await apiRegister.post('/compounds', compoundsData);
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);

export const getCompounds = createAsyncThunk(
  'compounds/get-compounds',
  async (_, thunckApi) => {
    try {
      const { data } = await apiRegister.get('/compounds');
      return data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
