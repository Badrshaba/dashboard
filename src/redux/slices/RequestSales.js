import { createSlice } from '@reduxjs/toolkit';
import { getAllRequestsForSales, getRequestsForSalesById } from '../thunck/crudRequestSales';

const initialState = {
  RequestSales: [],
  RequestSaller: {},
  isLoading: false,
  error: null,
};

const RequestSalesSlice = createSlice({
  name: 'RequestSales',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllRequestsForSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRequestsForSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RequestSales = action.payload;
      })
      .addCase(getAllRequestsForSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getRequestsForSalesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RequestSaller = action.payload;
      })
  },
});

//export const { setUser } = userSlice.actions;

export default RequestSalesSlice.reducer;
