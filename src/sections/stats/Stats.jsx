import { HomeIcon, ReceiptCent, Sailboat, User2Icon } from 'lucide-react';
import StateCard from '../../componants/state-card/state-card';

const Stats = () => {
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
        title='Total Properites'
        icon={
          <User2Icon
            size={48}
            className='text-white'
          />
        }
        number={50}
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
