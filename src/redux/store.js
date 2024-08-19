import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user'
import properitesReducer from './slices/properites'

const store =configureStore({
    reducers:{
        user:userReducer,
        properites:properitesReducer,
    }
})


export default store;