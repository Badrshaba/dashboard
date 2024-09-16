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
import { useEffect, useRef, useState } from 'react';
import { getProperites } from '../../../redux/thunck/crudProperites';

const AddBunnerPopup = ({ error, isLoading }) => {
  const { compounds } = useSelector((state) => state.compounds);
  const { properites } = useSelector((state) => state.properites);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState([]);
  const [isCompound, setIsCompound] = useState(true);
  const dispatch = useDispatch();
  const parentRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    dispatch(getCompounds());
    dispatch(getProperites());
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', files[0]);
    formData.append('type', parentRef?.current?.value);
    formData.append('link', childRef?.current?.value);
    dispatch(
      createNewBunnerFromDashboard({
        banData: {
          image: formData.get('image'),
          type: formData.get('type'),
          link: formData.get('link'),
        },
        onClose,
        setFiles,
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
              <Select
                ref={parentRef}
                onChange={() => setIsCompound(!isCompound)}
              >
                <option value='0'>Compound</option>
                <option value='1'>Appartment</option>
              </Select>
              {isCompound ? (
                <Select ref={childRef}>
                  {compounds?.map((compound) => (
                    <option
                      key={compound.id}
                      value={compound.id}
                    >
                      {compound.name}
                    </option>
                  ))}
                </Select>
              ) : (
                <Select ref={childRef}>
                  {properites?.map((properity) => (
                    <option
                      key={properity.id}
                      value={properity.id}
                    >
                      {properity.name}
                    </option>
                  ))}
                </Select>
              )}
            </Flex>
            <Button
              colorScheme='teal'
              display='block'
              width='100%'
              onClick={handleSubmit}
              isLoading={isLoading}
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
