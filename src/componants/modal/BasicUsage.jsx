import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import FormModal from "../form/FormModal";
import { useState } from "react";

function BasicUsage({ title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    nameEN: "",
    emailEN: "",
    phoneEN: "",
    addressEN:'',
    nameAR:"",
    emailAR:"",
    phoneAR:"",
    addressAR:""
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
    console.log(formData);
  };


  return (
    <>
      <Button colorScheme='teal' leftIcon={<Plus />} mt={5} size='md' onClick={onOpen}>
      Add {title}
  </Button>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {title}</ModalHeader>
          <ModalCloseButton />
          <FormModal label_AR={['الاسم','الايميل','تليفون','العنوان']} onClose={onClose} formData={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
