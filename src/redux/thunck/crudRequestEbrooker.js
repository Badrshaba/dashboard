import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersApi } from '../../utils/api';

export const getAllRequestsForEbrooker = createAsyncThunk('Ebrooker/get-all', async (_, thunkApi) => {
  try {
    const { data } = await getUsersApi.get('/brocker/request');
    const newData = data?.data?.map((item) => {
      return {...item?.user,...item};
    })
    return newData;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});
export const getRequestsForEbrookerById = createAsyncThunk('Ebrooker/getById', async (id, thunkApi) => {
  try {
    const { data } = await getUsersApi.get(`/brocker/show/${id}`);
    const { user } = data?.data
    delete data?.data?.user
    const newData = { ...user ,...data?.data }
    return newData;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});





