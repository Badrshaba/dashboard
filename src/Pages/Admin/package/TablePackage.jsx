import {
Button,
ButtonGroup,
FormControl,
FormErrorMessage,
FormLabel,
Input,
Modal,
ModalCloseButton,
ModalContent,
ModalHeader,
ModalOverlay,
useDisclosure,
VStack,
} from '@chakra-ui/react';
import { Table } from 'antd';
import { Edit, Trash } from 'lucide-react';
import useSearchInTable from '../../../hooks/useSearchInTable';
import DeleteAlert from '../../../componants/deleteAlert/DeleteAlert';
import { deletePackage, updatePackage } from '../../../redux/thunck/crudPackege';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TablePackage = ({ packages }) => {
  const [selectPackage, setSelectPackage] = useState(null);
  const { isLoading } = useSelector((state) => state.packages);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [errors,setErrors] = useState({
    price:'',
    features:'',
    time:''
})
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
    const getColumnSearchProps = useSearchInTable();
    const dispatch = useDispatch();
    const columns = [
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        ...getColumnSearchProps('price'),
      },
      {
        title: 'Features',
        dataIndex: 'features',
        key: 'features',
        ...getColumnSearchProps('features'),
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        ...getColumnSearchProps('time'),
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
            colorScheme='red'
            onClick={() => {
              setSelectPackage(rec);
                onOpen();            
            }}
          >
            <Trash size={20} />
          </Button>
            <Button
            colorScheme='yellow'
            onClick={() => {         
              setSelectPackage(rec)
              onOpenDialog()
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
      if ( value.length > 50) {
       return setErrors((prevData)=>({
          ...prevData,
          [name]:"max length is 50 "
        }))
      }
      setSelectPackage((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectPackage.price == '') {
      return setErrors((prevData)=>({
        ...prevData,
        price:"price is requared"
      }))
    }
    if (selectPackage.features == '') {
      return setErrors((prevData)=>({
        ...prevData,
        features:"features is requared"
      }))
    }
    if (selectPackage.time == '') {
      return setErrors((prevData)=>({
        ...prevData,
        time:"time is requared"
      }))
    }
    setLoading(true)
    dispatch(updatePackage(selectPackage));
    setLoading(false)
    setTimeout(() => {  
      onCloseDialog()
    },500)
  }


  return (
    <>
      <Table
        loading={isLoading}
        dataSource={packages}
        columns={columns}
        bordered={true}
        rowKey={(packages) => packages.id}
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: packages?.length,
          pageSize: 15,
        }}
      />
      <DeleteAlert
       head={"Delete Package"}
        body={"Are you sure you want to delete this package?"}
         isOpen={isOpen}
          onClose={onClose}
           deleteFun={deletePackage}
           info={selectPackage}
            />
              <Modal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            px={5}
            py={1}
          >
            Add Packages
          </ModalHeader>
          <ModalCloseButton />
          <form
            className='px-5 py-2'
            onSubmit={handleSubmit}
          >
            <VStack spacing={2}>
            <FormControl isInvalid={errors.price} >
                <FormLabel  >Price :
                </FormLabel>
                <Input
                name='price'
                type='number'
                  colorScheme={'red'}
                  value={selectPackage?.price}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.price}</FormErrorMessage>
              </FormControl>
            <FormControl isInvalid={errors.time} >
                <FormLabel  >time :
                </FormLabel>
                <Input
                name='time'
                  colorScheme={'red'}
                  value={selectPackage?.time}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.time}</FormErrorMessage>
              </FormControl>
            <FormControl isInvalid={errors.features} >
                <FormLabel  >Features :
                </FormLabel>
                <Input
                name='features'
                  colorScheme={'red'}
                  value={selectPackage?.features}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.features}</FormErrorMessage>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={loading}
              type='submit'
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TablePackage