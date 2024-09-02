import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRegister } from "../../utils/api";


export const getProperites = createAsyncThunk(
    'properites/get-properites',
    async (_, thunckApi) => {
      try {
        const { data } = await apiRegister.get('/apartments');
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
