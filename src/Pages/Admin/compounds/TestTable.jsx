import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Button as AButton } from 'antd';
import { NumericFormat } from 'react-number-format';
import { CircleEllipsis, Edit, Images, Search, Trash } from 'lucide-react';
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
} from '@chakra-ui/react';
import { DeleteAlert } from '../../../componants';
import { useRef, useState } from 'react';
import { api, apiRegister } from '../../../utils/api';
const TestTable = ({ compounds }) => {
  const { isLoading } = useSelector((state) => state.compounds);
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const selectRef = useRef();
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteCompound = (compoundID) => {
    dispatch(deleteCompounds(compoundID?.id));
    setTimeout(() => {
      onCloseDialog();
    }, 500);
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
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Area min',
      dataIndex: 'area_min',
      key: 'area_min',
      render: (_, compound) => (
        <NumericFormat
          value={compound.area_min}
          displayType='text'
          thousandSeparator
        />
      ),
    },
    {
      title: 'Area max',
      dataIndex: 'area_max',
      key: 'area_max',
      render: (_, compound) => (
        <NumericFormat
          value={compound.area_max}
          displayType='text'
          thousandSeparator
        />
      ),
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
      render: (_, compound) => (
        <NumericFormat
          value={compound.price_min}
          displayType='text'
          thousandSeparator
          suffix=' EGP'
        />
      ),
      sorter: (a, b) => a.price_min - b.price_min,
    },
    {
      title: 'price max',
      dataIndex: 'price_max',
      key: 'price_max',
      render: (_, compound) => (
        <NumericFormat
          value={compound.price_max}
          displayType='text'
          thousandSeparator
          suffix=' EGP'
        />
      ),
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
            onClick={console.log('bl7')}
          >
            <Images size={20} />
          </Button>
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
    setUserInfo((prevData) => ({
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
  const handelSubmit = async (e) => {
    e.preventDefault();
    delete userInfo.images;
    delete userInfo.image;
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
      //  setError(error?.response?.data || error?.message);
      setLoading(false);
    }
    console.log(userInfo);
  };
  
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
          total: 8,
          pageSize: 4,
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
          <form
            className='px-5 py-2'
            onSubmit={handelSubmit}
          >
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
                        value={userInfo?.name_en}
                        onChange={handleChange}
                      />
                    </FormControl>
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
                        value={userInfo?.address_en}
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
              className='w-full mt-4'
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

export default TestTable;
