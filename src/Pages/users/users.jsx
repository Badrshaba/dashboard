import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TestTable from './TestTable';
import AddUserPopup from './addUserPopup';
import useSelection from 'antd/es/table/hooks/useSelection';

const Users = () => {
  const { error, isLoading } = useSelector((state) => state.users);
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
      <TestTable />
    </div>
  );
};

export default Users;
