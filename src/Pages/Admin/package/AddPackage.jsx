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
FormErrorMessage,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createPackage } from '../../../redux/thunck/crudPackege';



const AddPackage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        price:'',
        features:'',
        time:''
    })
    const [errors,setErrors] = useState({
        price:'',
        features:'',
        time:''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        if ( value.length > 50) {
         return setErrors((prevData)=>({
            ...prevData,
            [name]:"max length is 50 "
          }))
        }
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.price == '') {
          return setErrors((prevData)=>({
            ...prevData,
            price:"price is requared"
          }))
        }
        if (formData.features == '') {
          return setErrors((prevData)=>({
            ...prevData,
            features:"features is requared"
          }))
        }
        if (formData.time == '') {
          return setErrors((prevData)=>({
            ...prevData,
            time:"time is requared"
          }))
        }
        setLoading(true)
        await dispatch(createPackage(formData))
        setLoading(false)
        setTimeout(()=>{
            onClose()
        },500)
    }
    const clearInput = ()=>{
        for (let key in formData) {
          if (formData.hasOwnProperty(key)) {
            setFormData((prevData) => ({
              ...prevData,
              [key]: '',
            }))
          }
        }
        for (let key in errors) {
          if (errors.hasOwnProperty(key)) {
            setErrors((prevData) => ({
              ...prevData,
              [key]: '',
            }))
          }
        }
        onOpen()
      }
  return (
    <>
      <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={5}
        size='md'
        onClick={clearInput}
      >
        Add Package
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
            Add Packages
          </ModalHeader>
          <ModalCloseButton />
          <form
            className='px-5 py-2'
            onSubmit={handleSubmit}
          >
            <VStack spacing={2}>
            <FormControl isInvalid={errors.price} >
                <FormLabel  >Price :
                </FormLabel>
                <Input
                name='price'
                type='number'
                  colorScheme={'red'}
                  value={formData.price}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.price}</FormErrorMessage>
              </FormControl>
            <FormControl isInvalid={errors.time} >
                <FormLabel  >time :
                </FormLabel>
                <Input
                name='time'
                  colorScheme={'red'}
                  value={formData.time}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.time}</FormErrorMessage>
              </FormControl>
            <FormControl isInvalid={errors.features} >
                <FormLabel  >Features :
                </FormLabel>
                <Input
                name='features'
                  colorScheme={'red'}
                  value={formData.features}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.features}</FormErrorMessage>
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

export default AddPackage