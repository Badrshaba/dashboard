import { HomeIcon, ReceiptCent, Sailboat, User2Icon } from 'lucide-react';
import StateCard from '../../componants/state-card/state-card';

const Home = () => {
  return (
    <div className='bg-mainBG min-h-full p-5'>
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

        <div className='flex justify-end my-4 border-b pb-2'>
          <input
            type='text'
            className='bg-transparent border border-gray-300 rounded-md text-gray-500 p-2'
            placeholder='Search'
          />
        </div>
        <table className='table-auto items-center bg-transparent w-full border-collapse'>
          <thead>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                NO.
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Properity Name
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Category
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Properity City
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Added By
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Type
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Price
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                1
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                Test
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='most-viewed p-5 rounded-md mt-5 bg-white'>
        <h3 className='text-3xl'>Most Viewed</h3>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        <div className='total-categories  bg-white p-5 '>
          <h3 className='text-3xl'>Total Categories</h3>
        </div>
        <div className='featured-properites  bg-white p-5'>
          <h3 className='text-3xl'>Featured Properites</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
