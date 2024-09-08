import { Avatar } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.user);

  let surce = user?.user?.image || 'https://bit.ly/broken-link';
  return (
    <div className='flex justify-end bg-[#fff7f7] px-10 py-5'>
      <div className='flex items-center gap-3'>
        <h4 className=" text-[#4d5454]">{user?.user?.name}</h4>
        <Avatar
          src={surce}
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};

export default Header;
