import { createSlice } from '@reduxjs/toolkit';
import { getFeatures } from '../thunck/crudFeatures';

const initialState = {
  features: null,
  isLoading: false,
  error: null,
};

const FeaturesSlice = createSlice({
  name: 'Features',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeatures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.features = action.payload;
      })
      .addCase(getFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

//export const { setUser } = userSlice.actions;

export default FeaturesSlice.reducer;
