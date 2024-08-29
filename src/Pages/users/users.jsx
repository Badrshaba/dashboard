import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import { Pagination } from 'antd';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
// import UsersTable from './table';
import TestTable from './TestTable';
import AddUserPopup from './addUserPopup';

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const tableHeading = ['id', 'username', 'email', 'role'];

  useEffect(() => {
    dispatch(getUsersAsync(pageNumber));
  }, []);

  return (
    <div className='users-page bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl'>Users</h3>
      <AddUserPopup
        error={error}
        isLoading={isLoading}
      />
      {/* <UsersTable
        tableHeadings={tableHeading}
        users={users?.data}
      /> */}
      <TestTable users={users?.data} />
      {/* <Pagination
        current={1}
        defaultCurrent={1}
        pageSize={10}
        total={users?.total}
        align='center'
        disabled={pageNumber == users?.last_page}
        showTotal={() => (
          <Text
            fontWeight={500}
            color='teal'
            fontSize='1rem'
          >
            Total Users: {users?.total}
          </Text>
        )}
        onChange={() => {
          setPageNumber((prev) => (pageNumber === users?.last_page ? pageNumber : prev + 1));
          dispatch(getUsersAsync(pageNumber));
        }}
      /> */}
    </div>
  );
};

export default Users;
