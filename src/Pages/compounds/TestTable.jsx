import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table } from 'antd';
import { CircleEllipsis, Edit, Trash } from 'lucide-react';
import { deleteCompounds } from '../../redux';
import {
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  VStack,
  Button,
} from '@chakra-ui/react';
import DeleteAlert from '../../componants/deleteAlert/DeleteAlert';
import { useRef, useState } from 'react';
import axios from 'axios';
import { api } from '../../utils/api';
const TestTable = ({ compounds }) => {
  const { isLoading } = useSelector((state) => state.compounds);
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({});
  const selectRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteCompound = (compoundID) => {
    dispatch(deleteCompounds(compoundID?.id));
    console.log(compoundID);
    setTimeout(() => {
      onCloseDialog();
    }, 500);
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
            onClick={() => getCompoundById(rec.id)}
          >
            <Edit size={20} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCompoundById = async (compoundID) => {
    try {
      let { data } = await api.get(`/compounds/${compoundID}`);
      setUserInfo(data?.data);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userInfo?.trans);
  return (
    <>
      <Table
        loading={isLoading}
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
        deleteFun={deleteCompound}
        onClose={onCloseDialog}
        isOpen={isOpenDialog}
        head='Delete Compound'
        body='Do you want delete compound'
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'5xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Compound</ModalHeader>
          <ModalCloseButton />
          {/* {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error?.message}</AlertTitle>
            </Alert>
          )} */}
          <form className='px-5 py-2'>
            <VStack spacing={2}>
              {userInfo && (
                <div className=' flex space-x-3 w-full'>
                  <div className='w-full space-y-2'>
                    <FormControl>
                      <FormLabel>Name :</FormLabel>
                      <Input
                        colorScheme={'red'}
                        name='name_en'
                        type='text'
                        value={userInfo?.trans?.en?.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {/* <FormControl>
            <FormLabel>Zone :</FormLabel>
            <Select ref={selectRef} >
              {zones.length&&zones.map((ele)=>(
                <option key={ele.id} value={ele.id}>{ele.id}</option>
              ))}
              
            </Select>
          </FormControl> */}
                    <FormControl>
                      <FormLabel>Area Min :</FormLabel>
                      <Input
                        type='text'
                        name='area_min'
                        value={userInfo?.area_min}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Area Max :</FormLabel>
                      <Input
                        type='text'
                        name='area_max'
                        value={userInfo?.area_max}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Address :</FormLabel>
                      <Input
                        type='text'
                        name='address_en'
                        value={userInfo?.trans?.en?.address}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel className='focus-visible:border-black'>Price Min :</FormLabel>
                      <Input
                        type='number'
                        name='price_min'
                        value={userInfo?.price_min}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel className='focus-visible:border-black'>Price Max :</FormLabel>
                      <Input
                        type='number'
                        name='price_max'
                        value={userInfo?.price_max}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <label className=' w-full'>
                      <FormLabel> Description :</FormLabel>
                      <textarea
                        onChange={handleChange}
                        value={userInfo?.trans?.en?.description}
                        name='descriotion_en'
                        className='  p-2 rounded-lg h-28  w-full transition-all focus:outline-blue-500 duration-200 border-2'
                        type='text'
                      />
                    </label>
                  </div>
                  <div
                    style={{ direction: 'rtl' }}
                    className='w-full space-y-2'
                  >
                    <FormControl>
                      <FormLabel> الاسم :</FormLabel>
                      <Input
                        type='text'
                        name='name_ar'
                        value={userInfo?.trans?.ar?.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel> العنوان : </FormLabel>
                      <Input
                        type='text'
                        name='address_ar'
                        value={userInfo?.trans?.ar?.address}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <label className=' w-full'>
                      <FormLabel> الوصف :</FormLabel>
                      <textarea
                        name='descriotion_ar'
                        onChange={handleChange}
                        value={userInfo?.trans?.ar?.description}
                        className=' p-2 rounded-lg h-28 w-full border-2 transition-all focus:outline-blue-500 duration-200'
                        type='text'
                        size={'lg'}
                      />
                    </label>
                  </div>
                </div>
              )}
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
