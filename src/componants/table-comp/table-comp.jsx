import { Alert, AlertDescription } from '@chakra-ui/react';

const TableComp = ({ headings, data }) => {
  if (data?.length > 0) {
    return (
      <table className='table-auto items-center bg-transparent w-full border-collapse mt-5'>
        <thead>
          <tr>
            {headings?.map((heading) => (
              <th
                className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'
                key={heading}
              >
                {heading}
              </th>
            ))}
            <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.id}>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                {row.id}
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
