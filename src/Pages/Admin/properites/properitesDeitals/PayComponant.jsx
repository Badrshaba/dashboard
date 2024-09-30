import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"

import { notification, Typography } from "antd";
import { Edit, Trash } from "lucide-react";
import { useState } from "react"
import { getUsersApi } from "../../../../utils/api";
import { getCompoundById } from "../../../../redux/thunck/crudCompounds";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProperityById } from "../../../../redux/thunck/crudProperites";

const PayComponant = ({item,deletePayment}) => {
    const { isOpen:isOpenPay, onOpen:onOpenPay, onClose:onClosePay } = useDisclosure()
    const [show,setShow] = useState(false)
    const [errors,setErrors] = useState({
      down_payment:"",
      type_of_date:"",
      receipt_payment:"",
      maintenance_payment:"",
      fixed_payment:""
    })
    const [paymentData,setPaymentData] = useState(null)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const { authButton } = useSelector((state) => state.authrization);
    const {properiteId} = useParams()
    // const getPaymentById = async(id)=>{
    //     try {
    //         let {data} = await getUsersApi.get(`/apartments/payment-plans/${id}`)
    //         setPaymentData(data?.data)
    //         onOpenPay()
    //         console.log(data?.data);
    //     } catch (error) {
    //         console.log(error); 
    //     }
    //       }
      const onSubmit = async(e) =>{
        e.preventDefault();
        if(paymentData.down_payment=='')return setErrors((prevData)=>({
          ...prevData,
          down_payment:"down payment is requared"
        }))
        if(paymentData.type_of_date=='')return setErrors((prevData)=>({
          ...prevData,
          type_of_date:"type of date is requared"
        }))
        if(paymentData.receipt_payment=='')return setErrors((prevData)=>({
          ...prevData,
          receipt_payment:"receipt payment is requared"
        }))
        if(paymentData.maintenance_payment=='')return setErrors((prevData)=>({
          ...prevData,
          maintenance_payment:"maintenance payment is requared"
        }))
        if(paymentData.fixed_payment=='')return setErrors((prevData)=>({
          ...prevData,
          fixed_payment:"fixed payment is requared"
        }))
        setLoading(true)
        try {
            let {data} = await getUsersApi.post(`/apartments/payment-plan/${paymentData?.id}?_method=PUT`,paymentData)
            console.log(data);
        setLoading(false)
            onClosePay()
            notification.success({
              description: 'Successfully Update Payment Plan.!',
              duration: 2,
              showProgress: true,
              message: 'Update Payment Plan',
              placement: 'topRight',
            });
            dispatch(getProperityById(properiteId))
          } catch (error) {
            console.log(error);
        setLoading(false)

          }
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
      const clearItem = (item) =>{
         for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      setErrors((prevData) => ({
        ...prevData,
        [key]: '',
      }))
    }
  }
       setPaymentData(item)
       onOpenPay()
      }
  return (
<div className=" flex" >
<div key={item.id} className=" border " onMouseEnter={()=>setShow(true)} onMouseLeave={()=>{setTimeout(()=>setShow(false),2000)}} >
    <div className=" flex" >
    <div  className={' px-2 space-y-2 flex items-center bg-[#e4ebf2] flex-col justify-center hover:cursor-pointer hover:shadow-md py-5 rounded-lg w-fit'} >
                <p className='text-2xl mx-auto w-fit font-semibold text-[#1e4164]' >  {item?.receipt_payment} % </p>
                <p className='text-xs text-gray-500' >  {item?.down_payment} Down Payment</p>
                <p className=' w-fit' > {item?.type_of_date}</p>
                <p className=' w-fit text-xs text-gray-500 ' > {item?.maintenance_payment} maintenance payment </p>
                <p className=' w-fit text-xs text-gray-500 ' > {item?.fixed_payment} fixed payment </p>
            </div>
    {/* <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    Year
    </Typography.Paragraph> 
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    {item.year}
    </Typography.Paragraph> 
    </div>
    <div className=" flex justify-between px-2 space-x-1" >
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    Start
    </Typography.Paragraph> 
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    {item.start}
    </Typography.Paragraph> 
    </div>
    <div className=" flex px-2 justify-between space-x-1" >
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    Price Of Month
    </Typography.Paragraph> 
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    {item.price_of_month}
    </Typography.Paragraph> */}
    </div> 
  </div>
  {authButton&&show&& <div className="flex flex-col"   >
    <Button size={"xs"} onClick={()=>deletePayment(item.id)}  > <Trash size={15}   color="red" /></Button>
    <Button size={"xs"} onClick={()=>clearItem(item)}   > <Edit size={15}    /></Button>
</div>}
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
                    value={paymentData?.down_payment}
                    onChange={handleChange}
                  />
              <FormErrorMessage>{errors.down_payment}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.type_of_date}>
                  <FormLabel>Type Of Date :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name="type_of_date"
                    value={paymentData?.type_of_date}
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
                    value={paymentData?.receipt_payment}
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
                    value={paymentData?.maintenance_payment}
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
                    value={paymentData?.fixed_payment}
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
  )
}



export default PayComponant