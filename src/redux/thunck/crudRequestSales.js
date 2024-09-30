import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersApi } from '../../utils/api';

export const getAllRequestsForSales = createAsyncThunk('Ebrooker/get-all', async (_, thunkApi) => {
  try {
    const { data } = await getUsersApi.get('/sales/request');
     const newData = data?.data?.map((item) => {
      let userData = item?.user
      for (let key in userData) {
        userData[key+'_sales'] = userData[key]
        delete userData[key]
      }
       return {...userData,...item};
     })
    return newData
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});
export const getRequestsForSalesById = createAsyncThunk('Ebrooker/getById', async (id, thunkApi) => {
  try {
    const { data } = await getUsersApi.get(`/sales/show/${id}`);
     return data?.data;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});





