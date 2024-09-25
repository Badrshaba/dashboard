import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeIcon, ReceiptCent, Sailboat, User2Icon } from 'lucide-react';
import { StateCard } from '../../../../../componants';
import { getUsersAsync } from '../../../../../redux';
import { getDashboard } from '../../../../../redux/thunck/crudDashboard';
const Stats = () => {
  const { dashboard } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(getDashboard());
  }, []);
  return (
    <div className='grid grid-cols-2 gap-4'>
      <StateCard
        title='Total Apartment'
        icon={
          <HomeIcon
            size={48}
            className='text-white'
          />
        }
        number={dashboard?.total_apartment}
        colors={{ main: 'bg-purple', hover: 'bg-red-100' }}
      />
      <StateCard
        title='Total Broker'
        icon={
          <User2Icon
            size={48}
            className='text-white'
          />
        }
        number={dashboard?.total_broker}
      />
      <StateCard
        title='Total Compounds'
        icon={
          <ReceiptCent
            size={48}
            className='text-white'
          />
        }
        number={dashboard?.total_compounds}
      />
      <StateCard
        title='Total Developer'
        icon={
          <Sailboat
            size={48}
            className='text-white'
          />
        }
        number={dashboard?.total_developer}
      />
      <StateCard
        title='Total Sales'
        icon={
          <Sailboat
            size={48}
            className='text-white'
          />
        }
        number={dashboard?.total_sales}
      />
    </div>
  );
};

export default Stats;
