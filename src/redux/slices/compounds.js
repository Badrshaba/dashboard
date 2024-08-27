import { createSlice } from '@reduxjs/toolkit';
import { createCompounds } from '../thunck/crudCompounds';

const initialState = {
  compounds: [],
  isLoading: false,
  error: null,
};
const compoundsSlice = createSlice({
  name: 'compounds',
  initialState,
  reducers: {
    updatecompoundsList(state, action) {
      state.compounds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.compounds = action.payload;
      })
      .addCase(createCompounds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        
      });
  },
});


export const {updatecompoundsList} = compoundsSlice.actions;

export default compoundsSlice.reducer;