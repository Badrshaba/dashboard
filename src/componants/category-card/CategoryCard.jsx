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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { Button, Card } from 'antd';
import { Edit, Trash } from 'lucide-react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteCategoryFromDashboard,
  updateCategoryFromDashboard,
} from '../../redux/thunck/crudCategories';

const CategoryCard = ({ cate, isLoading, error }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const nameRef = useRef();
  const nameArRef = useRef();
  const cancelRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCategoryFromDashboard({
        cateDate: {
          id: cate.id,
          title_en: nameRef.current.value,
          title_ar: nameArRef.current.value,
        },
        closePopup: onClose,
      })
    );
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
            onClick={onOpenDialog}
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
      <AlertDialog
        isOpen={isOpenDialog}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'
            >
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <CButton
                ref={cancelRef}
                onClick={onCloseDialog}
              >
                Cancel
              </CButton>
              <CButton
                colorScheme='red'
                onClick={() => {
                  dispatch(deleteCategoryFromDashboard(cate.id));
                  onCloseDialog();
                }}
                ml={3}
              >
                Delete
              </CButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CategoryCard;
