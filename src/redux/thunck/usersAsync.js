import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { apiRegister, getUsersApi } from '../../utils/api';

export const getUsersAsync = createAsyncThunk('users/all-users', async (pageNumber, thunckApi) => {
  try {
    const { data } = await getUsersApi.get(`/all-users`);
    return data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const createNewUserFromDashboard = createAsyncThunk(
  'users/create-new-user',
  async ({ userData, closePopup }, thunckApi) => {
    try {
      await apiRegister.post('/create-account', { ...userData });
      notification.success({
        description: 'Successfully Created New User.!',
        duration: 2,
        showProgress: true,
        message: 'Create User',
        placement: 'topRight',
      });
      thunckApi.dispatch(getUsersAsync());
      closePopup();
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);

export const updateUserFromDashboard = createAsyncThunk(
  'users/update-user',
  async (newUserData, thunckApi) => {
    try {
      const { data } = await getUsersApi.put('/update-profile?_method=PUT', newUserData);

      notification.success({
        description: 'Successfully Update User.!',
        duration: 2,
        showProgress: true,
        message: 'Updated User',
        placement: 'topRight',
      });

      thunckApi.dispatch(getUsersAsync());
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);

export const deleteUserFromDashboard = createAsyncThunk(
  'users/delete-user',
  async (userID, thunckApi) => {
    try {
      const { data } = await getUsersApi.delete(`/delete-profile/${userID}`);
      notification.success({
        description: 'Successfully Delete User.!',
        duration: 2,
        showProgress: true,
        message: 'Delete User',
        placement: 'topRight',
      });

      thunckApi.dispatch(getUsersAsync());
      return data?.data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
