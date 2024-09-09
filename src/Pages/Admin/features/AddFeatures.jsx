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
import { createNewUserFromDashboard } from '../../../redux/thunck/usersAsync';

const AddFeatures = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNewUserFromDashboard({
        userData: {
          name: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: cPasswordRef.current.value,
        },
        closePopup: onClose,
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
        Add Features
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
            Add Features
          </ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {(error.response.data.data && error.response.data.data[0]) || error?.message}
              </AlertTitle>
            </Alert>
          )}
          <form
            className='px-5 py-2'
            onSubmit={(e) => handleSubmit(e)}
          >
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Apartment id</FormLabel>
                <Select>
                  <option value='user'>User</option>
                  <option value='developer'>Developer</option>
                  <option value='brookers'>Brookers</option>
                </Select>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
              type='submit'
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFeatures;
