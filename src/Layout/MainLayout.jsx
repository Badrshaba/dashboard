import { Outlet } from 'react-router-dom';
import Header from '../componants/Header';
import Sidebar from '../componants/SideBar/Sidebar';
// import TestSidebar from '../componants/SideBar/TestSidebar';

const MainLayout = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='w-1/5'>
          <Sidebar />
        </div>
        {/* <TestSidebar/> */}

        <div className=' w-4/5 '>
          <Header />
          <div className='min-h-screen p-5 bg-mainBG'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
