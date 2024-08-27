import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  useDisclosure,
  Modal,
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TableComp from '../../componants/table-comp/table-comp';

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const tableHeading = ['id', 'username', 'email', 'role'];

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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error.message}</AlertTitle>
            </Alert>
          )}
          <form className='p-5'>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type='text' />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input type='password' />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input type='text' />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input type='text' />
              </FormControl>
            </VStack>
          </form>
          <Button
            colorScheme='teal'
            width='100%'
            isLoading={isLoading}
            type='submit'
            onClick={() => handleSubmit({ name: 'amr' })}
          >
            Submit
          </Button>
        </ModalContent>
      </Modal>
      <TableComp
        headings={tableHeading}
        data={users}
      />
    </div>
  );
};

export default Users;
