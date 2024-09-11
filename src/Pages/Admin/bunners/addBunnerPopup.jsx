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
import { List, Typography, Upload } from 'antd';
import { Plus, UploadIcon } from 'lucide-react';
import { createNewBunnerFromDashboard } from '../../../redux';
import { useRef, useState } from 'react';

const AddBunnerPopup = ({ error }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setFiles((prev) => [...prev, e.target.files[i]]);
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
            <label
              htmlFor='file-upload'
              className='custom-file-upload'
            >
              <UploadIcon size={20} />
              Upload
            </label>
            <input
              id='file-upload'
              type='file'
              onChange={(e) => handleInputChange(e)}
            />

            {!!files.length && (
              <List
                className='mt-1'
                size='small'
                split={true}
                dataSource={files}
                renderItem={(file) => (
                  <List.Item>
                    <Typography.Text>{file.name}</Typography.Text>
                  </List.Item>
                )}
                bordered
              />
            )}
            <Button
              onClick={() => dispatch(createNewBunnerFromDashboard({ image: files[0], onClose }))}
              className='mt-4 block w-full'
              colorScheme='teal'
            >
              Upload
            </Button>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBunnerPopup;
