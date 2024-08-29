import { useRef } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createNewUserFromDashboard } from '../../redux/thunck/usersAsync';

const AddUserPopup = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();

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
  };

  return (
    <>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={onOpen}
      >
        Add User
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            px={5}
            py={1}
          >
            Add User
          </ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error?.message}</AlertTitle>
            </Alert>
          )}
          <form className='px-5 py-2'>
            <VStack spacing={2}>
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
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select>
                  <option value='user'>User</option>
                  <option value='developer'>Developer</option>
                  <option value='brookers'>Brookers</option>
                </Select>
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
    </>
  );
};

export default AddUserPopup;
