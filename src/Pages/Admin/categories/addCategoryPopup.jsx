import { useRef } from 'react';
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
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { createNewCategoryFromDashboard } from '../../../redux';

const AddCategoryPopup = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const titleRef = useRef();
  const titleArRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNewCategoryFromDashboard({
        cateDate: {
          name_en: titleRef.current.value,
          name_ar: titleArRef.current.value,
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
        onClick={onOpen}
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
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type='text'
                  ref={titleRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>العنوان</FormLabel>
                <Input
                  dir='rtl'
                  type='text'
                  ref={titleArRef}
                />
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
