import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react"
import { Edit, Trash } from "lucide-react"
import { useState } from "react"
import { getUsersApi } from "../../../../utils/api"
import { useDispatch } from "react-redux"
import { getCompoundById } from "../../../../redux/thunck/crudCompounds"
import { useParams } from "react-router-dom"


const ModalCompounant = ({item,deleteModal}) => {
    const [show,setShow] = useState(false)
    const [modal,setModal] = useState(null) 
    const [error,setError] = useState('')
    const {compoundId} = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const getModalById = async(id) =>{
        try {
          const {data} =  await getUsersApi.get(`/model/${id}`)
           setModal(data?.data)
           onOpen()
         } catch (error) {
           console.log(error);
         }
    }
    const onUpdate = async(e)=>{
        e.preventDefault();
        if (modal?.name=='') return setError('Name is requared')
        try {
            await getUsersApi.post(`model/${item.id}?_method=PUT`,modal)
            dispatch(getCompoundById(compoundId))
            onClose()
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className=" flex" >
        <h3 className=" px-3 m-1 py-2 border" onMouseEnter={()=>setShow(true)} onMouseLeave={()=>{setTimeout(()=>setShow(false),2000)}} >{item.name}</h3>
        {show&& <div className="flex flex-col"   >
    <Button size={"xs"} onClick={()=>deleteModal(item.id)}  > <Trash size={15}   color="red" /></Button>
    <Button size={"xs"} onClick={()=>getModalById(item.id)}   > <Edit size={15}    /></Button>
</div>}
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form className=' w-full' onSubmit={onUpdate}>
        <VStack spacing={2}>
              <div className='w-full space-y-2'>
                <FormControl isInvalid={error} >
                  <FormLabel>Name :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name='name'
                    type='text'
                    value={modal?.name}
                     onChange={(e)=>{
                      if (e.target.value.length>50) return setError('max length is 50')
                        setModal((prevData) => ({
                            ...prevData,
                            'name': e.target.value,
                        }))
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
         // isLoading={loading}
        >
          Submit
        </Button>
      </form>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </div>
  )
}

export default ModalCompounant