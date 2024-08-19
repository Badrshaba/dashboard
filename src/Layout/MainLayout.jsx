import { Outlet } from 'react-router-dom';
import Header from '../componants/Header';
import Sidebar from '../componants/SideBar/Sidebar';

const MainLayout = () => {
  return (
    <div>
      <div className='grid'>
        <div className=''>
          <Sidebar />
        </div>
        <div className=' grid-cols-9'>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
