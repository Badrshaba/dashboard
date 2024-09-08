import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import ProtectedRoutes from '../componants/protected-routes/protected-routes';
import { Spinner } from '@chakra-ui/react';
import LoadingSkeleton from '../componants/loading-skeleton/LoadingSkeleton';
import TestLayout from '../Layout/TestLayout';
import ErrorBoundary from '../componants/ErrorBoundry';
const ProperitePage = lazy(() => import('../Pages/properites/ProperitePage'));
const CompoundPage = lazy(() => import('../Pages/compounds/CompoundPage'));
const Login = lazy(() => import('../Pages/login/login'));
const Dashboard = lazy(() => import('../Pages/dashboard/dashboard'));
const Users = lazy(() => import('../Pages/users/users'));
const Bunners = lazy(() => import('../Pages/bunners/bunners'));
const Brookers = lazy(() => import('../Pages/brookers/brookers'));
const Inbox = lazy(() => import('../Pages/brookers/pages/Inbox'));
const Developers = lazy(() => import('../Pages/developers/developers'));
const Customers = lazy(() => import('../Pages/customers/customers'));
const Compounds = lazy(() => import('../Pages/compounds/compounds'));
const Categories = lazy(() => import('../Pages/categories/categories'));
const Features = lazy(() => import('../Pages/features/features'));
const Properites = lazy(() => import('../Pages/properites/properites'));
const SubCategories = lazy(() => import('../Pages/sub-categories/sub-categories'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <TestLayout />
      </ProtectedRoutes>
    ),

    children: [
      {
        index: true,
        path: '/',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: 'banners',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Bunners />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Users />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'features',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Features />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Compounds />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds/:compoundId',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <CompoundPage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'customers',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Customers />
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: 'properites',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Properites />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites/:properiteId',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <ProperitePage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'sub-categories',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <SubCategories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<LoadingSkeleton />}>
              <Categories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
