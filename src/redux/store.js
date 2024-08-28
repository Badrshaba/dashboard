import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import properitesReducer from './slices/properites';
import usersReducers from './slices/users';
import compoundReducers from "./slices/compounds"

const store = configureStore({
  reducer:{
    user:userReducer,
    properites:properitesReducer,
    users:usersReducers,
    compounds:compoundReducers,
  }
});

export default store;
