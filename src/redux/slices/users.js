import { createSlice } from '@reduxjs/toolkit';
import { getUsersAsync } from '../thunck/usersAsync';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsersList(state, action) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        
      });
  },
});


export const {updateUsersList} = usersSlice.actions;

export default usersSlice.reducer;