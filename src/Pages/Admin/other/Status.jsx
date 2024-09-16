import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import OthersCard from "../../../componants/others/OthersCard";
import { useEffect, useState } from "react";
import { api, getUsersApi } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getStatus } from "../../../redux/thunck/crudOthers";


const Status = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Status,setStatus] = useState([])
  const [Loading,setIsLoading] = useState(false)
  const { error,status, isLoading } = useSelector((state) => state.status);
  const [formData,setFormData] = useState({
    name_en:"",
    name_ar:""
  })
  const [errors,setErrors] = useState({
    name_en:'',
    name_ar:''
      })
  const dispatsh = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = async(e) =>{
    e.preventDefault();
    if(formData.name_en=='') return setErrors((prevData)=>({
      ...prevData,
      name_en:"Name is requered"
    }))
    if(formData.name_ar=='') return setErrors((prevData)=>({
      ...prevData,
      name_ar:"الاسم اجباري"
    }))
    setIsLoading(true)
    try {
      let {data} = await getUsersApi.post('/status',formData)
      dispatsh(getStatus())
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
    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        setErrors((prevData) => ({
          ...prevData,
          [key]: '',
        }))
      }
    }
  }
useEffect(()=>{
 // getAllStatus()
  dispatsh(getStatus())
},[])
const clearInput = () =>{
  for (let key in formData) {
    if (formData.hasOwnProperty(key)) {
      setFormData((prevData) => ({
        ...prevData,
        [key]: '',
      }))
    }
  }
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      setErrors((prevData) => ({
        ...prevData,
        [key]: '',
      }))
    }
  }
  onOpen()
}
const isEmpty = ()=> {
  if (!isLoading&!status?.length ) {
    return true
  }
}
const deleteStatus = async (e)=>{
  try {
    let {data} = await getUsersApi.delete(`/status/${e.id}`)
    console.log(data?.data)
    dispatsh(getStatus())
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
        onClick={clearInput}
        ml={3}
      >
        Add Status
      </Button>
<div className=" flex flex-col space-y-3  ml-3 mt-3 " >

{!isLoading?status.map((status)=>(
<OthersCard key={status.id} text='Status' endPoint={'status'} funGet={getStatus} obj={status} deleteFun={deleteStatus} />
)):<Spinner/>}
{isEmpty() &&<h2>Empty</h2>}
<Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Status</ModalHeader>
          <ModalCloseButton />
          <form className='px-5 py-2' onSubmit={onSubmit}>
            <VStack spacing={2}>
              <FormControl isInvalid={errors?.name_en} >
                <FormLabel>Name :</FormLabel>
                <Input
                  type='text'
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              
              />
              <FormErrorMessage>{errors?.name_en}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.name_ar}  style={{direction:'rtl'}}>
                <FormLabel  > الاسم :</FormLabel>
                <Input
                  type='text'
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors?.name_en}</FormErrorMessage>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mb-2 mt-4'
               isLoading={Loading}
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