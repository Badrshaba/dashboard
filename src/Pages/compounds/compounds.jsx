import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, useDisclosure ,  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack, } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TableComp from '../../componants/table-comp/table-comp';
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  const tableHeading = ['id', 'username', 'email', 'role'];

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);
 // const [searchHandel,search,setSearch] = useSearch('')
  return (
    <div className='users-page bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl'>Compounds</h3>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={onOpen}
      >
        Add Compounds
      </Button>

      <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'5xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Compounds</ModalHeader>
        <ModalCloseButton />
        {/* {error && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        )} */}
        <VStack spacing={4}  >
        <form className='p-5 w-full'>
        <div className=" flex space-x-3 w-full">
              <div className='w-full' >
                <FormControl>
                  <FormLabel>Name :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>img :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Area :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Location :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Location Link :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <label>
                  <FormLabel> Description :</FormLabel>
                  <textarea  className='p-2 rounded-lg h-28 w-full border focus:border-blue-600' type="text" size={'lg'} />
                </label>
        
              </div>
              <div style={{ direction: 'rtl' }} className='w-full' >
                <FormControl >
                  <FormLabel> الاسم :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel> المنطقة :</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel> الموقع : </FormLabel>
                  <Input type="text" />
                </FormControl>
                <label className=' w-full'>
                  <FormLabel> الوصف :</FormLabel>
                  <textarea  className=' p-2 rounded-lg h-28 w-full border focus:border-blue-600' type="text" size={'lg'} />
                </label>
              </div>
              </div>
            <Button
              colorScheme='teal'
              width='100%'
              
              type='submit'
              onClick={(e) => handleSubmit(e, { name: 'amr' })}
              mt={4}
            >
              Submit
            </Button>
        </form>
          </VStack>
      </ModalContent>
    </Modal>

    </div>
  );
  // return <TableComp title='Compounds' />;
};






  


export default Compounds;
