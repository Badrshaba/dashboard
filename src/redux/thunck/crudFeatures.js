import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRegister } from "../../utils/api";


export const getFeatures = createAsyncThunk(
    'features/get-features',
    async (_, thunckApi) => {
      try {
        const { data } = await apiRegister.get('/featured');
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
