import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { lazy } from 'react';
import Home from '../Pages/home/Home'
//const Home = lazy(() => import('../Pages/home/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement:<div className='bg-pink-600 flex justify-center items-center h-full' ><h1 className=' text-red-700 text-3xl font-bold' >Error</h1></div>,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <div className=' bg-blue-600 flex justify-center items-center h-full'><h2  className='text-blue-700 text-3xl font-bold' >about</h2></div>,
      },
      {
        path: 'contact',
        element: <div className=' bg-slate-600 flex justify-center items-center h-full '><h2 className=' text-green-700 text-3xl font-bold'>contact</h2></div> ,
      },
      {
        path: 'apple',
        element: <div className=' bg-slate-600 flex justify-center items-center h-full '><h2 className=' text-green-700 text-3xl font-bold'>contact</h2></div> ,
      },
    ],
  },
]);

export default router;
