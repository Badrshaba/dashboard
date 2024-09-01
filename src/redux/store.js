import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import properitesReducer from './slices/properites';
import usersReducers from './slices/users';
import compoundReducers from './slices/compounds';
import bunnersReducers from './slices/bunners';
<<<<<<< HEAD
import featuresReducers from './slices/features'
=======
import subCategoriesReducers from './slices/subCategories';
>>>>>>> a5a2aace7e14106ccc0a937790934bcd008b1191

const store = configureStore({
  reducer: {
    user: userReducer,
    properites: properitesReducer,
    users: usersReducers,
    compounds: compoundReducers,
    bunners: bunnersReducers,
<<<<<<< HEAD
    features: featuresReducers
=======
    subCategories: subCategoriesReducers,
>>>>>>> a5a2aace7e14106ccc0a937790934bcd008b1191
  },
});

export default store;
