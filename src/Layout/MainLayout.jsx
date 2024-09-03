import { Outlet } from 'react-router-dom';
import { Result } from 'antd';
import { Sidebar, Header } from '../componants';
import { useCheckConnection } from '../hooks';

const MainLayout = () => {
  const isOnLine = useCheckConnection();

  return (
    <div>
      <div className='flex justify-between'>
        <div className='w-1/5'>
          <Sidebar />
        </div>
        <div className=' w-4/5 '>
          <Header />
          <div className='min-h-screen p-3 bg-mainBG'>
            {isOnLine ? (
              <Outlet />
            ) : (
              <Result
                status='error'
                title='Nerwork Error'
                subTitle='Check Your Network You Do Not Have An Active Internet.'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
