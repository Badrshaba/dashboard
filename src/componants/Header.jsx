import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className='bg-white p-5 flex justify-end'>
      <div className='flex items-center gap-3'>
        {user?.user?.name}
        <img
          src={user?.user?.image}
          alt='user Image'
          className='w-10 rounded-full'
        />
      </div>
    </div>
  );
};

export default Header;
