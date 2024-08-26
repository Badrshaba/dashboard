import { Button, useDisclosure } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import TableComp from '../../componants/table-comp/table-comp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import fields from './inputs.json';
import PopupModal from '../../componants/popup-modal/PopupModal';
const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const tableHeading = ['id', 'username', 'email', 'role'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Hello');
  };
  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);
  return (
    <div className='users-page bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl'>Users</h3>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={onOpen}
      >
        Add Users
      </Button>

      <PopupModal
        fildes={fields?.register}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        error={error}
        handleSubmit={handleSubmit}
        addTitle='User'
      />
      <TableComp
        headings={tableHeading}
        data={users}
      />
    </div>
  );
};

export default Users;
