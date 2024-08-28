import { Alert, AlertDescription } from '@chakra-ui/react';
import { Delete, Edit } from 'lucide-react';

const TableComp = ({ headings, data }) => {
  if (data?.length > 0) {
    return (
      <table className='table-auto items-center bg-transparent w-full border-collapse mt-5'>
        <thead>
          <tr className=''>
            {headings?.map((heading) => (
              <th
                className='text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold'
                key={heading}
              >
                {heading}
              </th>
            ))}
            <th className='text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row,index) => (
            <tr
              key={row.id}
              className='text-center'
            >
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                {row.id}
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                {row.name}
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                {row.email}
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                {row.role}
              </td>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                <button className='bg-red-500 p-2 rounded-md me-3 items-center'>
                  <Delete className='text-white h-5' />
                </button>
                <button className='bg-yellow-500 p-2 rounded-md items-center'>
                  <Edit className='text-white h-5' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <Alert
        colorScheme='teal'
        my={5}
        rounded={10}
      >
        <AlertDescription>No Data To Show</AlertDescription>
      </Alert>
    );
  }
};

export default TableComp;
