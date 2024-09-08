import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import router from './route/Router';
import { setUser } from './redux/slices/user';
import { ErrorBoundry, ProtectedRoutes } from './componants';
import ErrorBoundary from './componants/ErrorBoundry';
import TestLayout from './Layout/TestLayout';
// import Inbox from './Pages/brookers/pages/Inbox';
import Login from './Pages/login/login';
import Brookers from './Pages/brookers/brookers';
import Dashboard from './Pages/dashboard/dashboard';
import Users from './Pages/users/users';
import Categories from './Pages/categories/categories';
import SubCategories from './Pages/sub-categories/sub-categories';
import ProperitePage from './Pages/properites/ProperitePage';
import Compounds from './Pages/compounds/compounds';
import Properites from './Pages/properites/properites';
import AddProperites from './Pages/properites/AddProperites';
import MainAddProperites from './Pages/properites/addProperites/MainAddProperites';
import Sales from './Pages/sales/Sales';
import Marketing from './Pages/marketers/Marketing';
// import Settings from './Pages/brookers/pages/Settings';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('user') != null && localStorage.getItem('userToken') != null) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      dispatch(setUser({ user: user, userToken: userToken }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path='/login'
          element={<Login />}
        />
    <Route path='/' element={}></Route> */}
        <Route
          path='/'
          element={<TestLayout />}
        >
         
         
          <Route
            path='/properites'
            element={<Properites />}
          />
          <Route
            path='/properites/addproperite'
            element={<MainAddProperites/>}
          />
          <Route
            path='/sales'
            element={<Sales/>}
          />
          <Route
            path='/market'
            element={<Marketing/>}
          />
         
           
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
