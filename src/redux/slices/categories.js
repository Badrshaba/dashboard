import { createSlice } from '@reduxjs/toolkit';
import { getAllSubCategories } from '../thunck/subCategoriesAsync';
import { getAllCategories } from '../thunck/crudCategories';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
