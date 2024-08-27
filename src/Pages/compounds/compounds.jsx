import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
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
  VStack,
  InputLeftAddon,
  InputGroup, } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getUsersAsync } from '../../redux/thunck/usersAsync';
import TableComp from '../../componants/table-comp/table-comp';
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [border,setBorder] = useState()
  const [formData,setFormData] = useState({
    name_en:"",
    name_ar:"",
    img:"",
    descriotion_en:"",
    descriotion_ar:"",
    area_en:"",
    area_ar:"",
    location_ar:"",
    location_en:"",
    location_link:"",
    start_price:"",
    max_price:"",
  })
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  const tableHeading = ['id', 'username', 'email', 'role'];

  // useEffect(() => {
  //   dispatch(getUsersAsync());
  // }, []);


 // const [searchHandel,search,setSearch] = useSearch('')
 const handleChange = (e) =>{
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value
  }));
 }
 const handleSubmit = (e) =>{
  e.preventDefault()
  console.log(formData);
 }
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
        <form className='p-5 w-full' onSubmit={handleSubmit} >
        <div className=" flex space-x-3 w-full">
              <div className='w-full' >
                <FormControl>
                  <FormLabel>Name :</FormLabel>
                  <Input colorScheme={'red'} name='name_en' type="text" value={formData.name_en} onChange={handleChange}  />
                </FormControl>
                <FormControl>
                  <FormLabel>img :</FormLabel>
                <InputGroup>
                 <InputLeftAddon>+234</InputLeftAddon> 
                  <Input type="file" name='img' value={formData.img} onChange={handleChange} />
                </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Area :</FormLabel>
                  <Input type="text" name='area_en' value={formData.area_en} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Location :</FormLabel>
                  <Input type="text" name='location_en' value={formData.location_en} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel className='focus-visible:border-black' >Location Link :</FormLabel>
                  <Input type="text" name='location_link' value={formData.location_link} onChange={handleChange} />
                </FormControl>
                <label>
                  <FormLabel> Description :</FormLabel>
                  <textarea onChange={handleChange}  value={formData.descriotion_en} name='description_en'  className='  p-2 rounded-lg h-28  w-full transition-all focus:outline-blue-500 duration-200 border-2'  type="text" />
                </label>
        
              </div>
              <div style={{ direction: 'rtl' }} className='w-full' >
                <FormControl >
                  <FormLabel> الاسم :</FormLabel>
                  <Input type="text" name='name_ar' value={formData.name_ar} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel> المنطقة :</FormLabel>
                  <Input type="text" name='area_en' value={formData.location_ar} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel> الموقع : </FormLabel>
                  <Input type="text" name='location_en' value={formData.location_ar} onChange={handleChange} />
                </FormControl>
                <label className=' w-full'>
                  <FormLabel> الوصف :</FormLabel>
                  <textarea name='description_ar' onChange={handleChange} value={formData.descriotion_ar}  className=' p-2 rounded-lg h-28 w-full border-2 transition-all focus:outline-blue-500 duration-200' type="text" size={'lg'} />
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
