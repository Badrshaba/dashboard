import { Button, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import OthersCard from "../../../componants/others/OthersCard";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";


const Status = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Status,setStatus] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const [formData,setFormData] = useState({
    name_en:"",
    name_ar:""
  })
  const getAllStatus = async()=>{
try {
  let {data} = await api.get('/status')
  setStatus(data?.data)
} catch (error) {
  console.log(error);
}
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = async(e) =>{
    e.preventDefault();
    setIsLoading(true)
    console.log(formData);
    try {
      let {data} = await api.post('/status',formData)
      setStatus(data?.data)
      getAllStatus()
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
    setTimeout(()=>{
      onClose()
    },500)
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        setFormData((prevData) => ({
          ...prevData,
          [key]: '',
        }))
      }
    }
  }
useEffect(()=>{
  getAllStatus()
},[])
const deleteStatus = async (e)=>{
  try {
    let {data} = await api.delete(`/status/${e.id}`)
    console.log(data?.data)
    getAllStatus()
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div>
        <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3' > Status </h3>
        <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={2}
        size='md'
        onClick={onOpen}
        ml={3}
      >
        Add Status
      </Button>
<div className=" flex flex-col space-y-3 space-x-3 ml-3 mt-3 " >
{!!Status.length?Status.map((status)=>(
<OthersCard key={status.id} obj={status} deleteFun={deleteStatus} />
)):<Spinner/>}

<Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Status</ModalHeader>
          <ModalCloseButton />
          <form className='px-5 py-2' onSubmit={onSubmit}>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Name :</FormLabel>
                <Input
                  type='text'
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              />
              </FormControl>
              <FormControl  style={{direction:'rtl'}}>
                <FormLabel  > الاسم :</FormLabel>
                <Input
                  type='text'
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
               isLoading={isLoading}
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

export default Status