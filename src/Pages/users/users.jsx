import { useEffect, useRef, useState } from 'react';
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
  Text,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { createNewUserFromDashboard, getUsersAsync } from '../../redux/thunck/usersAsync';
import TableComp from '../../componants/table-comp/table-comp';

import { notification, Pagination } from 'antd';

const Users = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, isLoading, error } = useSelector((state) => state.users);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();
  const dispatch = useDispatch();
  const tableHeading = ['id', 'username', 'email', 'role'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createNewUserFromDashboard({
        name: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: cPasswordRef.current.value,
      })
    );
    notification.success({
      description: 'Successfully Created New User.!',
      duration: 2,
      showProgress: true,
      message: 'Create User',
      placement: 'topRight',
    });
  };

  useEffect(() => {
    dispatch(getUsersAsync(pageNumber));
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
                <Input
                  type='text'
                  ref={usernameRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  ref={emailRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  ref={passwordRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  ref={cPasswordRef}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Address</FormLabel>
                <Input type='text' ref={addressRef}/>
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input type='text' ref={phoneRef}/>
              </FormControl> */}
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
              type='submit'
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
      <TableComp
        headings={tableHeading}
        data={users?.data}
      />
      <Pagination
        defaultCurrent={1}
        total={6}
        align='center'
        disabled={pageNumber == users?.last_page}
        showTotal={() => (
          <Text
            fontWeight={500}
            color='teal'
            fontSize='1rem'
          >
            Total Users: {users?.total}
          </Text>
        )}
        onChange={() => {
          setPageNumber((prev) => (pageNumber === users?.last_page ? pageNumber : prev + 1));
          dispatch(getUsersAsync(pageNumber));
        }}
      />
    </div>
  );
};

export default Users;
