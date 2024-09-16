import {  Button as AButton,FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import DeleteAlert from "../deleteAlert/DeleteAlert";
import { Edit, Trash } from "lucide-react";
 import { Button } from "antd";

const OthersCard = ({ obj,deleteFun }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenModal, onOpen:onOpenModal, onClose:onCloseModal } = useDisclosure();

  return (
    <>
      <div
        className=" w-4/5  space-x-3 border bg-white border-black rounded-lg p-4 min-w-16 flex justify-between font-bold  hover:cursor-pointer transition-colors duration-75"
      >
        <h2 className=" text-2xl">{obj?.name}</h2>
        <div className=" flex space-x-3 ">
          <button  onClick={onOpenModal}  className=" px-3 rounded-md bg-yellow-400 hover:bg-yellow-500"  >
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
        head={`Delete `}
        body={`Do you want delete `}
      />
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Zone</ModalHeader>
          <ModalCloseButton />
          <form className='px-5 py-2'>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
               value={obj.name}                />
              </FormControl>
              <FormControl>
                <FormLabel>Zone</FormLabel>
                <Input
                  type='text'
                //   ref={usernameRef}
                />
              </FormControl>
            </VStack>
            <AButton
              colorScheme='teal'
              className='w-full mt-4'
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
