import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import FormModal from '../form/FormModal';
import { useState } from 'react';

function BasicUsage({ title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    nameEN: '',
    emailEN: '',
    phoneEN: '',
    addressEN: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const res = api.post(
      '/register',
      {
        
      },
      {
        headers: {
          APP_KEY: import.meta.env.VITE_APP_KEY,
        },
      }
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
        Add {title}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {title}</ModalHeader>
          <ModalCloseButton />
          <FormModal
            label_AR={[]}
            onClose={onClose}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
