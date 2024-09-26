import { createSlice } from '@reduxjs/toolkit';
import { getAllRequestsForEbrooker,getRequestsForEbrookerById } from '../thunck/crudRequestEbrooker';

const initialState = {
  RequestEbrookers: [],
  RequestEbrooker: {},
  isLoading: false,
  error: null,
};

const RequestEbrookerSlice = createSlice({
  name: 'RequestEbrooker',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllRequestsForEbrooker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRequestsForEbrooker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RequestEbrookers = action.payload;
      })
      .addCase(getAllRequestsForEbrooker.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getRequestsForEbrookerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequestsForEbrookerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RequestEbrooker = action.payload;
      })
      .addCase(getRequestsForEbrookerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

//export const { setUser } = userSlice.actions;

export default RequestEbrookerSlice.reducer;
