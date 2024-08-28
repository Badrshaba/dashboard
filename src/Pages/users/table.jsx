import { useRef, useState } from 'react';
import { Delete, Edit, Trash } from 'lucide-react';
import {
  useDisclosure,
  Modal,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserFromDashboard, updateUserFromDashboard } from '../../redux/thunck/usersAsync';
import { getUsersApi } from '../../utils/api';

const UsersTable = ({ tableHeadings, users }) => {
  const { isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const [userInfo, setUserInfo] = useState({});
  const usernameRef = useRef();
  const roleRef = useRef();
  const cancelRef = useRef();

  const getuserData = async (userId) => {
    try {
      onOpen();
      const { data } = await getUsersApi.get('/profile-cc', {
        params: { id: userId },
      });
      usernameRef.current.value = data?.data?.name;
      roleRef.current.value = data?.data?.role;
      setUserInfo(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getuserDataDelete = async (userId) => {
    onOpenDialog();
    try {
      const { data } = await getUsersApi.get('/profile-cc', {
        params: { id: userId },
      });

      setUserInfo(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserFromDashboard({
        name: usernameRef.current.value,
        id: userInfo?.id,
      })
    );
  };

  const deleteUser = async () => {
    try {
      dispatch(deleteUserFromDashboard(userInfo.id));
      onCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };
  if (users) {
    return (
      <>
        <table className='table-auto items-center bg-transparent w-full border-collapse mt-5'>
          <thead>
            <tr>
              {tableHeadings.map((heading) => (
                <th
                  className='text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold'
                  key={heading}
                >
                  {heading}
                </th>
              ))}
              <th className='text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                className='text-center'
              >
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                  {user.id}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                  {user.name}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                  {user.email}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                  {user.role}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                  <button
                    className='bg-red-500 p-2 rounded-md me-3 items-center'
                    onClick={() => getuserDataDelete(user.id)}
                  >
                    <Trash className='text-white h-5' />
                  </button>
                  <button
                    className='bg-yellow-500 p-2 rounded-md items-center'
                    onClick={() => getuserData(user.id)}
                  >
                    <Edit className='text-white h-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          on
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update User</ModalHeader>
            <ModalCloseButton />
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
                  <FormLabel>Role</FormLabel>
                  <Select ref={roleRef}>
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
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </form>
          </ModalContent>
        </Modal>
        <AlertDialog
          isOpen={isOpenDialog}
          leastDestructiveRef={cancelRef}
          onClose={onCloseDialog}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize='lg'
                fontWeight='bold'
              >
                Delete User
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={onCloseDialog}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme='red'
                  onClick={deleteUser}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  } else {
    return (
      <Alert
        colorScheme='teal'
        my={5}
        rounded={10}
      >
        <AlertDescription>No Data To Show</AlertDescription>
      </Alert>
    );
  }
};

export default UsersTable;
