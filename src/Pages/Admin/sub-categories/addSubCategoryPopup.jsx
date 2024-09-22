import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getAllCategories, createNewSubCategoryFromDashboard } from '../../../redux';
import FileInput from '../../../componants/file-input/FileInput';

const AddSubCategoryPopup = ({ error, isLoading }) => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors,setErrors] = useState({
    name:'',
    nameAr:'',
    image:''
  })
  const [files, setFiles] = useState([]);
  const nameRef = useRef();
  const nameArRef = useRef();
  const cateRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nameRef.current.value=='') return setErrors((prevData)=>({
      ...prevData,
      name:"Name is requared"
    }))
    if(nameArRef.current.value=='') return setErrors((prevData)=>({
      ...prevData,
      nameAr:"Name is requared"
    }))
    if(!files.length) return setErrors((prevData)=>({
      ...prevData,
      image:"Name is requared"
    }))
    const formData = new FormData();
    formData.append('name_en', nameRef.current.value);
    formData.append('name_ar', nameArRef.current.value);
    formData.append('category_id', cateRef.current.value);
    formData.append('image', files[0]);
    dispatch(
      createNewSubCategoryFromDashboard({
        sCateData: {
          name_en: formData.get('name_en'),
          name_ar: formData.get('name_ar'),
          category_id: formData.get('category_id'),
          image: formData.get('image'),
        },
        closePopup: onClose,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

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
        Add Sub Category
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
            Add Sub Category
          </ModalHeader>
          <ModalCloseButton />
          {/* {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {error?.response ? error.response.data.data[0] : error?.message}
              </AlertTitle>
            </Alert>
          )} */}
          <form
            className='px-5 py-2'
            onSubmit={(e) => handleSubmit(e)}
          >
            <VStack spacing={2}>
              <FormControl isInvalid={errors.name} >
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  ref={nameRef}
                />
                 <FormErrorMessage>{errors.name}</FormErrorMessage>

              </FormControl>
              <FormControl isInvalid={errors.nameAr}>
                <FormLabel>الأسم</FormLabel>
                <Input
                  type='text'
                  ref={nameArRef}
                />
                 <FormErrorMessage>{errors.nameAr}</FormErrorMessage>

              </FormControl>
              <FormControl isInvalid={errors.image}>
                <FileInput
                  lable='Image'
                  title='Subcategory Image'
                  filesHandler={setFiles}
                  files={files}
                />
                 <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Main Category</FormLabel>
                <Select ref={cateRef}>
                  {categories?.map((cate) => (
                    <option
                      key={cate.id}
                      value={cate.id}
                    >
                      {cate.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
              type='submit'
            >
              {' '}
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSubCategoryPopup;
