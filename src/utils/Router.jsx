import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
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
//const Home = lazy(() => import('../Pages/home/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <div className='bg-pink-600 flex justify-center items-center h-full'>
        <h1 className=' text-red-700 text-3xl font-bold'>Error</h1>
      </div>
    ),
    children: [
      {
        index: true,
        path: '/',
        element: <Dashboard />,
      },
      {
        path: 'bunners',
        element: <Bunners />,
      },
      {
        path: 'features',
        element: <Features />,
      },
      {
        path: 'compounds',
        element: <Compounds />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'brookers',
        element: <Brookers />,
      },
      {
        path: 'developers',
        element: <Developers />,
      },
      {
        path: 'properites',
        element: <Properites />,
      },
      {
        path: 'sub-categories',
        element: <SubCategories />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
    ],
  },
]);

export default router;
