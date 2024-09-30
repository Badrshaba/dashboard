import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {getUsersApi} from '../../../../utils/api'
import PayComponant from "./PayComponant"
import { getCompoundById } from "../../../../redux/thunck/crudCompounds"
import { useDispatch, useSelector } from "react-redux"
import { getProperityById } from "../../../../redux/thunck/crudProperites"
import { notification } from "antd"


const PaymentTools = ({paymentplancompound}) => {
  const { isOpen:isOpenPay, onOpen:onOpenPay, onClose:onClosePay } = useDisclosure()
  const {properiteId} = useParams()
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({
    down_payment:"",
    type_of_date:"",
    receipt_payment:"",
    maintenance_payment:"",
    fixed_payment:""
  })
  const [errors,setErrors] = useState({
    down_payment:"",
    type_of_date:"",
    receipt_payment:"",
    maintenance_payment:"",
    fixed_payment:""
  })
  const dispatch = useDispatch();
  const { authButton } = useSelector((state) => state.authrization);
  const onSubmit = async(e)=>{
    e.preventDefault();
  if(formData.down_payment=='')return setErrors((prevData)=>({
    ...prevData,
    down_payment:"down payment is requared"
  }))
  if(formData.type_of_date=='')return setErrors((prevData)=>({
    ...prevData,
    type_of_date:"type of date is requared"
  }))
  if(formData.receipt_payment=='')return setErrors((prevData)=>({
    ...prevData,
    receipt_payment:"receipt payment is requared"
  }))
  if(formData.maintenance_payment=='')return setErrors((prevData)=>({
    ...prevData,
    maintenance_payment:"maintenance payment is requared"
  }))
  if(formData.fixed_payment=='')return setErrors((prevData)=>({
    ...prevData,
    fixed_payment:"fixed payment is requared"
  }))
    setLoading(true)
 formData.apartment_id = properiteId
  try {
    const {data} = await getUsersApi.post('/apartments/payment-plan',formData);
    notification.success({
      description: 'Successfully Created New Payment Plan.!',
      duration: 2,
      showProgress: true,
      message: 'Create Payment Plan',
      placement: 'topRight',
    });
    dispatch(getProperityById(properiteId))
    onClosePay()
    setLoading(false)
  } catch (error) {
      setLoading(false)
      console.log(error);
    }
    setLoading(false)
}
const handleChange = (e) => {
  const { name, value } = e.target;
  if ( value.length > 50) {
   return setErrors((prevData)=>({
      ...prevData,
      [name]:"max length is 50 "
    }))
  }
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
const deletePayment = async(id)=>{
  try {
    await getUsersApi.delete(`/apartments/payment-plans/${id}`);
    dispatch(getProperityById(properiteId))
  } catch (error) {
    console.log(data);
  }
}

const clearPayment = ()=>{
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
                <FormControl isInvalid={errors.down_payment}>
                  <FormLabel>Down Payment :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="down_payment"
                    value={formData.down_payment}
                    onChange={handleChange}
                  />
              <FormErrorMessage>{errors.down_payment}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.type_of_date}>
                  <FormLabel>Type Of Date :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name="type_of_date"
                    value={formData.type_of_date}
                    onChange={handleChange}
                  />
              <FormErrorMessage>{errors.type_of_date}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.receipt_payment}>
                  <FormLabel>Receipt Payment :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name="receipt_payment"
                    type='number'
                    value={formData.receipt_payment}
                    onChange={handleChange}
                  />
              <FormErrorMessage>{errors.receipt_payment}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.maintenance_payment}>
                  <FormLabel>Maintenance Payment :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name="maintenance_payment"
                    type='number'
                    value={formData.maintenance_payment}
                    onChange={handleChange}
                  />
              <FormErrorMessage>{errors.maintenance_payment}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.fixed_payment} >
                  <FormLabel>Price Of Month :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="fixed_payment"
                    value={formData.fixed_payment}
                    onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.fixed_payment}</FormErrorMessage>
                </FormControl>
              </div>
        </VStack>
        <Button
          colorScheme='teal'
          className='w-full mb-1 mt-4'
          type='submit'
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </div>
    {paymentplancompound?.length?  <div className=" flex flex-wrap gap-2">
   { paymentplancompound?.map((e)=>(
    <PayComponant item={e} key={e.id} deletePayment={deletePayment}   />
    ))}
    </div>:<h3>Empty</h3>}</div>
  )
}

export default PaymentTools