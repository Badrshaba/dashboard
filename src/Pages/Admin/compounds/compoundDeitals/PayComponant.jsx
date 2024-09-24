import { Button, Modal,VStack,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"

import { Typography } from "antd";
import { Edit, Trash } from "lucide-react";
import { useState } from "react"
import { getUsersApi } from "../../../../utils/api";
import { getCompoundById } from "../../../../redux/thunck/crudCompounds";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const PayComponant = ({item,deletePayment}) => {
    const { isOpen:isOpenPay, onOpen:onOpenPay, onClose:onClosePay } = useDisclosure()
    const [show,setShow] = useState(false)
    const [paymentData,setPaymentData] = useState(null)
    const [errorRate,setErrorRate] = useState(false)
    const [errorYearly_rate,setErrorYearly_rate] = useState(false)
    const dispatch = useDispatch();
    const {compoundId} = useParams()
    const getPaymentById = async(id)=>{
        try {
            let {data} = await getUsersApi.get(`/payment-plans/${id}`)
            setPaymentData(data?.data)
            onOpenPay()
            console.log(data?.data);
        } catch (error) {
            console.log(error);
        }
          }
      const onSubmit = async(e) =>{
        e.preventDefault();
        try {
            let {data} = await getUsersApi.post(`/payment-plan/${paymentData?.id}?_method=PUT`,paymentData)
            console.log(data);
            onClosePay()
            dispatch(getCompoundById(compoundId))
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
      const { authButton } = useSelector((state) => state.authrization);  
  return (
<div className=" flex" >
<div key={item.id} className=" border " onMouseEnter={()=>setShow(true)} onMouseLeave={()=>{setTimeout(()=>setShow(false),2000)}} >
    <div className=" flex justify-between px-2 space-x-1" >
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    Rate
    </Typography.Paragraph> 
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    {item.rate}
    </Typography.Paragraph> 
    </div>
    <div className=" flex px-2 justify-between space-x-1" >
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    Yearly Rate
    </Typography.Paragraph> 
    <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }} >
    {item.yearly_rate}
    </Typography.Paragraph> 
    </div>
  </div>
  {authButton&&show&& <div className="flex flex-col"   >
    <Button size={"xs"} onClick={()=>deletePayment(item.id)}  > <Trash size={15}   color="red" /></Button>
    <Button size={"xs"} onClick={()=>getPaymentById(item.id)}   > <Edit size={15}    /></Button>
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
                <FormControl isInvalid={errorRate}>
                  <FormLabel>Rate :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="rate"
                    value={paymentData?.rate}
                     onChange={handleChange}
                  />
              <FormErrorMessage>Rate is requared</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errorYearly_rate} >
                  <FormLabel>Yearly Rate :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    type='number'
                    name="yearly_rate"
                    value={paymentData?.yearly_rate}
                     onChange={handleChange}
                    />
                    <FormErrorMessage>Yearly Rate is requared</FormErrorMessage>
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