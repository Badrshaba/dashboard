import { useDispatch } from 'react-redux';
import {
  Button,
  useDisclosure,
  Modal,
  Alert,
  AlertIcon,
  AlertTitle,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { createNewBunnerFromDashboard } from '../../../redux';
import FileInput from '../../../componants/file-input/FileInput';
import { useState } from 'react';

const AddBunnerPopup = ({ error, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState([]);
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

          <FileInput
            lable='Image'
            title='Upload'
            uploadFN={() =>
              dispatch(createNewBunnerFromDashboard({ image: files[0], onClose, setFiles }))
            }
            filesHandler={setFiles}
            files={files}
            multi={false}
            isLoading={isLoading}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBunnerPopup;
