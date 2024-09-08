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
const TableMarket = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const searchInput = useRef(null);


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
            icon={<Search size={15} />}
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
      title: 'No.of Requests',
      dataIndex: 'No.of_Requests',
      sorter: (a, b) => a.No - b.No,
    },
    {
      title: 'Apartment name',
      dataIndex: 'Apartment name',
      key: 'Apartment name',
      ...getColumnSearchProps('Apartment name'),
    },
    {
      title: 'Model',
      dataIndex: 'Model',
      key: 'Model',
    },
    {
      title: 'Phone number',
      key: 'Phone_number',
      render: (_, user) => (
          <Button
            colorScheme='red'
            onClick={() => getuserDataDelete(user.id)}
          >
            <Trash size={20} />
          </Button>
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
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: users?.total,
          pageSize: 10,
        }}
        
      />
    </>
  );
};

export default TableMarket;
