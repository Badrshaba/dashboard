import { createSlice } from '@reduxjs/toolkit';
import {  getDashboard } from '../thunck/crudDashboard';

const initialState = {
  dashboard: {},
  isLoading: false,
  error: null,
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default dashboardSlice.reducer;
