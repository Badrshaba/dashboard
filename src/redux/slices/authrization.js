import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  authButton: false,
};
const authrizationSlice = createSlice({
  name: 'authrization',
  initialState,
  reducers: {
    updateAuthButton:(state,action)=>{
        if(action.payload.role==1||action.payload.role==5){
            state.authButton = true
        }else{
            state.authButton = false
        }
    }
  },
});
export const { updateAuthButton } = authrizationSlice.actions;

export default authrizationSlice.reducer;
