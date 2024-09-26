import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import { Typography } from 'antd';
import { ArrowBigDownDash, Eye, Plus } from 'lucide-react';
import { useState } from 'react';

const BuyComponant = ({loading,error,paymentPlan}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        job: '',
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      console.log(paymentPlan);
      const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      }
  return (
    <div className='my-3 ml-7'>
    <Typography.Text style={{ display: 'flex',gap: '5px',alignItems: 'center', fontWeight: 'bold' }}>
            Script:{' '}
            <span style={{ fontWeight: 'bold',marginBottom: '0px', color: 'teal',display: 'flex', gap: '5px' }}>
          <Button size={'sm'} onClick={onOpen}   >
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
              <FormControl isInvalid={error} >
                <FormLabel  >Name :
                </FormLabel>
                <Input
                name='name'
                  colorScheme={'red'}
                  value={formData?.name}
                   onChange={handleChange}
                />  
            <FormErrorMessage>Script is requared</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error} >
                <FormLabel  >Phone :
                </FormLabel>
                <Input
                name='number'
                  colorScheme={'red'}
                  value={formData.number}
                   onChange={handleChange}
                />  
            <FormErrorMessage>Script is requared</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error} >
                <FormLabel  >Job :
                </FormLabel>
                <Input
                name='job'
                  colorScheme={'red'}
                  value={formData.job}
                   onChange={handleChange}
                />  
            <FormErrorMessage>Script is requared</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error} >
                <FormLabel  >email :
                </FormLabel>
                <Input
                name='email'
                  colorScheme={'red'}
                  value={formData.email}
                   onChange={handleChange}
                />  
            <FormErrorMessage>Script is requared</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={error} >
                <FormLabel  >Payment Plan :
                </FormLabel>
         <div className='flex space-x-3 flex-wrap'>
            {paymentPlan?.map((item)=>(
            <div className='border-2 p-2 rounded-lg w-fit' >
                <p> Year: {item?.year}</p>
                <p> Start: {item?.start}</p>
                <p> Price: {item?.price_of_month}</p>
            </div>
            ))}
         </div>
            <FormErrorMessage>Script is requared</FormErrorMessage>
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