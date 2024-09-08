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
import { Avatar, Space, Table, Button as AButton } from 'antd';
import { Edit, Search, Trash } from 'lucide-react';
import { deleteUserFromDashboard, updateUserFromDashboard } from '../../redux';
import { getUsersApi } from '../../utils/api';
const TestTable = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const searchInput = useRef(null);
  const usernameRef = useRef();
  const roleRef = useRef();
  const cancelRef = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <AButton
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<Search size={5} />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
          </AButton>
          <AButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </AButton>

          <AButton
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </AButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <Search
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
        size={15}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

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
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, user) => <Avatar src={user.image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
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
      ></Table>
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
