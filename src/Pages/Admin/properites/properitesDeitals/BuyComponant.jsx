import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import { notification, Typography } from 'antd';
import { ArrowBigDownDash, Eye, Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsersApi } from '../../../../utils/api';

const BuyComponant = ({paymentPlan}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {properiteId} = useParams()
  const [paymentId,setPaymentId] = useState(null)
  const [loading,setLoading] = useState(false)
  const [errors,setErrors] = useState({
    name: '',
    number: '',
    email: '',
    job: '',
    payment_plans_id: '',
  })
  const [formData, setFormData] = useState({
      name: '',
      number: '',
      email: '',
      job: '',
    });
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
     
      const onSubmit = async(e) => {
        e.preventDefault();
        formData.payment_plans_id = paymentId
        formData.user_id = JSON.parse(localStorage.getItem('user')).id
        formData.apartment_id = properiteId
        if (formData.name === '') {
          return setErrors((prevData) => ({
            ...prevData,
            name: 'name is requered',
          }));
        }
        if (formData.number === '') {
          return setErrors((prevData) => ({
            ...prevData,
            number: 'Phone is requered',
          }));
        }
        if (!paymentId) {
          return setErrors((prevData) => ({
            ...prevData,
            payment_plans_id: 'payment plans is requered',
          }));
        }
        setLoading(true)
        try {
          const { data } = await getUsersApi.post('/sales/request', formData);
          console.log(data);
          notification.success({
            description: 'Successfully add .!',
            duration: 2,
            showProgress: true,
            message: 'Add Request',
            placement: 'topRight',
          });
          setLoading(false)
          onClose()
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
    }
      const getPaymentById = (id)=>{
        setPaymentId(id)
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
        setPaymentId(null)
        onOpen()
      }
  return (
    <div className='my-3 ml-7'>
    <Typography.Text style={{ display: 'flex',gap: '5px',alignItems: 'center', fontWeight: 'bold' }}>
            Script:{' '}
            <span style={{ fontWeight: 'bold',marginBottom: '0px', color: 'teal',display: 'flex', gap: '5px' }}>
          <Button size={'sm'} onClick={clearInput}   >
            approve
              </Button>           
               <Modal isOpen={isOpen}  onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Approve</ModalHeader>
    <ModalCloseButton />
    <ModalFooter>
    <form
      className=' w-full'
       onSubmit={onSubmit}
    >
      <VStack spacing={2}>
          <div className=' flex space-x-3 w-full'>
            <div className='w-full space-y-2'>
              <FormControl isInvalid={errors.name} >
                <FormLabel  >Name :
                </FormLabel>
                <Input
                name='name'
                  colorScheme={'red'}
                  value={formData?.name}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.number} >
                <FormLabel  >Phone :
                </FormLabel>
                <Input
                name='number'
                  colorScheme={'red'}
                  value={formData.number}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.number}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.job} >
                <FormLabel  >Job :
                </FormLabel>
                <Input
                name='job'
                  colorScheme={'red'}
                  value={formData.job}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.job}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email} >
                <FormLabel  >Email :
                </FormLabel>
                <Input
                name='email'
                  colorScheme={'red'}
                  value={formData.email}
                   onChange={handleChange}
                />  
            <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.payment_plans_id} >
                <FormLabel  >Payment Plan :
                </FormLabel>
         <div className='flex space-x-3 flex-wrap'>
            {paymentPlan?.map((item)=>(
            <div key={item?.id} onClick={()=>getPaymentById(item?.id)} className={paymentId==item?.id?'border-2 border-blue-700 p-2 rounded-lg w-fit':'border-2 hover:cursor-pointer hover:shadow-md p-2 rounded-lg w-fit'} >
                <p> Year: {item?.year}</p>
                <p> Start: {item?.start}</p>
                <p> Price: {item?.price_of_month}</p>
            </div>
            ))}
         </div>
            <FormErrorMessage>payment plans is requared</FormErrorMessage>
              </FormControl>
            </div>
            </div>
        
      </VStack>
      <Button
        colorScheme='teal'
        className='w-full mb-1 mt-4'
        type='submit'
        isLoading={loading}
      >
        Submit
      </Button>
    </form>
    </ModalFooter>
  </ModalContent>
</Modal>
            </span>
          </Typography.Text>
    </div>
  )
}

export default BuyComponant