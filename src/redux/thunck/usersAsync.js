import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getUsersAsync = createAsyncThunk('users/get-all-users', async (_, thunckApi) => {
  try {
    const { data } = await api.get('/get-users');
    return data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});
