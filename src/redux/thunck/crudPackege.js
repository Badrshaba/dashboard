import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../utils/api";
import { notification } from "antd";
import { data } from "autoprefixer";


export const getPackages = createAsyncThunk(
    'Package/get-Package',
    async (_, thunckApi) => {
      try {
        const { data } = await getUsersApi.get('/packages');
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const createPackage = createAsyncThunk(
    'Package/add-Package',
    async (formData, thunckApi) => {
      try {
        const { data } = await getUsersApi.post('/packages', formData);
        notification.success({
            description: 'Successfully add .!',
            duration: 2,
            showProgress: true,
            message: 'Add Package',
            placement: 'topRight',
          });
        return data?.data;
      } catch (error) {
        console.log(error);
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const deletePackage = createAsyncThunk(
    'Package/delete-Package',
    async ({id,onClose}, thunckApi) => {
      try {
        const { data } =  await getUsersApi.delete(`/packages/${id}`);
            notification.success({
            description: 'Successfully delete .!',
            duration: 2,
            showProgress: true,
            message: 'delete Package',
            placement: 'topRight',
          });
        setTimeout(() => {
            onClose()
        }, 500);
        return id
      } catch (error) {
        console.log(error);
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const updatePackage = createAsyncThunk(
    'Package/update-Package',
    async (formData, thunckApi) => {
      try {
         const { data } =  await getUsersApi.post(`/packages/${formData.id}?_method=PUT`, formData);
            notification.success({
            description: 'Successfully update .!',
            duration: 2,
            showProgress: true,
            message: 'update Package',
            placement: 'topRight',
          });
        return data?.data
      } catch (error) {
        console.log(error);
        return thunckApi.rejectWithValue(error);
      }
    }
  );

