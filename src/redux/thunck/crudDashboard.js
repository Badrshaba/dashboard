import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../utils/api";



export const getDashboard = createAsyncThunk(
    'Dashboard/get-Dashboard',
    async (_, thunckApi) => {
      try {
        const { data } = await getUsersApi.get('/dashboard'); 
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );