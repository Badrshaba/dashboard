import { createSlice } from '@reduxjs/toolkit';
import { createCompounds, getCompoundById, getCompounds } from '../thunck/crudCompounds';

const initialState = {
  compounds: [],
  compound:{},
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
      .addCase(getCompounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.compounds = action.payload;
      })
      .addCase(getCompounds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCompounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompounds.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createCompounds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCompoundById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompoundById.fulfilled, (state,action) => {
        state.isLoading = false;
        state.compound = action.payload;
      })
      .addCase(getCompoundById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export const {updatecompoundsList} = compoundsSlice.actions;

export default compoundsSlice.reducer;