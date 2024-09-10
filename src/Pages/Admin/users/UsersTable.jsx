import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDisclosure,
  Modal,
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { Avatar, Table } from 'antd';
import { Edit, Trash } from 'lucide-react';
import { deleteUserFromDashboard, updateUserFromDashboard } from '../../../redux';
import { getUsersApi } from '../../../utils/api';
import useSearchInTable from '../../../hooks/useSearchInTable';
const TestTable = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState({});
  const usernameRef = useRef();
  const roleRef = useRef();
  const cancelRef = useRef();
  const getColumnSearchProps = useSearchInTable();

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
  const editUser = (e) => {
    e.preventDefault();
    dispatch(
      updateUserFromDashboard({
        name: usernameRef.current.value,
        id: userInfo?.id,
      })
    );
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
  const deleteUser = () => {
    dispatch(deleteUserFromDashboard(userInfo.id));
    onCloseDialog();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        {
          text: 'Admin',
          value: 'Admin',
        },
        {
          text: 'User',
          value: 'User',
        },
        {
          text: 'Developer',
          value: 'Developer',
        },
        {
          text: 'Brooker',
          value: 'Brooker',
        },
      ],
      onFilter: (value, record) => record.role.startsWith(value.toLowerCase()),
      filterSearch: true,
      width: '20%',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <ButtonGroup
          variant='outline'
          size='sm'
          spacing={4}
        >
          <Button
            colorScheme='red'
            onClick={() => getuserDataDelete(user.id)}
          >
            <Trash size={20} />
          </Button>
          <Button
            colorScheme='yellow'
            onClick={() => getuserData(user.id)}
          >
            <Edit size={20} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={users?.data}
        loading={isLoading}
        columns={columns}
        rowKey={(user) => user.id}
        className=' mt-8 '
        pagination={{
          position: ['bottomCenter'],
          total: users?.total,
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />
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

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        on
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
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
              onClick={(e) => editUser(e)}
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TestTable;
