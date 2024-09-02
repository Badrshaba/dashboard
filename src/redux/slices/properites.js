import { createSlice } from "@reduxjs/toolkit";
import { getProperites } from "../thunck/crudProperites";


const initialState={
    properites:[],
    isLoading:false,
    error:null
}


const properitesSLice=createSlice({
    name:'properites',
    initialState,
    reducers:{
        setProperites:(state,action)=>{
           state.properites=action.payload
        }
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
          });
      },
})


export const {setProperites}=properitesSLice.actions

export default properitesSLice.reducer