import { HomeIcon, ReceiptCent, Sailboat, User2Icon } from 'lucide-react';
import StateCard from '../../componants/state-card/state-card';

const Home = () => {
  return (
    <div className='bg-mainBG h-full p-5'>
      <h1 className='text-3xl text-black font-Bold mb-5'>Hi, Admin</h1>
      <div className='top-part grid grid-cols-12 gap-5'>
        <div className=' col-span-5'>
          <div className='grid grid-cols-2 gap-4'>
            <StateCard
              title='Total Properites'
              icon={
                <HomeIcon
                  size={48}
                  className='text-white'
                />
              }
              number={50}
            />
            <StateCard
              title='Total Properites'
              icon={
                <User2Icon
                  size={48}
                  className='text-white'
                />
              }
              number={50}
            />
            <StateCard
              title='Total Properites'
              icon={
                <ReceiptCent
                  size={48}
                  className='text-white'
                />
              }
              number={50}
            />
            <StateCard
              title='Total Customers'
              icon={
                <Sailboat
                  size={48}
                  className='text-white'
                />
              }
              number={110}
            />
          </div>
        </div>
        <div className='charts col-span-7 bg-white p-3'>chartss</div>
      </div>
      <div className='recent-properites bg-white p-5 rounded-md mt-5'>
        <h3 className='text-3xl '>Recent Properites</h3>
        <div className='search my-4'>
          <div className='flex justify-end'>
            <input
              type='text'
              className='bg-transparent border border-gray-300 rounded-md text-gray-500 p-2'
              placeholder='Search'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
