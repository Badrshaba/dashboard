import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import properitesReducer from './slices/properites';
import usersReducers from './slices/users';
import compoundReducers from './slices/compounds';
import bunnersReducers from './slices/bunners';
import featuresReducers from './slices/features'

const store = configureStore({
  reducer: {
    user: userReducer,
    properites: properitesReducer,
    users: usersReducers,
    compounds: compoundReducers,
    bunners: bunnersReducers,
    features: featuresReducers
  },
});

export default store;
