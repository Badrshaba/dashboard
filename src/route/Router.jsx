import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '../componants/protected-routes/protected-routes';
import LoadingSkeleton from '../componants/loading-skeleton/LoadingSkeleton';
import DashboardLayout from '../Layout/DashboardLayout';
import MainAddProperites from '../Pages/Admin/properites/addProperites/MainAddProperites';
const ProperitePage = lazy(() => import('../Pages/Admin/properites/ProperitePage'));
const Dashboard = lazy(() => import('../Pages/Admin/dashboard/dashboard'));
const CompoundPage = lazy(() => import('../Pages/Admin/compounds/CompoundPage'));
const Login = lazy(() => import('../Pages/Auth/login/login'));
const Users = lazy(() => import('../Pages/Admin/users/users'));
const Bunners = lazy(() => import('../Pages/Admin/bunners/bunners'));
const Brookers = lazy(() => import('../Pages/Brookers/brookers-homepage'));
const Inbox = lazy(() => import('../Pages/Brookers/Inbox'));
const Compounds = lazy(() => import('../Pages/Admin/compounds/compounds'));
const Categories = lazy(() => import('../Pages/Admin/categories/categories'));
const Marketing = lazy(() => import('../Pages/Marketers/marketing-homepage'));
const Sales = lazy(() => import('../Pages/Sales/sales-homepage'));
const Features = lazy(() => import('../Pages/Admin/features/features'));
const Properites = lazy(() => import('../Pages/Admin/properites/properites'));
const SubCategories = lazy(() => import('../Pages/Admin/sub-categories/sub-categories'));
const Other = lazy(() => import('../Pages/Admin/other/Other'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
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
        path: 'market',
        element: (
          <ProtectedRoutes allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Marketing />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'sales',
        element: (
          <ProtectedRoutes allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Sales />
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
      {
        path: 'other',
        element: (
          <ProtectedRoutes allowedRoles={['admin']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Other />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
