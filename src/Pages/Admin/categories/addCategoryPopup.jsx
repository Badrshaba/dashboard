import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  useDisclosure,
  Modal,
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { createNewCategoryFromDashboard } from '../../../redux';
import FileInput from '../../../componants/file-input/FileInput';

const AddCategoryPopup = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [errors,setErrors] = useState({
    title:"",
    address:'',
    image:''
  })
  const titleRef = useRef();
  const titleArRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(titleRef.current.value=='') return setErrors((prevData)=>({
      ...prevData,
      title:'title is requared'
    }))
    if(titleArRef.current.value=='') return setErrors((prevData)=>({
      ...prevData,
      address:'العنوان اجباري'
    }))
    if(!files.length) return setErrors((prevData)=>({
      ...prevData,
      image:'image is requared'
    }))
    const formData = new FormData();
    formData.append('image', files[0]);
    formData.append('name_en', titleRef.current.value);
    formData.append('name_ar', titleArRef.current.value);
    console.log(formData.get('image'));
    dispatch(
      createNewCategoryFromDashboard({
        cateDate: {
          name_en: formData.get('name_en'),
          name_ar: formData.get('name_ar'),
          image: formData.get('image'),
        },
        closePopup: onClose,
      })
    );
  };

  return (
    <>
      <Button
        colorScheme='teal' 
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={()=>{
          for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
              setErrors((prevData) => ({
                ...prevData,
                [key]: '',
              }))
            }
          }
          onOpen()
        }}
      >
        Add Category
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            px={5}
            py={1}
          >
            Add Category
          </ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {(error.response.data.data && error.response.data.data[0]) || error?.message}
              </AlertTitle>
            </Alert>
          )}
          <form
            className='px-5 py-2'
            onSubmit={(e) => handleSubmit(e)}
          >
            <VStack spacing={2}>
              <FormControl isInvalid={errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  type='text'
                  ref={titleRef}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <FormControl style={{direction:'rtl'}} isInvalid={errors.address} >
                <FormLabel>العنوان</FormLabel>
                 <Input
                  dir='rtl'
                  type='text'
                  ref={titleArRef}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>

              </FormControl>
              <FormControl isInvalid={errors.image} >
                {/* <FileInput
                  lable='Image'
                  title='Category Image'
                  filesHandler={setFiles}
                  files={files}
                /> */}
                <FormLabel>Image</FormLabel>
                <Input type='file' onChange={(e)=>setFiles(e.target.files)} />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
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

export default AddCategoryPopup;
