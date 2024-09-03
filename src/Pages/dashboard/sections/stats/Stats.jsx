import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeIcon, ReceiptCent, Sailboat, User2Icon } from 'lucide-react';
import { StateCard } from '../../../../componants';
import { getUsersAsync } from '../../../../redux';
const Stats = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);
  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);
  return (
    <div className='grid grid-cols-2 gap-4'>
      <StateCard
        title='Total Properites'
        icon={
          <HomeIcon
            size={48}
            className='text-white'
          />
        }
        number={50}
        colors={{ main: 'bg-purple', hover: 'bg-red-100' }}
      />
      <StateCard
        title='Total Users'
        icon={
          <User2Icon
            size={48}
            className='text-white'
          />
        }
        number={users.total}
      />
      <StateCard
        title='Total Properites'
        icon={
          <ReceiptCent
            size={48}
            className='text-white'
          />
        }
        number={50}
      />
      <StateCard
        title='Total Customers'
        icon={
          <Sailboat
            size={48}
            className='text-white'
          />
        }
        number={110}
      />
    </div>
  );
};

export default Stats;
