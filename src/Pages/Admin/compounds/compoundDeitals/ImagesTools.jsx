
import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Image } from "antd"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {baseURL} from '../../../../utils/api'

const ImagesTools = ({imagecompound}) => {
    const { isOpen:isOpenImg, onOpen:onOpenImg, onClose:onCloseImg } = useDisclosure()
    const [images,setImages] = useState([])
    const {compoundId} = useParams()
    const handleInputChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            setImages((prev) => [...prev, e.target.files[i]]);
        }
    }
    const onSubmit = async(e)=>{
      e.preventDefault();
    const formData = new FormData();

      for (let index = 0; index < images.length; index++) {
        formData.append('images[]', images[index]);
      }
      try {
      const {data} = await baseURL({
        method: 'post',
        url: `/compounds/images/${compoundId}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          APP_KEY: import.meta.env.VITE_APP_KEY,
          Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
        },
      });
          console.log(data);
       //onClosePay()
      } catch (error) {
          console.log(error);
      }
  }
  return (
    <div className=" space-y-2">
    <div className=" flex justify-between w-full border px-2 py-1 rounded shadow">
    <h3 className=" font-semibold">Images</h3>
    <Button onClick={onOpenImg} colorScheme='teal' size='xs' ><Plus size={15}/></Button>
    <Modal isOpen={isOpenImg}  onClose={onCloseImg}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Image Title</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form
        className='px-5 py-2 w-full'
        onSubmit={onSubmit}
      >
        <VStack spacing={2}>
            <div className=' flex space-x-3 w-full'>
              <div className='w-full space-y-2'>
                <FormControl >
                  <FormLabel  >Imges :
                  </FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='file'
                    multiple
                    // style={{display:'none'}}
                     onChange={(e) => handleInputChange(e)}
                  />
                  {images?.map((e)=>(
                    <li>{e.name}</li>
                  ))}
              {/* <FormErrorMessage>llllll</FormErrorMessage> */}
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
    {imagecompound?.length?  <div className=" flex space-x-2">
       { imagecompound?.map((e)=>(
         <div><Image width={100} src={e.image}  key={e.id} />
         {console.log(e)}
         </div>
        ))}
        </div>:<h3>Empty</h3>} 
    </div>
  )
}

export default ImagesTools