import { createSlice } from '@reduxjs/toolkit';
import { getAllSubCategories } from '../thunck/subCategoriesAsync';
import {  getZones } from '../thunck/crudOthers';

const initialState = {
  zones: [],
  isLoading: false,
  error: null,
};
const ZonesSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getZones.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getZones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.zones = action.payload;
      })
      .addCase(getZones.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default ZonesSlice.reducer;
