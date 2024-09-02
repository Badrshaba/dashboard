import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button as CButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button, Card } from 'antd';
import { Edit, Trash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubCategoryFromDashboard } from '../../redux/thunck/subCategoriesAsync';
const SubCategoryCard = ({ subCate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, error } = useSelector((state) => state.subCategories);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const nameArRef = useRef();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSubCategoryFromDashboard({
        sCateData: {
          name_en: nameRef.current.value,
          name_ar: nameArRef.current.value,
          cat_id: subCate.id,
        },
        onClose,
      })
    );
  };

  return (
    <>
      <Card
        hoverable
        title={subCate.name}
        extra={
          <img
            src={subCate.image}
            alt={subCate.name}
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
      >
        <Flex flexDirection='row-reverse'>
          <Box dir='rtl'>
            <Text textAlign='right'>{}</Text>
          </Box>
        </Flex>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        on
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Sub Category </ModalHeader>
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

export default SubCategoryCard;
