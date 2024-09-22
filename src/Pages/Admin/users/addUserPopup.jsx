import { useRef, useState } from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createNewUserFromDashboard } from '../../../redux/thunck/usersAsync';

const AddUserPopup = ({  isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [error,setError] = useState({
    name:'',
    email:'',
    password:'',
    cPassword:'',
    mobile:'',
  })
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();
  const phoneRef = useRef();
  const selectRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
if (usernameRef.current.value=='') return setError((prevData)=>({
  ...prevData,
  name:'name is requared'
}))
if (emailRef.current.value=='') return setError((prevData)=>({
  ...prevData,
  email:'email is requared'
}))
if (passwordRef.current.value=='') return setError((prevData)=>({
  ...prevData,
  password:'password is requared'
}))
if (cPasswordRef.current.value=='') return setError((prevData)=>({
  ...prevData,
  cPassword:'password confirmation is requared'
}))
if (phoneRef.current.value=='') return setError((prevData)=>({
  ...prevData,
  mobile:'mobile is requared'
}))
if (passwordRef.current.value!=cPasswordRef.current.value) return setError((prevData)=>({
  ...prevData,
  cPassword:'password confirmation not match with password',
  Password:'password not match with password confirmation',
}))

    dispatch(
      createNewUserFromDashboard({
        userData: {
          name: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: cPasswordRef.current.value,
          mobile: phoneRef.current.value,
          role: selectRef.current.value,
        },
        closePopup: onClose,
      })
    );
  };
const clearInput = ()=>{
  for (let key in error) {
    if (error.hasOwnProperty(key)) {
      setError((prevData) => ({
        ...prevData,
        [key]: '',
      }))
    }
  }

  onOpen()
}
  return (
    <>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={clearInput}
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
          {/* {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {(error.response.data.data && error.response.data.data[0]) || error?.message}
              </AlertTitle>
            </Alert>
          )} */}
          <form
            className='px-5 py-2'
            onSubmit={(e) => handleSubmit(e)}
          >
            <VStack spacing={2}>
              <FormControl isInvalid={error.name}>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  ref={usernameRef}
                  bg={'gray.50'}
                />
                 <FormErrorMessage>{error.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  ref={emailRef}
                  bg={'gray.50'}
                />
                 <FormErrorMessage>{error.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  ref={passwordRef}
                  bg={'gray.50'}
                />
                 <FormErrorMessage>{error.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error.cPassword} >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  ref={cPasswordRef}
                  bg={'gray.50'}
                />
                 <FormErrorMessage>{error.cPassword}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error.mobile}  >
                <FormLabel>Phone</FormLabel>
                <Input
                  type='phone'
                  ref={phoneRef}
                  bg={'gray.50'}
                />
                 <FormErrorMessage>{error.mobile}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select ref={selectRef}>
                  <option value='0'>User</option>
                  <option value='1'>Admin</option>
                  <option value='2'>Broker</option>
                  <option value='3'>Marketer</option>
                  <option value='4'>Sales</option>
                  <option value='5'>Developer</option>
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

export default AddUserPopup;
