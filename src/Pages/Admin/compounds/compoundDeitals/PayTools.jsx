import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {getUsersApi} from '../../../../utils/api'

const PayTools = ({paymentplancompound}) => {
    const { isOpen:isOpenPay, onOpen:onOpenPay, onClose:onClosePay } = useDisclosure()
    const {compoundId} = useParams()
    const [rate,setRate] = useState('')
    const [yearly_rate,setYearly_rate] = useState('')
    const onSubmit = async(e)=>{
      e.preventDefault();
      try {
      const {data} = await getUsersApi.post('/payment-plan',{rate,yearly_rate,compound_id:compoundId});
          console.log(data);
       onClosePay()
      } catch (error) {
          console.log(error);
      }
  }
  return (
    <div className=" space-y-2">
    <div className=" flex justify-between w-full border px-2 py-1 rounded shadow">
    <h3 className=" font-semibold" >payment plan</h3>
    <Button onClick={onOpenPay} colorScheme='teal' size='xs' ><Plus size={15}/></Button>
    <Modal isOpen={isOpenPay} onClose={onClosePay}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Payment Plan</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form className=' w-full' onSubmit={onSubmit} >
        <VStack spacing={2}>
              <div className='w-full space-y-2'>
                <FormControl >
                  <FormLabel>Rate :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={rate}
                    onChange={(e)=>setRate(e.target.value)}
                  />
              <FormErrorMessage>llllll</FormErrorMessage>
                </FormControl>
                <FormControl >
                  <FormLabel>Yearly Rate :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={yearly_rate}
                    onChange={(e)=>setYearly_rate(e.target.value)}
                  />
              <FormErrorMessage>llllll</FormErrorMessage>
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
    {paymentplancompound?.length?  <div className=" flex space-x-2">
   { paymentplancompound?.map((e)=>(
    <h3 className=" p-2 border" key={e.id} >{e.rate}</h3>
    ))}
    </div>:<h3>Empty</h3>}</div>
  )
}

export default PayTools