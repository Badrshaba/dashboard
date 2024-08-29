import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { api, apiRegister, getUsersApi } from '../../utils/api';

export const getBunnersAsync = createAsyncThunk('bunners/all-bunners', async (_, thunckApi) => {
  try {
    const { data } = await getUsersApi.get(`/banner`);
    return data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const createNewBunnerFromDashboard = createAsyncThunk(
  'bunners/create-new-bunner',
  async (userData, thunckApi) => {
    try {
      const { data } = await apiRegister.post('/register', userData);

      notification.success({
        description: 'Successfully Created New Bunner.!',
        duration: 2,
        showProgress: true,
        message: 'Create User',
        placement: 'topRight',
      });

      thunckApi.dispatch(getBunnersAsync(1));
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
