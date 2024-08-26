import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';

const PopupModal = ({ isOpen, onClose, error, isLoading, handleSubmit, fildes, addTitle }) => {
return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add {addTitle}</ModalHeader>
        <ModalCloseButton />
        {error && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        )}
        <form className='p-5'>
          <VStack spacing={4}>
            {fildes?.map((field) => (
              <FormControl key={field.label}>
                <FormLabel>{field.label}</FormLabel>
                <Input type={field.type} />
              </FormControl>
            ))}

            <Button
              colorScheme='teal'
              width='100%'
              isLoading={isLoading}
              type='submit'
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PopupModal;
