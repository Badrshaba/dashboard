import { Button, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { DeleteAlert } from "../../../componants"
import OthersCard from "../../../componants/others/OthersCard"

const Zone = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
        <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3' >1.Zone Details</h3>
<div className=" flex space-x-3 ml-3 mt-3 " >

<OthersCard text={'A1'} />
<OthersCard text={'A2'} />
<div onClick={onOpen} className=" border border-black rounded-lg p-4 hover:cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-75" >
    <Plus size={25} strokeWidth={3}/>
</div>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Zone</ModalHeader>
          <ModalCloseButton />
          {/* {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error?.message}</AlertTitle>
            </Alert>
          )} */}
          <form className='px-5 py-2'>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Zone</FormLabel>
                <Input
                  type='text'
                //   ref={usernameRef}
                />
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
            //   isLoading={isLoading}
              type='submit'>
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
</div>
    </div>
  )
}

export default Zone