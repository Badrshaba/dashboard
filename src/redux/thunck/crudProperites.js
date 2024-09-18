import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRegister } from '../../utils/api';
import { notification } from 'antd';

export const getProperites = createAsyncThunk('properites/get-properites', async (_, thunckApi) => {
  try {
    const { data } = await apiRegister.get('/apartments');
    return data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const getProperityById = createAsyncThunk(
  'properites/get-properity-by-id',
  async (id, thunckApi) => {
    try {
      const { data } = await apiRegister.get(`/apartments/${id}`);
      console.log(data);
      return data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
export const deleteProperityById = createAsyncThunk(
  'properites/delete-properity-by-id',
  async ({ id, onClose }, thunckApi) => {
    try {
      const { data } = await apiRegister.delete(`/apartments/${id}`);
      onClose();
      notification.success({
        description: 'Successfully Delete Apparment.!',
        duration: 2,
        showProgress: true,
        message: 'Delete Appartment',
        placement: 'topRight',
      });
      return data?.data;
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
