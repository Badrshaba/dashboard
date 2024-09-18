import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { CircleEllipsis, Edit, Images, Trash } from 'lucide-react';
import { deleteCompounds, getCompounds } from '../../../redux';
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
  useDisclosure,
  VStack,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { DeleteAlert } from '../../../componants';
import { useRef, useState } from 'react';
import { api, apiRegister, getUsersApi } from '../../../utils/api';
import useSearchInTable from '../../../hooks/useSearchInTable';
const CompoundsTable = ({ compounds }) => {
  const { isLoading } = useSelector((state) => state.compounds);
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState(null);
  const [errors, setErrors] = useState({
    description_en:'',
    address_en:'',
    area:'',
    price_from:'',
    price_to:'',
    address_ar:'',
    description_ar:'',
    name_en:'',
    name_ar:''
  });
  const [loading, setLoading] = useState(false);
  const selectRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getColumnSearchProps = useSearchInTable();
  const deleteCompound = (compoundID) => {
    dispatch(deleteCompounds(compoundID?.id));
    setTimeout(() => {
      onCloseDialog();
    }, 500);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Zone',
      dataIndex: 'zone_id',
      key: 'zone_id',
    },
    {
      title: 'Units',
      dataIndex: 'number_of_units',
      key: 'number_of_units',
      ...getColumnSearchProps('number_of_units'),
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
            onClick={()=>navigate(`${rec.id}`)}
          >
            <CircleEllipsis />
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
              for (let key in errors) {
                if (errors.hasOwnProperty(key)) {
                  setErrors((prevData) => ({
                    ...prevData,
                    [key]: '',
                  }))
                }
              }
              getCompoundById(rec.id)
            }}
          >
            <Edit size={20} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if ( name != 'description_en' && name != 'description_ar'&& value.length > 50) {
      return setErrors((prevData)=>({
        ...prevData,
        [name]:"max length is 50  "
      }))
    }
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getCompoundById = async (compoundID) => {
    try {
      let { data } = await getUsersApi.get(`/compounds/${compoundID}`);
      setUserInfo(data?.data);
      console.log(data);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    delete userInfo.images;
    delete userInfo.image;
    console.log(!!userInfo.price_from);
    if(userInfo.address_ar=='') return setErrors((prevData)=>({
      ...prevData,
      address_ar:"العنوان اجباري"
    }))
    if(userInfo.address_en=='') return setErrors((prevData)=>({
      ...prevData,
      address_en:"address is requered"
    }))
    if(userInfo.description_en=='') return setErrors((prevData)=>({
      ...prevData,
      description_en:"description is requered"
}))
if(userInfo.description_ar=='') return setErrors((prevData)=>({
  ...prevData,
  description_ar:"الوصف اجباري"
}))
if(userInfo.price_from=='') return setErrors((prevData)=>({
    ...prevData,
    price_from:"price from is requered"
  }))
if(userInfo.price_to=='') return setErrors((prevData)=>({
  ...prevData,
  price_to:"price to is requered"
}))
if(userInfo.area=='') return setErrors((prevData)=>({
  ...prevData,
  area:"area is requered"
}))
if(userInfo.name_en=='') return setErrors((prevData)=>({
  ...prevData,
  name_en:"name is requered"
}))
if(userInfo.name_ar=='') return setErrors((prevData)=>({
  ...prevData,
  name_ar:"الاسم اجباري"
}))
setLoading(true);
try {
      let { data } = await apiRegister({
        method: 'post',
        url: `/compounds/${userInfo?.id}?_method=PUT`,
        data: userInfo,
      });
      setLoading(false);
      setTimeout(() => {
        onClose();
      }, 500);
      console.log(data);
      dispatch(getCompounds());
    } catch (error) {
      console.log(error);
    //   //  setError(error?.response?.data || error?.message);
       setLoading(false);
    }
  };

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={compounds}
        columns={columns}
        rowKey={(compound) => compound.id}
        bordered={true}
        // onRow={(record,index)=> {return {
        //   onClick:()=> navigate(`${paths.compounds}/${record.id}`)
        // }}}
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: 51,
          pageSize: 51,
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
          <form
            className='px-5 py-2'
            onSubmit={handelSubmit}
          >
            <VStack spacing={2}>
              {userInfo && (
                <div className=' flex space-x-3 w-full'>
                  <div className='w-full space-y-2'>
                    <FormControl isInvalid={errors.name_en}>
                      <FormLabel>Name :</FormLabel>
                      <Input
                        colorScheme={'red'}
                        name='name_en'
                        type='text'
                        value={userInfo?.name_en}
                        onChange={handleChange}
                      />
                  <FormErrorMessage>{errors.name_en}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.area} >
                      <FormLabel>Area :</FormLabel>
                      <Input
                        type='text'
                        name='area'
                        value={userInfo?.area}
                        onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.area}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.address_en} >
                      <FormLabel>Address :</FormLabel>
                      <Input
                        type='text'
                        name='address_en'
                        value={userInfo?.address_en}
                        onChange={handleChange}
                        />
                        <FormErrorMessage>{errors.address_en}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.price_to}  >
                      <FormLabel className='focus-visible:border-black'>Price To :</FormLabel>
                      <Input
                        type='number'
                        name='price_to'
                        value={userInfo?.price_to}
                        onChange={handleChange}
                      />
                        <FormErrorMessage>{errors.price_to}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.price_from} >
                      <FormLabel className='focus-visible:border-black'>Price Form :</FormLabel>
                      <Input
                        type='number'
                        name='price_from'
                        value={userInfo?.price_from}
                        onChange={handleChange}
                      />
                        <FormErrorMessage>{errors.price_from}</FormErrorMessage>
                    </FormControl>
                    <label className=' w-full'>
                      <FormLabel> Description :</FormLabel>
                      <textarea
                        onChange={handleChange}
                        value={userInfo?.description_en}
                        name='description_en'
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
                        value={userInfo?.name_ar}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel> العنوان : </FormLabel>
                      <Input
                        type='text'
                        name='address_ar'
                        value={userInfo?.address_ar}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <label className=' w-full'>
                      <FormLabel> الوصف :</FormLabel>
                      <textarea
                        name='description_ar'
                        onChange={handleChange}
                        value={userInfo?.description_ar}
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
              className='w-full mb-1 mt-4'
              type='submit'
              isLoading={loading}
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompoundsTable;
