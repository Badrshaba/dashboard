import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import ProtectedRoutes from '../componants/protected-routes/protected-routes';
import {
  Dashboard,
  SubCategories,
  Brookers,
  Bunners,
  Compounds,
  Customers,
  Features,
  Properites,
  Developers,
  Categories,
} from '../Pages';
import Login from '../Pages/login/login';
//const Home = lazy(() => import('../Pages/home/Home'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        path: '/',
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },

      {
        path: 'bunners',
        element: (
          <ProtectedRoutes>
            <Bunners />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'features',
        element: (
          <ProtectedRoutes>
            <Features />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds',
        element: (
          <ProtectedRoutes>
            <Compounds />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'customers',
        element: (
          <ProtectedRoutes>
            <Customers />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'brookers',
        element: (
          <ProtectedRoutes>
            <Brookers />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'developers',
        element: (
          <ProtectedRoutes>
            <Developers />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites',
        element: (
          <ProtectedRoutes>
            <Properites />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'sub-categories',
        element: (
          <ProtectedRoutes>
            <SubCategories />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
