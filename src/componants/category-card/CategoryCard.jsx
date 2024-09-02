import {
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button as CButton,
  VStack,
  Input,
} from '@chakra-ui/react';
import { Button, Card } from 'antd';
import { Edit, Trash } from 'lucide-react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const CategoryCard = ({ cate, isLoading, error }) => {
  const dispatch=useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const nameArRef = useRef();
  const handleSubmit = (e) => {
    dispatch()
  };

  return (
    <>
      <Card
        hoverable
        title={cate.title}
        extra={
          <img
            src={cate.image}
            alt={cate.title}
          />
        }
        actions={[
          <Button
            icon={<Trash />}
            danger
          ></Button>,
          <Button
            icon={<Edit />}
            onClick={onOpen}
          ></Button>,
        ]}
      ></Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        on
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Category </ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error?.message}</AlertTitle>
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
                  dir='rtl'
                  type='text'
                  ref={nameArRef}
                />
              </FormControl>
            </VStack>
            <CButton
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
              type='submit'
            >
              Submit
            </CButton>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryCard;
