import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";


export const getZones = createAsyncThunk(
    'Zones/get-Zones',
    async (_, thunckApi) => {
      try {
        const { data } = await api.get('/zones');
        // const state=thunckApi.getState()
        // console.log(state)
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const getTypes = createAsyncThunk(
    'Types/get-Types',
    async (_, thunckApi) => {
      try {
        const { data } = await api.get('/types');
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
export const getStatus = createAsyncThunk(
    'Status/get-Status',
    async (_, thunckApi) => {
      try {
        const { data } = await api.get('/status');
        return data?.data;
      } catch (error) {
        return thunckApi.rejectWithValue(error);
      }
    }
  );
