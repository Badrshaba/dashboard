import { useEffect, useState } from 'react'
import logo from '../../../assets/SVG/logo-v-white.svg'
import { getUsersApi } from '../../../utils/api'
import { Spin } from 'antd'
import { Spinner } from '@chakra-ui/react'
import { DateTime } from 'luxon'


const MyWallet = () => {
    const [wallet, setWallet] = useState(null)
    const [loading, setLoading] = useState(false)
    const getWallet = async () => {
        setLoading(true)
        const user_id = 1 //JSON.parse(localStorage.getItem('user')).id
        try {
            const {data} = await getUsersApi.get(`/wallet/${user_id}`)
          
            setWallet(data?.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        getWallet()
    },[])
    console.log(wallet);
    if(loading){  
        return (
            <div className=" w-full h-screen flex items-center justify-center p-5" >
                <Spinner/>
            </div>
        )
      }

  return (
    <div className=" w-full h-screen p-5" >
        <div>
            <div className=" w-2/6 h-52 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-5 flex flex-col justify-between " >
            <div className=" flex flex-col h-5/6 justify-between">
            <img src={logo} width={100} alt="logo" />
            <h3 className=" text-white font-medium text-xl" >{wallet?.id}</h3>
            </div>
            <div className=" flex  justify-between mt-5">
            <h3 className=" text-white font-medium text-xl items-end" >{wallet?.amount}</h3>
            <h3 className=" text-white font-medium text-xl items-end uppercase" >{wallet?.user?.name}</h3>
            </div>
            </div>
        </div>


{wallet?.trans?.map((transaction) => {
let luxonDate = DateTime.fromISO(transaction.created_at)
    return  <div key={transaction.id} className=" mx-auto w-5/6 h-15 rounded-lg shadow  p-5 flex justify-between mt-5" >
      <p className=" text-xl font-medium" >{transaction.status}</p>
      <p className=" text-gray-500 font-thin" >{luxonDate.toFormat('mm:hha dd/LL/yyyy')}</p>
      {transaction.type ?<p className=" text-red-600 font-medium" >-{transaction.amount}</p>
      :<p className=" text-green-600 font-medium">{transaction.amount}</p>}
  </div>
})}
    </div>
  )
}

export default MyWallet