import {
  Button,
  useDisclosure,
  Modal,
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormLabel,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Upload, message } from 'antd';
import { Plus, Trash, UploadCloud, UploadIcon } from 'lucide-react';
// import { createNewBunnerFromDashboard } from '../../redux/thunck/bunners';
import { useDispatch } from 'react-redux';
import { getUsersApi } from '../../utils/api';
import axios from 'axios';

const AddBunnerPopup = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.getAll('file')[0]);
    try {
      const response = await axios.post(
        'https://ai.w-manage.org/api/banner',
        {
          image: formData.getAll('file')[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
            APP_KEY: import.meta.env.VITE_APP_KEY,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        message.success('File uploaded successfully');
        onSuccess(response.data);
      } else {
        message.error('Upload failed');
        onError(new Error('Upload failed'));
      }
    } catch (error) {
      message.error('Upload error');
      console.log(error);
      onError(error);
    }
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
                <FormLabel>Image</FormLabel>
                <Upload
                  customRequest={customRequest}
                  showUploadList={false}
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
