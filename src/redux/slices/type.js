import { createSlice } from '@reduxjs/toolkit';
import {  getTypes } from '../thunck/crudOthers';

const initialState = {
  types: [],
  isLoading: false,
  error: null,
};
const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.types = action.payload;
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default typesSlice.reducer;
