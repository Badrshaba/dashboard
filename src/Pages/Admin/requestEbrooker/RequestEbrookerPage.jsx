import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getRequestsForEbrookerById } from '../../../redux/thunck/crudRequestEbrooker'
import { Button, useDisclosure } from '@chakra-ui/react'
import { notification, Typography } from 'antd'
import { DeleteAlert } from '../../../componants'
import { getUsersApi } from '../../../utils/api'

const RequestEbrookerPage = () => {
    const {ebrookerId} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:deleteIsOpen, onOpen:deleteOnOpen, onClose:deleteOnClose } = useDisclosure();
const navigate = useNavigate()
    const dispatch = useDispatch()
    const {  RequestEbrooker } = useSelector((state) => state.RequestEbrooker)
    console.log(RequestEbrooker);
    useEffect(() => {
        dispatch(getRequestsForEbrookerById(ebrookerId))
    },[])
    const approve = async({id,onClose}) => {
     try {
        let {data} = await getUsersApi.post(`/brocker/aproved/${id}`)
        console.log(data);
        notification.success({
            description: 'Successfully Approved New ebrooker.!',
            duration: 2,
            showProgress: true,
            message: 'Approved ebrooker',
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
            let {data} = await getUsersApi.post(`/brocker/cancels/${id}`)
            console.log(data);
            notification.success({
                description: 'Successfully Canceled .!',
                duration: 2,
                showProgress: true,
                message: 'cancel ebrooker',
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
           {/* // <h3 className=' text-2xl font-semibold text-gray-600 '>Name: <span className='font-semibold' >{RequestEbrooker?.name}</span></h3> */}
            {/* <h3 className=' text-2xl font-semibold text-[#5c5b5b] ' >Email: <span className='font-semibold' >{RequestEbrooker?.email}</span> </h3> */}
            {/* <h3 className=' text-2xl font-semibold text-[#5c5b5b] ' >phone:  <span className='font-semibold' >{RequestEbrooker?.mobile}</span> </h3> */}
            <Typography.Paragraph >Name: <span className='font-semibold' >{RequestEbrooker?.name}</span></Typography.Paragraph>
            <Typography.Paragraph  >Email: <span className='font-semibold' >{RequestEbrooker?.email}</span> </Typography.Paragraph>
            <Typography.Paragraph >phone:  <span className='font-semibold' >{RequestEbrooker?.mobile}</span> </Typography.Paragraph>
        </div>
        <div className='flex gap-5' >
            <Button colorScheme='green' onClick={onOpen} >Approve</Button>
            <Button colorScheme='red' onClick={deleteOnOpen} >Cancel</Button>
        </div>
        </div>
        <h2 className=' text-2xl font-semibold text-gray-600 mt-5' >Brooker ID :</h2>
        <div className=' flex gap-5 mt-5'>
            <div>
                <img src={RequestEbrooker?.fornt} width={300} alt="" />
            </div>
            <div>
                <img src={RequestEbrooker?.back} width={300} alt="" />
            </div>
        </div>
        <DeleteAlert isOpen={deleteIsOpen} deleteFun={cancel} info={{id:ebrookerId}} onClose={deleteOnClose} head="Delete Request" body="Are you sure you want to delete this request?"/>
        <DeleteAlert isOpen={isOpen} deleteFun={approve} info={{id:ebrookerId}} mainButton='Approve' themMainButton='green' onClose={onClose} head="Approve Request" body="Are you sure you want to Approve this request?"/>
    </div>
  )
}

export default RequestEbrookerPage