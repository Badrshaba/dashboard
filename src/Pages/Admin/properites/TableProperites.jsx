import {
  useDisclosure,
  Modal,
  Alert,
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
import { CircleEllipsis, Edit, Search, Trash } from 'lucide-react';
import { useRef, useState } from 'react';

import { deleteUserFromDashboard, updateUserFromDashboard } from '../../../redux/thunck/usersAsync';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersApi } from '../../../utils/api';
import DeleteAlert from '../../../componants/deleteAlert/DeleteAlert';
import { useNavigate } from 'react-router-dom';
const TableProperites = ({ properites }) => {
  const { isLoading, error } = useSelector((state) => state.properites);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const usernameRef = useRef();
  const roleRef = useRef();
  const cancelRef = useRef();
  const navigate = useNavigate();
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

  // const getuserDataDelete = async (userId) => {
  //   onOpenDialog();
  //   try {
  //     const { data } = await getUsersApi.get('/profile-cc', {
  //       params: { id: userId },
  //     });

  //     setUserInfo(data?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const deleteProperites = (properiteId) => {
    console.log(properiteId);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const searchInput = useRef(null);

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

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, rec) => (
        <ButtonGroup
          variant='outline'
          spacing={4}
          size='sm'
        >
          <Button
            colorScheme='blue'
            onClick={() => navigate(`${rec.id}`)}
          >
            <CircleEllipsis size={20} />
          </Button>
          <Button
            colorScheme='red'
            onClick={() => {
              setUserInfo(rec);
              onOpenDialog();
            }}
          >
            <Trash size={20} />
          </Button>
          <Button
            colorScheme='yellow'
            onClick={() => {
              setUserInfo(rec);
              onOpen();
            }}
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
        loading={isLoading}
        dataSource={properites}
        columns={columns}
        rowKey={(properite) => properite.id}
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: 1000,
          pageSize: 50,
          showTotal: () => 1000,
        }}
      />
      <DeleteAlert
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        head={'انت متأكد'}
        body={'انت بطلع اي ياعم انت'}
        userInfo={userInfo}
        deleteFun={deleteProperites}
      />
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

export default TableProperites;
