import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { updateUsersList } from '../slices/users';

export const getUsersAsync = createAsyncThunk('users/all-users', async (_, thunckApi) => {
  try {
    const { data } = await api.get('/All-Users');
    return data?.data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const createNewUserFromDashboard = createAsyncThunk(
  'users/create-new-user',
  async (userData, thunckApi) => {
    try {
      const { data } = await api.post('/register', userData);

      console.log(data);
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
