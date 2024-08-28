import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, apiRegister } from '../../utils/api';
<<<<<<< HEAD
import { updateUsersList } from '../slices/users';
import { notification } from 'antd';
=======
>>>>>>> dd3829d689423e8600753d4ee5b073fa72263b61

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

      notification.success({
        description: 'Successfully Created New User.!',
        duration: 2,
        showProgress: true,
        message: 'Create User',
        placement: 'topRight',
      });

      thunckApi.dispatch(getUsersAsync());
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
