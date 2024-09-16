import {  Button as AButton,FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import DeleteAlert from "../deleteAlert/DeleteAlert";
import { Edit, Trash } from "lucide-react";
import { api, getUsersApi } from "../../utils/api";
import { useDispatch } from "react-redux";


const OthersCard = ({text,obj,deleteFun,endPoint,funGet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenModal, onOpen:onOpenModal, onClose:onCloseModal } = useDisclosure();
const [user,setUser]= useState({})
const [errors,setErrors]= useState({
  name_en:'',
  name_ar:'',
})
const dispatsh = useDispatch()
  const getById = async(id)=>{
    try {
      let {data} = await getUsersApi.get(`/${endPoint}/${id}`)
      setUser(data?.data)
      onOpenModal()
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
const update = async (e)=>{
  e.preventDefault();
  if(user.name_en=='') return setErrors((prevData)=>({
    ...prevData,
    name_en:"Name is requered"
  }))

  if(user.name_ar=='') return setErrors((prevData)=>({
    ...prevData,
    name_ar:"الاسم اجباري"
  }))
console.log(user);
  try {
    let {data} = await getUsersApi.post(`/${endPoint}/${user?.id}?_method=PUT`,user)
    console.log(data);
    dispatsh(funGet())
  } catch (error) {
    console.log(error);
  }
  setTimeout(()=>{
    onCloseModal()
  },500)
}
  return (
    <>
      <div
        className=" w-4/5  space-x-3 border bg-white border-black rounded-lg p-4 min-w-16 flex justify-between font-semibold  hover:cursor-pointer transition-colors duration-75"
      >
        <h2 className=" text-xl">{obj?.name}</h2>
        <div className=" flex space-x-3 ">
          <button  onClick={()=>getById(obj.id)}  className=" px-3 rounded-md bg-yellow-400 hover:bg-yellow-500"  >
            <Edit />
          </button>
          <button  onClick={onOpen}  className=" px-3 rounded-md bg-red-600 hover:bg-red-700 " >
            <Trash />
          </button>
        </div>
      </div>
      <DeleteAlert
         userInfo={obj}
         deleteFun={deleteFun}
        onClose={onClose}
        isOpen={isOpen}
        head={`Delete ${text} `}
        body={`Do you want delete ${text} `}
      />
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {text}</ModalHeader>
          <ModalCloseButton />
          <form className='px-5 py-2' onSubmit={update} >
            <VStack spacing={2}>
              <FormControl isInvalid={errors?.name_en} >
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  name="name_en"
                  onChange={handleChange}
               value={user?.name_en} />
               <FormErrorMessage>{errors?.name_en}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.name_ar} style={{direction:'rtl'}} >
                <FormLabel>الاسم</FormLabel>
                <Input
                  type='text'
                  name="name_ar"
                  onChange={handleChange}
                 value={user?.name_ar}
                />
                <FormErrorMessage>{errors?.name_ar}</FormErrorMessage>
              </FormControl>
            </VStack>
            <AButton
            
              colorScheme='teal'
              className='w-full mb-2 mt-4'
            //   isLoading={isLoading}
              type='submit'>
                
              Submit
            </AButton>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};


export default OthersCard;
