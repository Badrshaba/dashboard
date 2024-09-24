import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Image } from "antd"
import { Plus, Trash } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {baseURL, getUsersApi} from '../../../../utils/api'
import { useDispatch, useSelector } from "react-redux"
import ImageCompounant from "./ImageCompounant"
import { getProperityById } from "../../../../redux/thunck/crudProperites"


const FloorTools = ({floorplancompound}) => {
  const { isOpen:isOpenImg, onOpen:onOpenImg, onClose:onCloseImg } = useDisclosure()
  const [images,setImages] = useState([])
  const [error,setError] = useState(false)
  const {properiteId} = useParams()
  const { authButton } = useSelector((state) => state.authrization);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
      for (let i = 0; i < e.target.files.length; i++) {
          setImages((prev) => [...prev, e.target.files[i]]);
      }
    }
    const onSubmit = async(e)=>{
      e.preventDefault();
      if (!images.length) return setError(true)
    const formData = new FormData(); 
      for (let index = 0; index < images.length; index++) {
        formData.append('images[]', images[index]);
      }
      try {
      const {data} = await baseURL({
        method: 'post',
        url: `/apartments/floor-plan/${properiteId}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          APP_KEY: import.meta.env.VITE_APP_KEY,
          Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
        },
      });
          console.log(data);
          dispatch(getProperityById(properiteId))
          onCloseImg()
      } catch (error) {
          console.log(error);
      }
  }
  const deleteImage = async(id)=>{
    try {
      await getUsersApi.delete(`/apartments/floor-plan/${id}`);
      dispatch(getProperityById(properiteId))
    } catch (error) {
      console.log(error);
    }
  }
  const clearImage = ()=>{
    setImages([])
    setError(false)
    onOpenImg()
  }
  return (
    <div>
    <div>
    <div className=" space-y-2">
    <div className=" flex justify-between w-full border px-2 py-1 rounded shadow">
    <h3 className=" font-semibold">Floor plan</h3>
    {authButton&&<Button onClick={clearImage} colorScheme='teal' size='xs' ><Plus size={15}/></Button>}
    <Modal isOpen={isOpenImg}  onClose={onCloseImg}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Floor plan</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form
        className='px-5 py-2 w-full'
        onSubmit={onSubmit}
      >
        <VStack spacing={2}>
            <div className=' flex space-x-3 w-full'>
              <div className='w-full space-y-2'>
                <FormControl isInvalid={error} >
                  <FormLabel  >Imges :
                  </FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='file'
                    multiple
                    // style={{display:'none'}}
                     onChange={(e) => handleInputChange(e)}
                  />
                  {images?.map((e,index)=>(
                    <li key={index} >{e.name}</li>
                  ))}
              <FormErrorMessage>Image is requared</FormErrorMessage>
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
    </div>
    {floorplancompound?.length?  <div className=" flex flex-wrap space-x-2">
       { floorplancompound?.map((e)=>(
         <div className=" flex items-start " key={e.id} >
          <ImageCompounant item={e} deleteImage={deleteImage}/>
         </div>
        ))}
        </div>:<h3>Empty</h3>} 
    </div>

    </div>
    </div>
  )
}

export default FloorTools