import { createSlice } from '@reduxjs/toolkit';
import { deleteProperityById, getProperites, getProperityById } from '../thunck/crudProperites';

const initialState = {
  properites: [],
  properity: {},
  isLoading: false,
  error: null,
};

const properitesSLice = createSlice({
  name: 'properites',
  initialState,
  reducers: {
    setProperites: (state, action) => {
      state.properites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properites = action.payload;
      })
      .addCase(getProperites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProperityById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properity = action.payload;
      })
      .addCase(getProperityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProperityById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProperityById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProperityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setProperites } = properitesSLice.actions;

export default properitesSLice.reducer;
