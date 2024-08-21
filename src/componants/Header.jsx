import userImage from '../assets/images/faces/2.jpg';

const Header = () => {
  return (
    <div className='bg-white p-5 flex justify-end'>
      <div className='flex items-center gap-3'>
        Admin
        <img
          src={userImage}
          alt='user Image'
          className='w-10 rounded-full'
        />
      </div>
    </div>
  );
};

export default Header;
