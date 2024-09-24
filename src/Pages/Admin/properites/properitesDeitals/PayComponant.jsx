import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"

import { Typography } from "antd";
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
    const [paymentData,setPaymentData] = useState(null)
    const [errorYear,setErrorYear] = useState(false)
    const [errorStart,setErrorStart] = useState(false)
    const [errorprice_of_month,setErrorPrice_of_month] = useState(false)
    const dispatch = useDispatch();
    const { authButton } = useSelector((state) => state.authrization);
    const {properiteId} = useParams()
    const getPaymentById = async(id)=>{
        try {
            let {data} = await getUsersApi.get(`/apartments/payment-plans/${id}`)
            setPaymentData(data?.data)
            onOpenPay()
            console.log(data?.data);
        } catch (error) {
            console.log(error); 
        }
          }
      const onSubmit = async(e) =>{
        e.preventDefault();
        if(!paymentData?.year) return setErrorYear(true)
        if(!paymentData?.start) return setErrorStart(true)
        if(!paymentData?.price_of_month) return setErrorPrice_of_month(true)
        try {
            let {data} = await getUsersApi.post(`/apartments/payment-plan/${paymentData?.id}?_method=PUT`,paymentData)
            console.log(data);
            onClosePay()
            dispatch(getProperityById(properiteId))
          } catch (error) {
            console.log(error);
          }
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({
          ...prevData,
          [name]: +value,
        }));
      }
      const clearItem = (id) =>{
        setErrorYear(false)
        setErrorStart(false)
        setErrorPrice_of_month(false)
        getPaymentById(id)
      }
  return (
<div className=" flex" >
<div key={item.id} className=" border " onMouseEnter={()=>setShow(true)} onMouseLeave={()=>{setTimeout(()=>setShow(false),2000)}} >
    <div className=" flex justify-between px-2 space-x-1" >
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
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
    </Typography.Paragraph> 
    </div>
  </div>
  {authButton&&show&& <div className="flex flex-col"   >
    <Button size={"xs"} onClick={()=>deletePayment(item.id)}  > <Trash size={15}   color="red" /></Button>
    <Button size={"xs"} onClick={()=>clearItem(item.id)}   > <Edit size={15}    /></Button>
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
                <FormControl isInvalid={errorYear}>
                  <FormLabel>Year :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="year"
                    value={paymentData?.year}
                     onChange={handleChange}
                  />
              <FormErrorMessage>year is requared</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorStart}>
                  <FormLabel>Start :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="start"
                    value={paymentData?.start}
                     onChange={handleChange}
                  />
              <FormErrorMessage>Start is requared</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorprice_of_month} >
                  <FormLabel>Price Of Month :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="price_of_month"
                    value={paymentData?.price_of_month}
                     onChange={handleChange}
                    />
                    <FormErrorMessage>Price Of Month is requared</FormErrorMessage>
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
  )
}



export default PayComponant