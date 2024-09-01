import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TestTable from './TestTable';
import AddUserPopup from './addUserPopup';
import useSearch from '../../hooks/useSearch';

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [searchHandel, search, setSearch] = useSearch('');

  useEffect(() => {
    dispatch(getUsersAsync(1));
  }, []);
 
  return (
    <div className='bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Users</h3>
      <div className=' flex justify-between items-center' >
      <AddUserPopup
        error={error}
        isLoading={isLoading}
      />
              <form
          action=''
          className=' flex items-center space-x-2'
          onSubmit={searchHandel}
        >
          <Input
            type='text'
            name='area_en'
            placeholder='Search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button> Search </Button>
        </form>
      </div>
      <TestTable users={users?.data} />
    </div>
  );
};

export default Users;
