import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAsync } from '../../../redux/thunck/usersAsync';
import UsersTable from './UsersTable';
import AddUserPopup from './addUserPopup';

const Users = () => {
  const { error, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAsync(1));
  }, []);
  return (
    <div className='px-8 py-5 bg-white'>
      <h3 className='text-3xl'>Users</h3>
      <div className=' flex justify-between items-center'>
        <AddUserPopup
          error={error}
          isLoading={isLoading}
        />
      </div>
      <UsersTable />
    </div>
  );
};

export default Users;
