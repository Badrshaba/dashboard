import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '../componants/protected-routes/protected-routes';
import LoadingSkeleton from '../componants/loading-skeleton/LoadingSkeleton';
import DashboardLayout from '../Layout/DashboardLayout';
const ContentUs = lazy(()=>import('../Pages/Admin/contentUs/ContentUs'));
const  MyWallet  = lazy(()=>import( '../Pages/Admin/myWallet/MyWallet'));
const RequestSalesPage = lazy(()=>import('../Pages/Admin/requestSales/RequestSalesPage'));
const RequestSales = lazy(()=>import( '../Pages/Admin/requestSales/RequestSales'));
const Package = lazy(()=>import( '../Pages/Admin/package/Package'));
const PrivcyPolicy = lazy(()=>import('../Pages/Others/unauthorized/PrivcyPolicy'));
const ProperitePage = lazy(() => import('../Pages/Admin/properites/ProperitePage'));
const Dashboard = lazy(() => import('../Pages/Admin/dashboard/dashboard'));
const CompoundPage = lazy(() => import('../Pages/Admin/compounds/compoundDeitals/CompoundPage'));
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
const AddProperity = lazy(() => import('../Pages/Admin/properites/AddProperity'));
const UpdatePage = lazy(() => import('../Pages/Admin/properites/updatePage'));
const SubCategories = lazy(() => import('../Pages/Admin/sub-categories/sub-categories'));
const Other = lazy(() => import('../Pages/Admin/other/Other'));
const RequestEbrooker = lazy(() => import('../Pages/Admin/requestEbrooker/RequestEbrooker'));
const RequestEbrookerPage = lazy(() => import('../Pages/Admin/requestEbrooker/RequestEbrookerPage'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/privacy_policy',
    element: (
      <Suspense fallback={<LoadingSkeleton />}>
        <PrivcyPolicy />
      </Suspense>
  )
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'banners',
        element: (
          <ProtectedRoutes allowedRoles={['1','4']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Bunners />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Users />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'features',
        element: (
          <ProtectedRoutes allowedRoles={['1','4']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Features />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds',
        element: (
          <ProtectedRoutes allowedRoles={['1','4','5']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Compounds />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'compounds/:compoundId',
        element: (
          <ProtectedRoutes allowedRoles={['1','4','5']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <CompoundPage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites',
        element: (
          <ProtectedRoutes allowedRoles={['1','4','5']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Properites />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites/addproperite',
        element: (
          <ProtectedRoutes allowedRoles={['1','5']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <AddProperity />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites/updateproperity/:properiteId',
        element: (
          <ProtectedRoutes allowedRoles={['1','5']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <UpdatePage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'properites/:properiteId',
        element: (
          <ProtectedRoutes allowedRoles={['1','4','5']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <ProperitePage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'sub-categories',
        element: (
          <ProtectedRoutes allowedRoles={['1','4']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <SubCategories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoutes allowedRoles={['1','4']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Categories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'request-ebrooker',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <RequestEbrooker />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'request-ebrooker/:ebrookerId',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <RequestEbrookerPage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'package',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Package />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'request-sales',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <RequestSales />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'request-sales/:requestId',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <RequestSalesPage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'my-wallet',
        element: (
          <ProtectedRoutes allowedRoles={['2','4']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <MyWallet />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'content-us',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <ContentUs />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'market',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
            <Suspense fallback={<LoadingSkeleton />}>
              <Marketing />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'sales',
        element: (
          <ProtectedRoutes allowedRoles={['1']}>
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
          <ProtectedRoutes allowedRoles={['1']}>
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
