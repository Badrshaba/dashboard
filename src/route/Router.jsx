import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from '../componants/protected-routes/protected-routes';

import LoadingSkeleton from '../componants/loading-skeleton/LoadingSkeleton';
import TestLayout from '../Layout/TestLayout';

import MainAddProperites from '../Pages/properites/addProperites/MainAddProperites';
// const NewAddProperites = lazy(() => import( '../Pages/properites/newAddProperites'));
const ProperitePage = lazy(() => import('../Pages/properites/ProperitePage'));
const CompoundPage = lazy(() => import('../Pages/compounds/CompoundPage'));
const Login = lazy(() => import('../Pages/login/login'));
const Dashboard = lazy(() => import('../Pages/dashboard/dashboard'));
const Users = lazy(() => import('../Pages/users/users'));
const Bunners = lazy(() => import('../Pages/bunners/bunners'));
const Brookers = lazy(() => import('../Pages/brookers/brookers'));
const Inbox = lazy(() => import('../Pages/brookers/pages/Inbox'));
// const Developers = lazy(() => import('../Pages/developers/developers'));
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
    element: <TestLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'banners',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Bunners />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Users />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'features',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Features />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Compounds />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds/:compoundId',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <CompoundPage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Properites />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites/addproperite',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <MainAddProperites />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites/:properiteId',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <ProperitePage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'sub-categories',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <SubCategories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Categories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: '/broker',
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes allowedRoles={['broker']}>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Brookers />
                </Suspense>
              </ProtectedRoutes>
            ),
          },
          {
            path: 'inbox',
            element: (
              <ProtectedRoutes allowedRoles={['broker']}>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Inbox />
                </Suspense>
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
