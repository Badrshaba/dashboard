import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getUsersAsync = createAsyncThunk('users/all-users', async (_, thunckApi) => {
  try {
    const { data } = await api.get('/All-Users');
    return data?.data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});
