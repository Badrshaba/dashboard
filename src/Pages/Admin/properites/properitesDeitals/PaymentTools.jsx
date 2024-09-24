import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {getUsersApi} from '../../../../utils/api'
import PayComponant from "./PayComponant"
import { getCompoundById } from "../../../../redux/thunck/crudCompounds"
import { useDispatch, useSelector } from "react-redux"
import { getProperityById } from "../../../../redux/thunck/crudProperites"


const PaymentTools = ({paymentplancompound}) => {
  const { isOpen:isOpenPay, onOpen:onOpenPay, onClose:onClosePay } = useDisclosure()
  const {properiteId} = useParams()
  const [loading,setLoading] = useState(false)
  const [year,setYear] = useState('')
  const [price_of_month,setPrice_of_month] = useState('')
  const [start,setStart] = useState('')
  const [errorYear,setErrorYear] = useState('')
  const [errorStart,setErrorStart] = useState('')
  const [errorprice_of_month,setErrorPrice_of_month] = useState('')
  const dispatch = useDispatch();
  const { authButton } = useSelector((state) => state.authrization);
  const onSubmit = async(e)=>{
    e.preventDefault();
  if(!year.length)return setErrorYear('year is requared')
  if(!start.length)return setErrorStart('start is requared')
  if(!price_of_month.length)return setErrorPrice_of_month('price of month is requared')
    setLoading(true)
  try {
    const {data} = await getUsersApi.post('/apartments/payment-plan',{start,year,price_of_month,apartment_id:properiteId});
    dispatch(getProperityById(properiteId))
    onClosePay()
    setLoading(false)
  } catch (error) {
      setLoading(false)
        console.log(error);
    }
}
const deletePayment = async(id)=>{
  try {
    await getUsersApi.delete(`/apartments/payment-plans/${id}`);
    dispatch(getProperityById(properiteId))
  } catch (error) {
    console.log(data);
  }
}

const clearPayment = ()=>{
  // setRate('')
  // setYearly_rate('')
  // setErrorRate('')
  // setErrorYearly_rate('')
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
                <FormControl isInvalid={errorYear}>
                  <FormLabel>Year :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={year}
                    onChange={(e)=>{
                      if (e.target.value>999) return setErrorYear('max length is 999')
                        setYear(e.target.value)
                    }}
                  />
              <FormErrorMessage>{errorYear}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorStart}>
                  <FormLabel>Start :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={start}
                    onChange={(e)=>{
                      if (e.target.value>999) return setErrorStart('max length is 999')
                        setStart(e.target.value)
                    }}
                  />
              <FormErrorMessage>{errorStart}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorprice_of_month} >
                  <FormLabel>Price Of Month :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    value={price_of_month}
                    onChange={(e)=>{
                      if (e.target.value>999) return setErrorPrice_of_month('max length is 999')
                        setPrice_of_month(e.target.value)
                    }}
                    />
                    <FormErrorMessage>{errorprice_of_month}</FormErrorMessage>
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

export default PaymentTools