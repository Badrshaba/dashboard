import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {getUsersApi} from '../../../../utils/api'
import ModalCompounant from "./ModalCompounant"
import { getCompoundById } from "../../../../redux/thunck/crudCompounds"
import { useDispatch } from "react-redux"
const ModalTools = ({modelcompound}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nameModal,setNameModal] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const {compoundId} = useParams()
    const onSubmitModel = async(e)=>{
        e.preventDefault();
        if (nameModal.length=='') return setError('Name is requared')
          setLoading(true)
        try {
         await getUsersApi.post('/model',{name:nameModal,compound_id:compoundId});
         dispatch(getCompoundById(compoundId))
            onClose()
            setLoading(false)
        } catch (error) {
          setLoading(false)
            console.log(error);
        }
    }
    const dispatch = useDispatch();
    const deleteModal = async(id)=>{
try {
   await getUsersApi.delete(`/model/${id}`)
  dispatch(getCompoundById(compoundId))
} catch (error) {
  console.log(error);
}
    }
  return (
    <div className=" space-y-2">
    <div className=" flex justify-between w-full border px-2 py-1 rounded shadow">
    <h3 className=" font-semibold" >Modal</h3>
    <Button onClick={()=>{
      setNameModal('')
      setError('')
      onOpen()
    }} colorScheme='teal' size='xs' ><Plus size={15}/></Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form className=' w-full' onSubmit={onSubmitModel}>
        <VStack spacing={2}>
              <div className='w-full space-y-2'>
                <FormControl isInvalid={error} >
                  <FormLabel>Name :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name='name_en'
                    type='text'
                     value={nameModal}
                     onChange={(e)=>{
                      if (e.target.value.length>50) return setError('max length is 50')
                      setNameModal(e.target.value)
                     }}
                  />
              <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
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
    </div>
    {modelcompound?.length?  <div className=" flex flex-wrap space-x-2">
   { modelcompound?.map((e)=>(
    <ModalCompounant deleteModal={deleteModal} key={e.id} item={e}  />
    ))}
    </div>:<h3>Empty</h3>}
    </div>
  )
}

export default ModalTools