import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getAllCategories = createAsyncThunk('categories/get-all', async (_, thunkApi) => {
  try {
    const { data } = await api.get('/categories');

    return data?.data;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});

export const createNewCategoryFromDashboard = createAsyncThunk(
  'categories/add-category',
  async ({ cateDate, closePopup }, thunkApi) => {
    try {
      const { data } = await api.post(
        'https://ai.w-manage.org/api/categories',
        { ...cateDate },
        {
          headers: {
            Accept: 'application/json',
            APP_KEY: import.meta.env.VITE_APP_KEY,
          },
        }
      );
      console.log(data);
      closePopup();
      return data?.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCategoryFromDashboard = createAsyncThunk(
  'categories/update-category',
  async ({ cateDate, closePopup }, thunkApi) => {
    try {
      const { data } = await api.post(
        '/categories',
        { ...cateDate },
        {
          headers: {
            Accept: 'application/json',
            APP_KEY: import.meta.env.VITE_APP_KEY,
          },
        }
      );
      console.log(data);
      closePopup();
      return data?.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
