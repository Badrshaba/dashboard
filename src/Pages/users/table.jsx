import { useRef } from 'react';
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
} from '@chakra-ui/react';

const UsersTable = ({ tableHeadings, users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const cancelRef = useRef();
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
                    onClick={onOpenDialog}
                  >
                    <Trash className='text-white h-5' />
                  </button>
                  <button
                    className='bg-yellow-500 p-2 rounded-md items-center'
                    onClick={onOpen}
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
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add User</ModalHeader>
            <ModalCloseButton />
            <h1>test</h1>
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
                  onClick={onCloseDialog}
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
