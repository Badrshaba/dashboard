import { Avatar } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.user);

  let surce = user?.user?.image || 'https://bit.ly/broken-link';
  return (
    <div className='bg-white p-5 flex justify-end'>
      <div className='flex items-center gap-3'>
        <h4>{user?.user?.name}</h4>
        <Avatar src={surce} />
      </div>
    </div>
  );
};

export default Header;
