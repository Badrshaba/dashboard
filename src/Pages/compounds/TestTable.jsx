import { Button, Space, Table } from 'antd';
import { CircleEllipsis, Edit, Trash } from 'lucide-react';
import { deleteCompounds } from '../../redux/thunck/crudCompounds';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure, VStack } from '@chakra-ui/react';
import DeleteAlert from '../../componants/deleteAlert/DeleteAlert';
import { useState } from 'react';
const TestTable = ({ compounds }) => {
    const dispatch = useDispatch();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo,setUserInfo] = useState(null)
    const navigate = useNavigate()
    const deleteCompounds = (compoundID) => {
    // dispatch(deleteCompounds(compoundID));
    // onCloseDialog();
    console.log(compoundID);
    setTimeout(()=>{
      onCloseDialog()
    },500)
    };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Area min',
      dataIndex: 'area_min',
      key: 'area_min',
    },
    {
      title: 'Area max',
      dataIndex: 'area_max',
      key: 'area_max',
    },
    {
      title: 'Zone',
      dataIndex: 'zone_id',
      key: 'zone_id',
    },
    {
      title: 'Price min',
      dataIndex: 'price_min',
      key: 'price_min',
      sorter: (a, b) => a.price_min - b.price_min,
    },
    {
      title: 'price max',
      dataIndex: 'price_max',
      key: 'price_max',
      sorter: (a, b) => a.price_max - b.price_max,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, rec) => (
        <Space className=' space-x-3' >
          <Button color='blue' onClick={()=>navigate(`${rec.id}`)}   icon={<CircleEllipsis color='blue' />} />
          <Button
          onClick={ ()=>{
            setUserInfo(rec)
            onOpenDialog()
          }  
        }
            danger={true}
            icon={<Trash />}
          />
          <Button onClick={
            ()=>{
              setUserInfo(rec)
              onOpen()
            }
          } icon={<Edit />} />
        </Space>
      ),
    },
  ];

  return (
    <>
    
    <Table
      dataSource={compounds}
      columns={columns}
      rowKey={(compound) => compound.id}
      className=' pt-8'
      pagination={{
        position: ['bottomCenter'],
      }}
    />
      <DeleteAlert 
      userInfo={userInfo} 
      deleteCompounds={deleteCompounds} 
      onClose={onCloseDialog} 
      isOpen={isOpenDialog} 
      head='Delete Compound' 
      body='Do you want delete compound'  />

<Modal
        isOpen={isOpen}
        onClose={onClose}
        on
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          {/* {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error?.message}</AlertTitle>
            </Alert>
          )} */}
          <form className='px-5 py-2'>
            <VStack spacing={2}>
              {userInfo&&
               <FormControl>
               <FormLabel>{userInfo?.id}</FormLabel>
               <Input
                 type='text'
               />
             </FormControl>
              }
             

              {/* <FormControl>
                <FormLabel>Role</FormLabel>
                <Select >
                  <option value='user'>User</option>
                  <option value='developer'>Developer</option>
                  <option value='brookers'>Brookers</option>
                </Select>
              </FormControl> */}
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
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

