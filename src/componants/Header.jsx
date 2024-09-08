import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { Avatar } from '@chakra-ui/react';
import { logout } from '../redux/thunck/userAsync';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let surce = user?.user?.image || 'https://bit.ly/broken-link';
  return (
    <div className='flex justify-end bg-[#fff7f7] px-10 py-5'>
      <div className='flex items-center gap-3'>
        <h4 className=' text-[#4d5454]'>{user?.user?.name}</h4>
        <Avatar
          src={surce}
          width={10}
          height={10}
        />
        {user && <Button onClick={() => dispatch(logout())}>Logout</Button>}
      </div>
    </div>
  );
};

export default Header;
