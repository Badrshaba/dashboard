import { createSlice } from "@reduxjs/toolkit";


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
    }
})


export const {setProperites}=properitesSLice.actions

export default properitesSLice.reducer