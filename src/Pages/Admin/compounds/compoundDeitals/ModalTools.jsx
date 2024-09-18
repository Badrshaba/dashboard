import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {getUsersApi} from '../../../../utils/api'
const ModalTools = ({modelcompound}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nameModal,setNameModal] = useState('')
    const {compoundId} = useParams()
    const onSubmitModel = async(e)=>{
        e.preventDefault();
        try {
         await getUsersApi.post('/model',{name:nameModal,compound_id:compoundId});
            
            onClose()
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className=" space-y-2">
    <div className=" flex justify-between w-full border px-2 py-1 rounded shadow">
    <h3 className=" font-semibold" >Modal</h3>
    <Button onClick={onOpen} colorScheme='teal' size='xs' ><Plus size={15}/></Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form className=' w-full' onSubmit={onSubmitModel}>
        <VStack spacing={2}>
              <div className='w-full space-y-2'>
                <FormControl >
                  <FormLabel>Name :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name='name_en'
                    type='text'
                     value={nameModal}
                     onChange={(e)=>setNameModal(e.target.value)}
                  />
              <FormErrorMessage>llllll</FormErrorMessage>
                </FormControl>
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
    </div>
    {modelcompound?.length?  <div className=" flex space-x-2">
   { modelcompound?.map((e)=>(
    <h3 className=" p-2 border" key={e.id} >{e.name}</h3>
    ))}
    </div>:<h3>Empty</h3>}
    </div>
  )
}

export default ModalTools