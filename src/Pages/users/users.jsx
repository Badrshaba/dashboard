import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TestTable from './TestTable';
import AddUserPopup from './addUserPopup';
import useGetUsers from '../../hooks/get-data/useGetUsers';

const Users = () => {
  // const { users, isLoading, error } = useSelector((state) => state.users);
  const { data, isLoading, error, isError } = useGetUsers();
  console.log('isError:', isError);
  console.log('Error details:', error);
  console.log('Loading details:', isLoading);
  if (error) {
    return (
      <div className='bg-white p-3 rounded-md'>
        <h3 className='text-3xl'>Users</h3>
        <h1> {error.message || 'A'}</h1>
      </div>
    );
  }

  return (
    <div className='bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Users</h3>
      <div className=' flex justify-between items-center'>
        <AddUserPopup
          error={error}
          isLoading={isLoading}
        />
      </div>
      {data && <TestTable users={data?.data} />}
    </div>
  );
};

export default Users;
