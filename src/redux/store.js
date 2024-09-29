import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import properitesReducer from './slices/properites';
import usersReducers from './slices/users';
import compoundReducers from './slices/compounds';
import bunnersReducers from './slices/bunners';
import featuresReducers from './slices/features';
import categoriesReducer from './slices/categories';
import subCategoriesReducers from './slices/subCategories';
import ZonesReducers from './slices/zone';
import TypeReducers from './slices/type';
import StatusReducers from './slices/status';
import authrization from './slices/authrization';
import dashboardSlice from './slices/dashboard';
import RequestEbrookerSlice from './slices/RequestEbrooker';
import packages from './slices/packages';

const store = configureStore({
  reducer: {
    dashboard:dashboardSlice,
    user: userReducer,
    properites: properitesReducer,
    users: usersReducers,
    compounds: compoundReducers,
    bunners: bunnersReducers,
    features: featuresReducers,
    categories: categoriesReducer,
    subCategories: subCategoriesReducers,
    zones: ZonesReducers,
    types:TypeReducers,
    status:StatusReducers,
    authrization,
    RequestEbrooker:RequestEbrookerSlice,
    packages
  },
});

export default store;
