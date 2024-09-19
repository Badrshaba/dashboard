import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRegister, getUsersApi } from "../../utils/api";
import { notification } from "antd";


export const getFeatures = createAsyncThunk(
    'features/get-features',
    async (_, thunckApi) => {
      try {
        const { data } = await getUsersApi.get('/apartments/featured');
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const addFeatures = createAsyncThunk(
    'features/add-features',
    async (featuredId, thunckApi) => {
      try {
        const { data } = await getUsersApi.get(`/apartments/feature/${featuredId}`);
        thunckApi.dispatch(getFeatures())
        notification.success({
        description: 'Successfully add .!',
        duration: 2,
        showProgress: true,
        message: 'Add ',
        placement: 'top',
      });
      console.log(data);
      return data?.data;
    } catch (error) {
        notification.error({
        description: error?.response?.data?.data[0] || error.message,
        duration: 2,
        showProgress: true,
        message: 'Error ',
        placement: 'topRight',
      });
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const deleteFeatures = createAsyncThunk(
    'features/delete-features',
    async (featuredId, thunckApi) => {
      try {
        const { data } = await getUsersApi.get(`/apartments/feature/unset/${featuredId}`);
        thunckApi.dispatch(getFeatures())
        notification.success({
        description: 'Successfully Delete .!',
        duration: 2,
        showProgress: true,
        message: 'Delete ',
        placement: 'topRight',
      });
        return data?.data;
      } catch (error) {
        notification.success({
          description: error?.message,
          duration: 2,
          showProgress: true,
          message: 'error',
          placement: 'topRight',
        });
        return thunckApi.rejectWithValue(error);
      }
    }
  );
 