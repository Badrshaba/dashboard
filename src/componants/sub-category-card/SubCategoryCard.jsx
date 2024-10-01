import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { Button, Card, Image } from 'antd';
import { CastleIcon, Edit, Trash } from 'lucide-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSubCategoryFromDashboard,
  updateSubCategoryFromDashboard,
} from '../../redux/thunck/subCategoriesAsync';
const SubCategoryCard = ({ subCate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isLoading, error } = useSelector((state) => state.subCategories);
  const { authButton } = useSelector((state) => state.authrization);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const nameArRef = useRef();
  const cancelRef = useRef();

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
    
      {
        authButton?<Card
        hoverable
        title={subCate.name}
        extra={
          <Image
            src={subCate.image}
            width={25}
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
      >
        <Flex flexDirection='row-reverse'>
          <Box dir='rtl'>
            <Text textAlign='right'>{}</Text>
          </Box>
        </Flex>
      </Card>:<Card
        hoverable
        title={subCate.name}
        extra={
          <Image
            src={subCate.image}
            width={25}
          />
        }
      >
        <Flex flexDirection='row-reverse'>
          <Box dir='rtl'>
            <Text textAlign='right'>{}</Text>
          </Box>
        </Flex>
      </Card>
      }
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
              Delete Sub Category
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
                onClick={() =>
                  dispatch(deleteSubCategoryFromDashboard({ ID: subCate.id, onClose: onClose }))
                }
                ml={3}
              >
                Delete
              </CButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
