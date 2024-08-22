import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { Plus } from "lucide-react"

function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <div className="">
        <button onClick={onOpen} className=' bg-teal-700 flex space-x-2 py-2 px-4 rounded-lg text-white items-center mt-5 hover:bg-teal-500 transition-colors duration-300' > <Plus size={15}/> <span>Add</span> </button>
       {/* <Button colorScheme='teal' leftIcon={<Plus />} onClick={open} > Add </Button> */}
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}> 
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='bold' mb='1rem'>
                You can scroll the content behind the modal
              </Text>
             
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose} className=" bg-red-800">
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    )
  }
  export default BasicUsage