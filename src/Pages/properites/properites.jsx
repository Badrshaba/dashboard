import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
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
const Properites = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const tableHeading = ['id', 'username', 'email', 'role'];

  useEffect(() => {}, []);
  return (
    <div className='users-page bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl'>Properites</h3>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={onOpen}
      >
        Add Properites
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Properites</ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error.message}</AlertTitle>
            </Alert>
          )}
          <form className='p-5'>
            <VStack spacing={4}>
              <div className=' flex space-x-3'>
                <div>
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
                </div>
                <div style={{ direction: 'rtl' }}>
                  <FormControl>
                    <FormLabel>الاسم</FormLabel>
                    <Input type='text' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>الايميل</FormLabel>
                    <Input type='email' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>باسورد</FormLabel>
                    <Input type='password' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>تأكيد الباسورد</FormLabel>
                    <Input type='password' />
                  </FormControl>
                </div>
              </div>
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

      {/* <Pagination
        current={1}
        defaultCurrent={1}
        pageSize={10}
        total={users?.total}
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
      /> */}
    </div>
  );
};

export default Properites;
