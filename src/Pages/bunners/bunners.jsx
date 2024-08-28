import { useState } from 'react';
import { Pagination } from 'antd';
import { Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import BunnersTable from './table';
import AddBunnerPopup from './addBunnerPopup';
const Bunners = () => {
  const { bunners, isLoading, error } = useSelector((state) => state.bunners);
  const [pageNumber, setPageNumber] = useState(1);
  const tableHeading = ['id', 'title', 'description', 'image'];
  return (
    <div className='bunners-page bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl'>Bunners</h3>
      <AddBunnerPopup
        error={error}
        isLoading={isLoading}
      />
      <BunnersTable
        tableHeadings={tableHeading}
        bunners={bunners?.data}
      />
      <Pagination
        current={1}
        defaultCurrent={1}
        total={50}
        pageSize={10}
        align='center'
        showTotal={() => (
          <Text
            fontWeight={500}
            color='teal'
            fontSize='1rem'
          >
            Total Bunners: 10
          </Text>
        )}
        onChange={() => {
          setPageNumber((prev) => prev + 1);
        }}
      />
    </div>
  );
};

export default Bunners;
