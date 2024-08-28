import { useRef } from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import { Upload } from 'antd';
import { Plus, Trash, UploadCloud, UploadIcon } from 'lucide-react';
import { createNewBunnerFromDashboard } from '../../redux/thunck/bunners';
import { useDispatch } from 'react-redux';

const AddBunnerPopup = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();
  // const imageFile = useRef();
  const props = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },

    showUploadList: {
      extra: ({ size = 0 }) => (
        <span
          style={{
            color: '#cccccc',
          }}
        >
          ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>
      ),
      showDownloadIcon: true,
      downloadIcon: 'Download',
      showRemoveIcon: true,
      removeIcon: <Trash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createNewBunnerFromDashboard({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        // image: imageFile.current.value,
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
        Add Bunner
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
            Add Bunner
          </ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error.response?.data?.data[0] || error.message}</AlertTitle>
            </Alert>
          )}
          <form className='px-5 py-2'>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type='text'
                  ref={titleRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  size='sm'
                  resize='none'
                  ref={descriptionRef}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Upload
                  {...props}
                  style={{ backgroundColor: 'red' }}
                >
                  <Button>
                    <UploadIcon className='h-6 me-3' /> Upload
                  </Button>
                </Upload>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
              type='submit'
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBunnerPopup;
