import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { lazy } from 'react';

const Home = lazy(() => import('../Pages/home/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
