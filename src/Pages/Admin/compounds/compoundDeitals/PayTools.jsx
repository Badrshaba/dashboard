import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {getUsersApi} from '../../../../utils/api'
import PayComponant from "./PayComponant"
import { getCompoundById } from "../../../../redux/thunck/crudCompounds"
import { useDispatch, useSelector } from "react-redux"

const PayTools = ({paymentplancompound}) => {
    const { isOpen:isOpenPay, onOpen:onOpenPay, onClose:onClosePay } = useDisclosure()
    const {compoundId} = useParams()
    const [loading,setLoading] = useState(false)
    const [rate,setRate] = useState('')
    const [yearly_rate,setYearly_rate] = useState('')
    const [errorRate,setErrorRate] = useState('')
    const [errorYearly_rate,setErrorYearly_rate] = useState('')
    const dispatch = useDispatch();
    const { authButton } = useSelector((state) => state.authrization);

    const onSubmit = async(e)=>{
      e.preventDefault();
    if(!rate.length)return setErrorRate('rate is requared')
    if(!yearly_rate.length)return setErrorYearly_rate('rate is requared')
      setLoading(true)
    try {
      const {data} = await getUsersApi.post('/payment-plan',{rate,yearly_rate,compound_id:compoundId});
      dispatch(getCompoundById(compoundId))
      onClosePay()
      setLoading(false)
    } catch (error) {
        setLoading(false)
          console.log(error);
      }
  }
  const deletePayment = async(id)=>{
    try {
      await getUsersApi.delete(`/payment-plans/${id}`);
      dispatch(getCompoundById(compoundId))
    } catch (error) {
      console.log(data);
    }


  }

  const clearPayment = ()=>{
    setRate('')
    setYearly_rate('')
    setErrorRate('')
    setErrorYearly_rate('')
    onOpenPay()
  }
  return (
    <div className=" space-y-2">
    <div className=" flex justify-between w-full border px-2 py-1 rounded shadow">
    <h3 className=" font-semibold" >Payment plan</h3>
    {authButton&&<Button onClick={clearPayment} colorScheme='teal' size='xs' ><Plus size={15}/></Button>}
    <Modal isOpen={isOpenPay} onClose={onClosePay}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Payment Plan</ModalHeader>
      <ModalCloseButton />
      <ModalFooter>
      <form className=' w-full' onSubmit={onSubmit} >
        <VStack spacing={2}>
              <div className='w-full space-y-2'>
                <FormControl isInvalid={errorRate}>
                  <FormLabel>Rate :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={rate}
                    onChange={(e)=>{
                      if (e.target.value>999) return setErrorRate('max length is 999')
                      setRate(e.target.value)
                    }}
                  />
              <FormErrorMessage>{errorRate}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorYearly_rate} >
                  <FormLabel>Yearly Rate :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={yearly_rate}
                    onChange={(e)=>{
                      if (e.target.value>999) return setErrorYearly_rate('max length is 999')
                      setYearly_rate(e.target.value)
                    }}
                    />
                    <FormErrorMessage>{errorYearly_rate}</FormErrorMessage>
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
    {paymentplancompound?.length?  <div className=" flex flex-wrap space-x-2">
   { paymentplancompound?.map((e)=>(
    <PayComponant item={e} key={e.id} deletePayment={deletePayment}   />
    ))}
    </div>:<h3>Empty</h3>}</div>
  )
}

export default PayTools