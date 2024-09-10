import { useDisclosure } from '@chakra-ui/react';
import React from 'react'
import DeleteAlert from '../deleteAlert/DeleteAlert';

const OthersCard = ({text}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <div onClick={onOpen} className=" border bg-white border-black rounded-lg p-4 min-w-16 flex justify-center hover:text-white hover:font-bold hover:bg-red-700 hover:cursor-pointer transition-colors duration-75">
    <h2>{text}</h2>
    </div>
    <DeleteAlert 
        // userInfo={userInfo}
        // deleteFun={deleteCompound}
        onClose={onClose}
        isOpen={isOpen}
        head={`Delete ${text}`}
        body={`Do you want delete ${text}`} 
         />
    </>
  )
}

export default OthersCard