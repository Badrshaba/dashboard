import { Grid } from 'lucide-react';

const TableComp = ({ title }) => {
  return (
    <div className='recent-properites bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl '>{title}</h3>

      <div className='flex justify-end my-4 border-b pb-2'>
        <input
          type='text'
          className='bg-transparent border border-gray-300 rounded-md text-gray-500 p-2'
          placeholder='Search'
        />
        <button className='bg-black rounded-md ms-2 px-2  text-white'>
          <Grid size={30} />
        </button>
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
  );
};

export default TableComp;
