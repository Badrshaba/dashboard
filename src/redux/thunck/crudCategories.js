import { createAsyncThunk } from '@reduxjs/toolkit';
import { cateApi } from '../../utils/api';
import { notification } from 'antd';

export const getAllCategories = createAsyncThunk('categories/get-all', async (_, thunkApi) => {
  try {
    const { data } = await cateApi.get('/categories');

    return data?.data;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});

export const createNewCategoryFromDashboard = createAsyncThunk(
  'categories/add-category',
  async ({ cateDate, closePopup }, thunkApi) => {
    try {
      const { data } = await cateApi.post('/categories', { ...cateDate });
      notification.success({
        description: 'Successfully Added  New Category.!',
        duration: 2,
        showProgress: true,
        message: 'Add Category',
        placement: 'topRight',
      });
      thunkApi.dispatch(getAllCategories());
      closePopup();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCategoryFromDashboard = createAsyncThunk(
  'categories/update-category',
  async ({ cateDate, closePopup }, thunkApi) => {
    try {
      const { data } = await cateApi.post(`/categories/${cateDate.id}?_method=PUT`, {
        ...cateDate,
      });
      notification.success({
        description: 'Successfully Updated Category.!',
        duration: 2,
        showProgress: true,
        message: 'Update Category',
        placement: 'topRight',
      });
      thunkApi.dispatch(getAllCategories());
      closePopup();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCategoryFromDashboard = createAsyncThunk(
  'categories/delete-category',
  async (cateId, thunkApi) => {
    try {
      const { data } = await cateApi.delete(`/categories/${cateId}`);
      notification.success({
        description: 'Successfully Deleted Category.!',
        duration: 2,
        showProgress: true,
        message: 'Delete Category',
        placement: 'topRight',
      });
      thunkApi.dispatch(getAllCategories());
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
