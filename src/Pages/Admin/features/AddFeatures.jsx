import { useEffect, useRef, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { getProperites } from '../../../redux/thunck/crudProperites';
import { addFeatures } from '../../../redux/thunck/crudFeatures';

const AddFeatures = ({properites}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const selectRef = useRef();
  useEffect(() => {
    dispatch(getProperites());
  }, []);
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    await dispatch(addFeatures(selectRef.current.value))
    setLoading(false)
    onClose()
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
        Add Features
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
            Add Features
          </ModalHeader>
          <ModalCloseButton />
          {/* {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {(error.response.data.data && error.response.data.data[0]) || error?.message}
              </AlertTitle>
            </Alert>
          )} */}
          <form
            className='px-5 py-2'
            onSubmit={handleSubmit}
          >
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Apartment id</FormLabel>
                <Select ref={selectRef}>
                  {properites.map((e)=>(
                     <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
               isLoading={loading}
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

export default AddFeatures;
