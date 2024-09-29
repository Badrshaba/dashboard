import { createSlice } from '@reduxjs/toolkit';
import { createPackage, deletePackage, getPackages, updatePackage } from '../thunck/crudPackege';

const initialState = {
  packages: [],
  isLoading: false,
  error: null,
};
const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = action.payload;
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages.push(action.payload);
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = state.packages.filter((item) => item.id !== action.payload);
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.packages = state.packages.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })
      })
  },
});

export default packagesSlice.reducer;
