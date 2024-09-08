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
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Upload } from 'antd';
import { Plus, UploadIcon } from 'lucide-react';
import { createNewBunnerFromDashboard } from '../../redux';

const AddBunnerPopup = ({ error }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  return (
    <>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={onOpen}
      >
        Add Banner
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

          <FormControl p={5}>
            <FormLabel>Image</FormLabel>
            {/* <Upload
              showUploadList={true}
              multiple={false}
              customRequest={({ file, onSuccess, onError }) =>
                dispatch(createNewBunnerFromDashboard({ file, onSuccess, onError }))
              }
            > */}
            <label
              for='file-upload'
              class='custom-file-upload'
            >
              <UploadIcon size={20} />
              Upload
            </label>
            <input
              id='file-upload'
              type='file'
            />
            {/* <Button>
              <UploadIcon className='h-6 me-3 w-full' /> Upload
            </Button> */}
            {/* </Upload> */}
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBunnerPopup;
