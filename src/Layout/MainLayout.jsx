import { Outlet } from 'react-router-dom';
import Header from '../componants/Header';
import Sidebar from '../componants/SideBar/Sidebar';
// import TestSidebar from '../componants/SideBar/TestSidebar';

const MainLayout = () => {
  return (
    <div>
      <div className='grid grid-cols-10'>
        <div className='col-span-2'>
          <Sidebar />
        </div>
        {/* <TestSidebar/> */}

        <div className='col-span-8'>
          <Header />
          <div className='h-screen'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
