import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { bannersApi, getUsersApi } from '../../utils/api';

export const getBunnersAsync = createAsyncThunk('bunners/all-bunners', async (_, thunckApi) => {
  try {
    const { data } = await getUsersApi.get(`/banner`);
    return data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const createNewBunnerFromDashboard = createAsyncThunk(
  'bunners/create-new-banner',
  async ({ image, onClose, setFiles }, thunckApi) => {
    try {
      const { data } = await bannersApi.post('/banner', { image });
      notification.success({
        description: 'Successfully Created New Banner.!',
        duration: 2,
        showProgress: true,
        message: 'Create Banner',
        placement: 'topRight',
      });
      onClose();
      setFiles([]);
      thunckApi.dispatch(getBunnersAsync(1));
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);

export const deleteBannerFromDashboard = createAsyncThunk(
  'bunners/delete-banner',
  async (bannerId, thunckApi) => {
    try {
      const { data } = await bannersApi.delete(`/banner/${bannerId}`);
      notification.success({
        description: 'Successfully Delete  Banner.!',
        duration: 2,
        showProgress: true,
        message: 'Delete Banner',
        placement: 'topRight',
      });

      thunckApi.dispatch(getBunnersAsync(1));
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
