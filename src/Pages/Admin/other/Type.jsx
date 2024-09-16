import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { DeleteAlert } from "../../../componants"
import OthersCard from "../../../componants/others/OthersCard"
import { useEffect, useState } from "react"
import { api, getUsersApi } from "../../../utils/api"
import { getTypes } from "../../../redux/thunck/crudOthers"
import { useDispatch, useSelector } from "react-redux"

const Type = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
 // const [Types,setTypes] = useState([])
  const [Loading,setIsLoading] = useState(false)
  const { error,types, isLoading } = useSelector((state) => state.types);
  const dispatsh = useDispatch()
  const [errors,setErrors] = useState({
    name_en:'',
    name_ar:''
      })
  const [formData,setFormData] = useState({
    name_en:"",
    name_ar:""
  })

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
    console.log(formData);
    try {
      let {data} = await getUsersApi.post('/types',formData)
      dispatsh(getTypes())
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
useEffect(()=>{
 
  dispatsh(getTypes())
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
  if (!isLoading&!types?.length ) {
    return true
  }
}
const deleteType = async(e)=>{
try {
  let {data} = await getUsersApi.delete(`/types/${e.id}`)
  console.log(data?.data)
  dispatsh(getTypes())
} catch (error) {
  console.log(error);
}
}
  return (
    <div>
        <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3' > Type </h3>
        <Button
        colorScheme='teal'
        leftIcon={<Plus />}
        mt={2}
        size='md'
        onClick={clearInput}
        ml={3}
      >
        Add Type
      </Button>
<div className=" flex flex-col space-y-3 ml-3 mt-3 " >
{isEmpty() &&<h2>Empty</h2>}
{!isLoading?types.map((type)=>(
<OthersCard key={type.id} text='Type' endPoint={'type'} funGet={getTypes} obj={type} deleteFun={deleteType} />
)):<Spinner/>}

<Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Types</ModalHeader>
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
                <FormErrorMessage>{errors?.name_ar}</FormErrorMessage>
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

export default Type