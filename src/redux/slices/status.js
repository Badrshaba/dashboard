import { createSlice } from '@reduxjs/toolkit';
import {  getStatus } from '../thunck/crudOthers';

const initialState = {
  status: [],
  isLoading: false,
  error: null,
};
const ZonesSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default ZonesSlice.reducer;
