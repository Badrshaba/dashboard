import { useDispatch, useSelector } from 'react-redux';
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
  Flex,
  Select,
  Box,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { createNewBunnerFromDashboard, getCompounds } from '../../../redux';
import FileInput from '../../../componants/file-input/FileInput';
import { useEffect, useState } from 'react';
import { getProperites } from '../../../redux/thunck/crudProperites';

const AddBunnerPopup = ({ error, isLoading }) => {
  const { compounds } = useSelector((state) => state.compounds);
  const { properites } = useSelector((state) => state.properites);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompounds());
    dispatch(getProperites());
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

          <Box p={5}>
            <FileInput
              lable='Image'
              title='Upload'
              filesHandler={setFiles}
              files={files}
              isLoading={isLoading}
              withUploadButton={false}
            />
            <Flex
              gap={5}
              my={5}
            >
              <Select>
                <option value='0'>Compound</option>
                <option value='1'>Appartment</option>
              </Select>
              <Select>
                <option value='0'>Property Type</option>
                <option value='1'>Apartment</option>
              </Select>
            </Flex>
            <Button
              colorScheme='teal'
              display='block'
              width='100%'
              onClick={() =>
                dispatch(
                  createNewBunnerFromDashboard({
                    banData: { image: files[0], type: '0', link: '1' },
                    onClose,
                    setFiles,
                  })
                )
              }
            >
              Submit
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBunnerPopup;
