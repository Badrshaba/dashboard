import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, apiRegister } from '../../utils/api';
import { updateUsersList } from '../slices/users';

export const getUsersAsync = createAsyncThunk('users/all-users', async (pageNumber, thunckApi) => {
  try {
    const { data } = await api.get(`/All-Users?page=${pageNumber}`);
    return data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const createNewUserFromDashboard = createAsyncThunk(
  'users/create-new-user',
  async (userData, thunckApi) => {
    try {
      const { data } = await apiRegister.post('/register', userData);
      thunckApi.dispatch(getUsersAsync());
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
