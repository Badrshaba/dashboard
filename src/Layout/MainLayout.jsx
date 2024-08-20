import { Outlet } from 'react-router-dom';
import Header from '../componants/Header';
import Sidebar from '../componants/SideBar/Sidebar';

const MainLayout = () => {
  return (
    <div>
      <div className="grid grid-cols-10">
        <div className="col-span-2 h-screen">
          <Sidebar />
        </div>
        <div className="col-span-8">
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
