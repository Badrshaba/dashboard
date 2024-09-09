import { useEffect, useRef } from 'react';
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
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getAllCategories, createNewSubCategoryFromDashboard } from '../../../redux';

const AddSubCategoryPopup = ({ error, isLoading }) => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const nameArRef = useRef();
  const cateRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNewSubCategoryFromDashboard({
        sCateData: {
          name_en: nameRef.current.value,
          name_ar: nameArRef.current.value,
          cat_id: cateRef.current.value,
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
        onClick={onOpen}
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
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {error?.response ? error.response.data.data[0] : error?.message}
              </AlertTitle>
            </Alert>
          )}
          <form
            className='px-5 py-2'
            onSubmit={(e) => handleSubmit(e)}
          >
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  ref={nameRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>الأسم</FormLabel>
                <Input
                  type='text'
                  ref={nameArRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Main Category</FormLabel>
                <Select ref={cateRef}>
                  {categories?.map((cate) => (
                    <option
                      key={cate.id}
                      value={cate.id}
                    >
                      {cate.title}
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
