import { createSlice } from '@reduxjs/toolkit';
import { getAllSubCategories } from '../thunck/subCategoriesAsync';

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
      });
  },
});

export default subCategoriesSlice.reducer;
