import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import { Typography } from 'antd';
import { ArrowBigDownDash, Eye, Plus } from 'lucide-react';
const Script = ({properity}) => {
  const { isOpen:isOpenImg, onOpen:onOpenImg, onClose:onCloseImg } = useDisclosure()

  return (
    <div className='my-3 ml-7'>
    <Typography.Text style={{ display: 'flex',gap: '5px',alignItems: 'center', fontWeight: 'bold' }}>
            Script:{' '}
            <span style={{ fontWeight: 'bold',marginBottom: '0px', color: 'teal',display: 'flex', gap: '5px' }}>
            <a href={properity?.script} target='_blank'> <Button size={'sm'} className='border  border-teal-700'   >
            <div className='flex items-center gap-2 px-2 py-1'>
            <Eye color='teal'  />
            <p style={{marginBottom: '0px'}} className='text-teal-700 mb-0'>Show Script</p>
              </div>
              </Button> 
              </a>
            <Button colorScheme='teal' size='sm'  className='border-teal-700 border'  >
            <Plus  />
              </Button>           
            {/* <Button size={"sm"} onClick={generatePDF} className='border-teal-700 border'  >
            <ArrowBigDownDash color='red' />
              </Button>            */}
               <Modal isOpen={isOpenImg}  onClose={onCloseImg}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Script</ModalHeader>
    <ModalCloseButton />
    <ModalFooter>
    <form
      className='px-5 py-2 w-full'
      // onSubmit={onSubmit}
    >
      <VStack spacing={2}>
          <div className=' flex space-x-3 w-full'>
            <div className='w-full space-y-2'>
              <FormControl isInvalid={error} >
                <FormLabel  >Script :
                </FormLabel>
                <Input
                  colorScheme={'red'}
                  type='file'
                  // style={{display:'none'}}
                  //  onChange={(e) => handleInputChange(e)}
                />
                {images?.map((e,index)=>(
                  <li key={index} >{e.name}</li>
                ))}
            <FormErrorMessage>Script is requared</FormErrorMessage>
              </FormControl>
            </div>
            </div>
        
      </VStack>
      <Button
        colorScheme='teal'
        className='w-full mb-1 mt-4'
        type='submit'
       // isLoading={loading}
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

export default Script