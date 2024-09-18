import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, apiRegister, getUsersApi } from '../../utils/api';
import { notification } from 'antd';

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

export const getCompounds = createAsyncThunk('compounds/get-compounds', async (_, thunckApi) => {
  try {
    const { data } = await api.get('/compounds');

    return data?.data;
  } catch (error) {
    return thunckApi.rejectWithValue(error);
  }
});

export const deleteCompounds = createAsyncThunk(
  'compounds/delete-compound',
  async (compoundID, thunckApi) => {
    try {
      console.log('done');
      const { data } = await getUsersApi.delete(`/compounds/${compoundID}`);
      notification.success({
        description: 'Successfully Delete Compound.!',
        duration: 2,
        showProgress: true,
        message: 'Delete Compound',
        placement: 'topRight',
      });

      thunckApi.dispatch(getCompounds());
    } catch (error) {
      console.log(error);
      return thunckApi.rejectWithValue(error);
    }
  }
);
