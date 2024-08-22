import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Phone, Plus } from 'lucide-react';
import FormModal from '../form/FormModal';
import { useState } from 'react';
import { api } from '../../utils/api';
import { FORMDATA } from '../form/formData';
function BasicUsage({ title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [formData, setFormData] = useState({
  //   nameEN: "",
  //   emailEN: "",
  //   phoneEN: "",
  //   addressEN:'',
  //   nameAR:"",
  //   emailAR:"",
  //   phoneAR:"",
  //   addressAR:""
  // });
  const [formData, setFormData] = useState(FORMDATA);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post(
      '/register',
      {
        name: formData.nameEN,
        email: formData.emailEN,
        Phone: formData.phoneEN,
        address: formData.addressEN,
        password: formData.passwordEN,
        password_confirmation: formData.confirmPasswordEN,
      },
      {
        headers: {
          APP_KEY: import.meta.env.VITE_APP_KEY,
        },
      }
    );
    console.log(res);
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
