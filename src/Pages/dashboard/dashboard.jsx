import { useSelector } from 'react-redux';
import { Stats, RecentProperites, MostViewed, TotalCategories, FeaturedProducts } from './sections';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='dashboard p-3'>
      <h1 className='text-3xl text-black font-Bold mb-5'>Hi, {user?.user?.name}</h1>
      <div className='top-part grid grid-cols-12 gap-5'>
        <div className=' col-span-5'>
          <Stats />
        </div>
        <div className='charts col-span-7 bg-white p-3'>chartss</div>
      </div>
      <RecentProperites />
      <MostViewed />
      <div className='grid grid-cols-2 gap-5 mt-5'>
        <TotalCategories />
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Dashboard;
