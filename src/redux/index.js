import store from './store';
import {
  getBunnersAsync,
  createNewBunnerFromDashboard,
  deleteBannerFromDashboard,
} from './thunck/bunnersAsync';
import {
  getAllCategories,
  createNewCategoryFromDashboard,
  updateCategoryFromDashboard,
  deleteCategoryFromDashboard,
} from './thunck/crudCategories';
import { getCompounds, createCompounds, deleteCompounds } from './thunck/crudCompounds';
import {
  getAllSubCategories,
  createNewSubCategoryFromDashboard,
  updateSubCategoryFromDashboard,
  deleteSubCategoryFromDashboard,
} from './thunck/subCategoriesAsync';
import {
  getUsersAsync,
  createNewUserFromDashboard,
  updateUserFromDashboard,
  deleteUserFromDashboard,
} from './thunck/usersAsync';

export {
  store,
  getBunnersAsync,
  createNewBunnerFromDashboard,
  deleteBannerFromDashboard,
  getAllCategories,
  createNewCategoryFromDashboard,
  updateCategoryFromDashboard,
  deleteCategoryFromDashboard,
  getCompounds,
  createCompounds,
  deleteCompounds,
  getAllSubCategories,
  createNewSubCategoryFromDashboard,
  updateSubCategoryFromDashboard,
  deleteSubCategoryFromDashboard,
  getUsersAsync,
  createNewUserFromDashboard,
  updateUserFromDashboard,
  deleteUserFromDashboard,
};
