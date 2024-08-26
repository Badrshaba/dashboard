import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import TableComp from '../../componants/table-comp/table-comp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
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
                <FormLabel>Password</FormLabel>
                <Input type='password' />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input type='password' />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' />
              </FormControl>
              <Button
                colorScheme='teal'
                width='100%'
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
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
