import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TestTable from './TestTable';
import AddUserPopup from './addUserPopup';

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync(1));
  }, []);

  return (
    <div className='users-page bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Users</h3>
      {/* <UsersTable
        tableHeadings={tableHeading}
        users={users?.data}
      /> */}
      <AddUserPopup
        error={error}
        isLoading={isLoading}
      />

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
