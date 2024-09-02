import { createSlice } from '@reduxjs/toolkit';
import {
  createNewSubCategoryFromDashboard,
  getAllSubCategories,
} from '../thunck/subCategoriesAsync';

const initialState = {
  subCategories: [],
  isLoading: false,
  error: null,
};
const subCategoriesSlice = createSlice({
  name: 'sub-categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSubCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
      })
      .addCase(getAllSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewSubCategoryFromDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewSubCategoryFromDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
      })
      .addCase(createNewSubCategoryFromDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default subCategoriesSlice.reducer;
