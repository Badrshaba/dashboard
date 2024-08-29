import { createSlice } from '@reduxjs/toolkit';
import { createNewBunnerFromDashboard, getBunnersAsync } from '../thunck/bunnersAsync';

const initialState = {
  bunners: [],
  isLoading: false,
  error: null,
};
const bunnersSlice = createSlice({
  name: 'bunners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBunnersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBunnersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bunners = action.payload;
      })
      .addCase(getBunnersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewBunnerFromDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBunnerFromDashboard.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createNewBunnerFromDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bunnersSlice.reducer;
