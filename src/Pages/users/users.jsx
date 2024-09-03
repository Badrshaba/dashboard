import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className='bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Users</h3>
      <div className=' flex justify-between items-center'>
        <AddUserPopup
          error={error}
          isLoading={isLoading}
        />
      </div>
      <TestTable users={users} />
    </div>
  );
};

export default Users;
