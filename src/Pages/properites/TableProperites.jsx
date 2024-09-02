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
  import { Avatar, Space, Table } from 'antd';
  import { Edit, Trash } from 'lucide-react';
  import { useRef, useState } from 'react';
  import { deleteUserFromDashboard, updateUserFromDashboard } from '../../redux/thunck/usersAsync';
  import { useDispatch, useSelector } from 'react-redux';
  import { getUsersApi } from '../../utils/api';
import DeleteAlert from '../../componants/deleteAlert/DeleteAlert';
  const TableProperites = ({ properites }) => {
    const { isLoading, error } = useSelector((state) => state.properites);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});
    const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            size='sm'
            spacing={4}
          >
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
<DeleteAlert isOpen={isOpenDialog} onClose={onCloseDialog} head={'انت متأكد'} body={'انت بطلع اي ياعم انت'} userInfo={userInfo} deleteFun={deleteProperites}/>
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
  