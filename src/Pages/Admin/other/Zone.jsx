import { Button, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { DeleteAlert } from "../../../componants"
import OthersCard from "../../../componants/others/OthersCard"
import { useEffect, useState } from "react"
import { api } from "../../../utils/api"

const Zone = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Zones,setZones] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [formData,setFormData] = useState({
    name_en:"",
    name_ar:""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getAllZones = async()=>{
try {
  let {data} = await api.get('/zones')
  setZones(data?.data)
} catch (error) {
  console.log(error);
}
  }
  const onSubmit = async(e) =>{
    e.preventDefault();
    setIsLoading(true)
    console.log(formData);
    try {
      let {data} = await api.post('/zones',formData)
      setZones(data?.data)
      getAllZones()
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
  const deleteZone = async(e)=>{
    try {
      let {data} = await api.delete(`/zones/${e.id}`)
      console.log(data?.data)
      getAllZones()
    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=>{
getAllZones()
},[])
  return (
    <div>
        <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3' > Zone </h3>
        <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={2}
        size='md'
        onClick={onOpen}
        ml={3}
      >
        Add Zone
      </Button>
<div className=" flex flex-col space-y-3 space-x-3 ml-3 mt-3 " >
{!!Zones.length?Zones.map((zone)=>(
<OthersCard key={zone.id} obj={zone} deleteFun={deleteZone} />
)):<Spinner/>}

<Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Zone</ModalHeader>
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

export default Zone