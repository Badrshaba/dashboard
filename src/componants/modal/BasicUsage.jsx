import { Button, FormControl,Input, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"

import React from "react"
// import { Plus } from "lucide-react"

// function BasicUsage() {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const initialRef = React.useRef(null)
//     const finalRef = React.useRef(null)
//     return (
//       <div className="">
//         <button onClick={onOpen} className=' bg-teal-700 flex space-x-2 py-2 px-4 rounded-lg text-white items-center mt-5 hover:bg-teal-500 transition-colors duration-300' > <Plus size={15}/> <span>Add User</span> </button>
//        {/* <Button colorScheme='teal' leftIcon={<Plus />} onClick={open} > Add </Button> */}
//         <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}> 
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Add User</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//          <from>
//           <input type="text" />
//           <input type="text" />
//           <input type="text" />
//          </from>

//             </ModalBody>
//             <ModalFooter>
//               <Button colorScheme='blue' mr={3} onClick={onClose} className=" bg-red-800">
//                 Close
//               </Button>
//               <Button variant='ghost'>Secondary Action</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </div>
//     )
//   }
//  export default BasicUsage




 function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
console.log({initialRef,finalRef});
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BasicUsage


  


      