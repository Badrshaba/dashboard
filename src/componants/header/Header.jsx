import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from 'antd';
import { Avatar } from '@chakra-ui/react';
import { logout } from '../../redux/thunck/userAsync';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let surce = user?.user?.image || 'https://bit.ly/broken-link';
  return (
    <div className='flex justify-end bg-[#fff7f7] px-10 py-3 items-center gap-5'>
      <div className='flex items-center gap-2'>
        <Typography.Text className='font-bold text-[#4d5454]'>{user?.user?.name}</Typography.Text>
        <Avatar
          src={surce}
          width={10}
          height={10}
        />
      </div>
      {user && <Button onClick={() => dispatch(logout())}>Logout</Button>}
    </div>
  );
};

export default Header;
