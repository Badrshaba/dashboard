import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { notification } from 'antd';

export const getAllSubCategories = createAsyncThunk(
  'subCategories/get-all',
  async (_, thunkApi) => {
    try {
      const { data } = await api.get('/SubCategory');
      return data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createNewSubCategoryFromDashboard = createAsyncThunk(
  'subCategories/create-new-subCategory',
  async ({ sCateData, closePopup }, thunckApi) => {
    try {
      await api.post('/SubCategory', { ...sCateData });
      notification.success({
        description: 'Successfully Created New Sub Category.!',
        duration: 2,
        showProgress: true,
        message: 'Create Sub Category',
        placement: 'topRight',
      });
      thunckApi.dispatch(getAllSubCategories());
      closePopup();
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);

export const updateSubCategoryFromDashboard = createAsyncThunk(
  'subCategories/update-subCategory',
  async ({ sCateData, onClose }, thunckApi) => {
    try {
      await api.post(`/SubCategory/${sCateData.cat_id}?_method=PUT`, { ...sCateData });
      notification.success({
        description: 'Successfully Update Sub Category.!',
        duration: 2,
        showProgress: true,
        message: 'Update Sub Category',
        placement: 'topRight',
      });
      thunckApi.dispatch(getAllSubCategories());
      onClose();
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);

export const deleteSubCategoryFromDashboard = createAsyncThunk(
  'subCategories/update-subCategory',
  async ({ ID, onClose }, thunckApi) => {
    try {
      await api.delete(`/SubCategory/${ID}`);
      notification.success({
        description: 'Successfully Delete Sub Category.!',
        duration: 2,
        showProgress: true,
        message: 'Delete Sub Category',
        placement: 'topRight',
      });
      thunckApi.dispatch(getAllSubCategories());
      onClose();
    } catch (error) {
      return thunckApi.rejectWithValue(error);
    }
  }
);
