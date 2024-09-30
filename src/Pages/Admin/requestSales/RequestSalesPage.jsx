import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, useDisclosure } from '@chakra-ui/react'
import { Image, notification, Typography } from 'antd'
import { DeleteAlert } from '../../../componants'
import { getUsersApi } from '../../../utils/api'
import { getRequestsForSalesById } from '../../../redux/thunck/crudRequestSales'


const RequestSalesPage = () => {
        const {requestId} = useParams()
      const { isOpen, onOpen, onClose } = useDisclosure();
      const { isOpen:deleteIsOpen, onOpen:deleteOnOpen, onClose:deleteOnClose } = useDisclosure();
    const navigate = useNavigate()
        const dispatch = useDispatch()
        const {  RequestSaller } = useSelector((state) => state.RequestSales)
        console.log(RequestSaller);
        useEffect(() => {
            dispatch(getRequestsForSalesById(requestId))
        },[])
        const approve = async({id,onClose}) => {
         try {
            let {data} = await getUsersApi.post(`/sales/aproved/${id}`)
            console.log(data);
            notification.success({
                description: 'Successfully Approved New sales.!',
                duration: 2,
                showProgress: true,
                message: 'Approved sales',
                placement: 'topRight',
              });
            onClose()
            navigate(-1)
         } catch (error) {
            console.log(error);
         }
        }
        const cancel = async({id,onClose}) => {
            try {
                let {data} = await getUsersApi.post(`/sales/cancels/${id}`)
                console.log(data);
                notification.success({
                    description: 'Successfully Canceled .!',
                    duration: 2,
                    showProgress: true,
                    message: 'cancel sales',
                    placement: 'topRight',
                  });
                onClose()
                navigate(-1)
             } catch (error) {
                console.log(error);
             }
        }
  return (
    <div className='p-5' >
        <div className='flex justify-between' >
        <div>
        <h2 className=' text-2xl font-semibold text-gray-600 mb-5' >Saller Data :</h2>
            <Typography.Paragraph >Name: <span className='font-semibold' >{RequestSaller?.user?.name}</span></Typography.Paragraph>
            <Typography.Paragraph  >Email: <span className='font-semibold' >{RequestSaller?.user?.email}</span> </Typography.Paragraph>
            <Typography.Paragraph >phone:  <span className='font-semibold' >{RequestSaller?.user?.mobile}</span> </Typography.Paragraph>
        </div>
        <div className='flex gap-5' >
            <Button colorScheme='green' onClick={onOpen} >Approve</Button>
            <Button colorScheme='red' onClick={deleteOnOpen} >Cancel</Button>
        </div>
        </div>
        <h2 className=' text-2xl font-semibold text-gray-600 my-5' >Client Data :</h2>
            <Typography.Paragraph >Name: <span className='font-semibold' >{RequestSaller?.name}</span></Typography.Paragraph>
            <Typography.Paragraph  >Email: <span className='font-semibold' >{RequestSaller?.email}</span> </Typography.Paragraph>
            <Typography.Paragraph >Phone:  <span className='font-semibold' >{RequestSaller?.number}</span> </Typography.Paragraph>
            <Typography.Paragraph >Job:  <span className='font-semibold' >{RequestSaller?.job}</span> </Typography.Paragraph>
            <Typography.Paragraph >Address:  <span className='font-semibold' >{RequestSaller?.address}</span> </Typography.Paragraph>
        <h2 className=' text-2xl font-semibold text-gray-600 my-5' >Appartment Data :</h2>
            <Typography.Paragraph >Name: <span className='font-semibold' >{RequestSaller?.apartment?.name}</span></Typography.Paragraph>
            <Typography.Paragraph  >Area: <span className='font-semibold' >{RequestSaller?.apartment?.area}</span> </Typography.Paragraph>
            <Typography.Paragraph  >Image: </Typography.Paragraph>
            <Image src={RequestSaller?.apartment?.image} alt='apartment' />
        <h2 className=' text-2xl font-semibold text-gray-600 my-5' >Payment Plan :</h2>
        <div  className={' px-2 space-y-2 flex items-center bg-[#e4ebf2] flex-col justify-center hover:cursor-pointer hover:shadow-md py-5 rounded-lg w-fit'} >
                <p className='text-2xl mx-auto w-fit font-semibold text-[#1e4164]' >  {RequestSaller?.payment_plan?.receipt_payment} % </p>
                <p className='text-xs text-gray-500' >  {RequestSaller?.payment_plan?.down_payment} Down Payment</p>
                <p className=' w-fit' > {RequestSaller?.payment_plan?.type_of_date}</p>
                <p className=' w-fit text-xs text-gray-500 ' > {RequestSaller?.payment_plan?.maintenance_payment} maintenance payment </p>
                <p className=' w-fit text-xs text-gray-500 ' > {RequestSaller?.payment_plan?.fixed_payment} fixed payment </p>
            </div>

        <DeleteAlert isOpen={deleteIsOpen} deleteFun={cancel} info={{id:requestId}} onClose={deleteOnClose} head="Delete Request" body="Are you sure you want to delete this request?"/>
        <DeleteAlert isOpen={isOpen} deleteFun={approve} info={{id:requestId}} mainButton='Approve' themMainButton='green' onClose={onClose} head="Approve Request" body="Are you sure you want to Approve this request?"/>
    </div>
  )
}

export default RequestSalesPage